'use client'

import { Primitive } from '@radix-ui/react-primitive'

import { focusRingClassName } from '../../a11y/focus.js'
import { cn } from '../../utils/cn.js'

import type { ComponentProps } from 'react'

export type CheckboxProps = Omit<ComponentProps<typeof Primitive.input>, 'type'>

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 14"
      width="14"
      height="14"
      fill="none"
      className={className}
    >
      <path
        d="M2.5 7.2 5.4 10l6.1-6.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Checkbox({ className, ref, ...props }: CheckboxProps) {
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center">
      <Primitive.input
        type="checkbox"
        ref={ref}
        data-slot="checkbox"
        className={cn(
          'peer size-5 shrink-0 appearance-none rounded-sm border border-border bg-surface',
          'cursor-pointer transition-colors',
          'hover:border-accent',
          'checked:border-accent checked:bg-accent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          focusRingClassName,
          className
        )}
        {...props}
      />
      <CheckIcon className="pointer-events-none absolute text-accent-foreground opacity-0 transition-opacity peer-checked:opacity-100" />
    </span>
  )
}

export { Checkbox }
