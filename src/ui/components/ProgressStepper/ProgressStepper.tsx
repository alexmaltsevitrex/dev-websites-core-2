'use client'

import { cva } from 'class-variance-authority'

import { cn } from '../../utils/cn.js'

import type { HTMLAttributes, ReactNode } from 'react'

export const segmentVariants = cva('h-0.5 flex-1 rounded-full transition-colors', {
  variants: {
    complete: {
      true: 'bg-accent',
      false: 'bg-muted',
    },
  },
  defaultVariants: {
    complete: false,
  },
})

export type ProgressStepperProps = HTMLAttributes<HTMLDivElement> & {
  /** Accessible name for the stepper. Apps own i18n. */
  ariaLabel: string
  /** Ordered step ids; `value` must match one of them. */
  steps: string[]
  value: string
  /** Optional title shown above the segments. */
  title?: ReactNode
  /** Optional count text (e.g. "2 / 5"). Apps own formatting/i18n. */
  count?: ReactNode
}

function ProgressStepper({
  ariaLabel,
  steps,
  value,
  title,
  count,
  className,
  ...props
}: ProgressStepperProps) {
  const activeIndex = Math.max(
    0,
    steps.findIndex((step) => step === value)
  )

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn('flex w-full flex-col gap-3', className)}
      {...props}
    >
      {title || count ? (
        <div className="flex items-center justify-between gap-3">
          {title ? <div className="text-sm font-semibold text-foreground">{title}</div> : null}
          {count ? <div className="text-sm text-secondary">{count}</div> : null}
        </div>
      ) : null}
      <div className="flex w-full gap-1.5" aria-hidden>
        {steps.map((step, index) => (
          <span key={step} className={cn(segmentVariants({ complete: index <= activeIndex }))} />
        ))}
      </div>
    </div>
  )
}

export { ProgressStepper }
