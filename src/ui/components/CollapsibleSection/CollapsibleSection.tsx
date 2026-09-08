'use client'

import { useId, useState } from 'react'

import { Button } from '../Button/Button.js'
import { cn } from '../../utils/cn.js'

import type { ReactNode } from 'react'

export type CollapsibleSectionProps = {
  collapsedHeight: number
  toggleLabel: string
  defaultOpen?: boolean
  className?: string
  children: ReactNode
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      className={className}
    >
      <path
        d="M3.5 6 8 10.5 12.5 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CollapsibleSection({
  collapsedHeight,
  toggleLabel,
  defaultOpen = false,
  className,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const bodyId = useId()

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="relative">
        <div
          id={bodyId}
          className="overflow-hidden"
          style={!open ? { maxHeight: collapsedHeight } : undefined}
        >
          {children}
        </div>

        {!open ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-surface/0 to-surface"
          />
        ) : null}
      </div>

      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={bodyId}
        className="gap-1.5 self-center"
      >
        <ChevronDownIcon className={open ? 'rotate-180' : undefined} />
        {toggleLabel}
      </Button>
    </div>
  )
}

export { CollapsibleSection }
