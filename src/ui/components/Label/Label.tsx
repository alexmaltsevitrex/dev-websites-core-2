'use client'

import { Primitive } from '@radix-ui/react-primitive'

import { cn } from '../../utils/cn.js'

import type { ComponentPropsWithoutRef } from 'react'

export type LabelProps = ComponentPropsWithoutRef<typeof Primitive.label> & {
  disabled?: boolean
  error?: boolean
}

function Label({ className, disabled, error, ...props }: LabelProps) {
  return (
    <Primitive.label
      data-slot="label"
      data-disabled={disabled || undefined}
      data-error={error || undefined}
      className={cn(
        'inline-block text-sm font-normal text-secondary transition-colors',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        'data-[error]:text-destructive',
        className
      )}
      {...props}
    />
  )
}

export { Label }
