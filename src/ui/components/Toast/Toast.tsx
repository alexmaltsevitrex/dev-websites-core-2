'use client'

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

import { cn } from '../../utils/cn.js'

type ToastVariant = 'success' | 'error'

type ToastItem = {
  id: string
  message: string
  variant: ToastVariant
}

type ShowToastInput = {
  message: string
  variant?: ToastVariant
}

type ToastContextValue = {
  showToast: (input: ShowToastInput) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const TOAST_DURATION_MS = 4000

export type ToastProviderProps = {
  children: ReactNode
  /** Accessible label for the dismiss control. Required — apps own i18n. */
  dismissLabel: string
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="none">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function StatusIcon({ variant }: { variant: ToastVariant }) {
  if (variant === 'success') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        width="20"
        height="20"
        fill="none"
        className="shrink-0 text-success"
      >
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M6.5 10.2 9 12.5l4.5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      width="20"
      height="20"
      fill="none"
      className="shrink-0 text-destructive"
    >
      <path
        d="M10 3.5 17.5 16.5H2.5L10 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 8v4M10 14.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function ToastProvider({ children, dismissLabel }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  function dismissToast(id: string) {
    const timer = timersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }

  function showToast({ message, variant = 'success' }: ShowToastInput) {
    const id = crypto.randomUUID()
    setToasts((current) => [...current, { id, message, variant }])
    const timer = setTimeout(() => dismissToast(id), TOAST_DURATION_MS)
    timersRef.current.set(id, timer)
  }

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach((timer) => clearTimeout(timer))
      timers.clear()
    }
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        aria-relevant="additions"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex flex-col gap-2 sm:inset-x-auto sm:right-4 sm:max-w-sm"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={cn(
              'pointer-events-auto flex items-center gap-3 rounded-card border border-border-subtle',
              'bg-card-elevated py-3.5 pr-3.5 pl-4 shadow-lg'
            )}
          >
            <StatusIcon variant={toast.variant} />
            <p className="min-w-0 flex-1 text-sm font-semibold text-foreground">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="inline-flex shrink-0 cursor-pointer text-muted transition-colors hover:text-secondary"
              aria-label={dismissLabel}
            >
              <CloseIcon />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
