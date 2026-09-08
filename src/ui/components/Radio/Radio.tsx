'use client'

import { Primitive } from '@radix-ui/react-primitive'

import { focusRingClassName } from '../../a11y/focus.js'
import { cn } from '../../utils/cn.js'

import type { ComponentProps } from 'react'

export type RadioProps = Omit<ComponentProps<typeof Primitive.input>, 'type'>

function Radio({ className, ref, ...props }: RadioProps) {
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center">
      <Primitive.input
        type="radio"
        ref={ref}
        data-slot="radio"
        className={cn(
          'peer size-5 shrink-0 appearance-none rounded-full border border-border bg-surface',
          'cursor-pointer transition-colors',
          'hover:border-accent',
          'checked:border-2 checked:border-accent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          focusRingClassName,
          className
        )}
        {...props}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute size-2 rounded-full bg-accent opacity-0 transition-opacity peer-checked:opacity-100"
      />
    </span>
  )
}

export { Radio }
