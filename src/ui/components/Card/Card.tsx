'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../utils/cn.js'

import type { HTMLAttributes } from 'react'

const cardVariants = cva('rounded-card border', {
  variants: {
    variant: {
      surface: 'border-border bg-surface',
      card: 'border-border-subtle bg-card',
      elevated: 'border-border bg-card-elevated',
    },
    padding: {
      none: '',
      sm: 'p-5',
      md: 'p-6',
      lg: 'p-6 sm:p-8',
    },
  },
  defaultVariants: {
    variant: 'surface',
    padding: 'md',
  },
})

export type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & {
    asChild?: boolean
  }

function Card({ className, variant, padding, asChild = false, ...props }: CardProps) {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      data-slot="card"
      data-variant={variant}
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  )
}

export { Card, cardVariants }
