'use client'

import { Slot } from '@radix-ui/react-slot'

import { cn } from '../../utils/cn.js'

import type { ReactNode } from 'react'

export type PaginationItemProps = {
  href?: string
  active?: boolean
  ariaLabel: string
  rel?: 'prev' | 'next'
  asChild?: boolean
  className?: string
  children: ReactNode
}

function PaginationItem({
  href,
  active = false,
  ariaLabel,
  rel,
  asChild = false,
  className,
  children,
}: PaginationItemProps) {
  const cls = cn(
    'flex size-9 items-center justify-center rounded-btn text-btn font-semibold transition-colors',
    active ? 'bg-accent text-accent-foreground' : 'border border-border bg-card text-secondary',
    href ? 'cursor-pointer hover:text-foreground' : 'cursor-not-allowed opacity-40',
    className
  )

  if (!href) {
    return (
      <button type="button" disabled className={cls} aria-label={ariaLabel}>
        {children}
      </button>
    )
  }

  if (asChild) {
    return (
      <Slot
        className={cls}
        aria-label={ariaLabel}
        aria-current={active ? 'page' : undefined}
        rel={rel}
      >
        {children}
      </Slot>
    )
  }

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
      rel={rel}
      className={cls}
    >
      {children}
    </a>
  )
}

export { PaginationItem }
