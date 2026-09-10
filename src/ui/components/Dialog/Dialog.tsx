'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'

import { cn } from '../../utils/cn.js'

import type { ComponentProps, HTMLAttributes } from 'react'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const dialogFullscreenOnMobile = cn(
  'max-md:top-0 max-md:right-0 max-md:bottom-0 max-md:left-0',
  'max-md:h-dvh max-md:max-h-none max-md:w-full max-md:max-w-none',
  'max-md:translate-x-0 max-md:translate-y-0',
  'max-md:rounded-none max-md:border-0'
)

export type DialogOverlayProps = ComponentProps<typeof DialogPrimitive.Overlay>

function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-background/75 backdrop-blur-sm transition-opacity duration-150',
        'data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
        className
      )}
      {...props}
    />
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 14 14" width="14" height="14" fill="none">
      <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content> & {
  closeLabel?: string
  showClose?: boolean
  closeClassName?: string
}

function DialogContent({
  className,
  children,
  closeLabel = 'Close',
  showClose = true,
  closeClassName,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          'fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
          'flex max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden',
          'rounded-card border border-border bg-surface text-foreground shadow-xl',
          'transition-opacity duration-150 data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
          'focus:outline-none',
          className
        )}
        {...props}
      >
        {children}

        {showClose ? (
          <DialogPrimitive.Close
            aria-label={closeLabel}
            className={cn(
              'absolute top-6 right-5 inline-flex size-7 cursor-pointer items-center justify-center rounded-control',
              'border border-border text-secondary transition-colors',
              'hover:bg-card hover:text-foreground',
              'focus-visible:ring-1 focus-visible:ring-accent focus-visible:outline-none',
              'disabled:pointer-events-none disabled:cursor-not-allowed',
              closeClassName
            )}
          >
            <CloseIcon />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-1.5 px-5 pt-6 pr-14', className)}
      {...props}
    />
  )
}

function DialogBody({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-body"
      className={cn('flex flex-col gap-3.5 overflow-y-auto px-5 py-5', className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 border-t border-border px-5 py-4 sm:flex-row sm:justify-between',
        className
      )}
      {...props}
    />
  )
}

export type DialogTitleProps = ComponentProps<typeof DialogPrimitive.Title>

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  )
}

export type DialogDescriptionProps = ComponentProps<typeof DialogPrimitive.Description>

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className={cn('text-sm font-normal text-secondary', className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  dialogFullscreenOnMobile,
}
