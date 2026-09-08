'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'

import { IconButton } from '../IconButton/IconButton.js'
import { cn } from '../../utils/cn.js'

import type { ComponentProps, ReactNode } from 'react'

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close
const SheetPortal = DialogPrimitive.Portal

const sheetOverlayClasses = cn(
  'fixed inset-0 z-50 bg-background/75 backdrop-blur-sm',
  'data-[state=closed]:pointer-events-none'
)

export type SheetOverlayProps = ComponentProps<typeof DialogPrimitive.Overlay>

function SheetOverlay({ className, ...props }: SheetOverlayProps) {
  return <DialogPrimitive.Overlay className={cn(sheetOverlayClasses, className)} {...props} />
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20" fill="none">
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export type SheetContentProps = ComponentProps<typeof DialogPrimitive.Content> & {
  side?: 'left' | 'right'
  closeLabel?: string
  title?: string
  children?: ReactNode
}

function SheetContent({
  side = 'left',
  className,
  children,
  closeLabel,
  title,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        data-side={side}
        className={cn(
          'fixed z-50 flex h-full flex-col bg-background shadow-xl',
          side === 'left' && 'inset-y-0 left-0 w-[min(100vw,280px)] border-r border-border',
          side === 'right' && 'inset-y-0 right-0 w-[min(100vw,280px)] border-l border-border',
          className
        )}
        {...props}
      >
        {title ? <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title> : null}
        {children}
        {closeLabel ? (
          <SheetClose asChild>
            <IconButton
              type="button"
              className="absolute top-3 right-3 lg:hidden"
              aria-label={closeLabel}
            >
              <CloseIcon />
            </IconButton>
          </SheetClose>
        ) : null}
      </DialogPrimitive.Content>
    </SheetPortal>
  )
}

export { Sheet, SheetTrigger, SheetClose, SheetPortal, SheetOverlay, SheetContent }
