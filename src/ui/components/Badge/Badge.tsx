'use client'

import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../utils/cn.js'

import type { HTMLAttributes } from 'react'

const badgeVariants = cva(
  'inline-flex items-center font-semibold whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        active: 'cursor-pointer rounded-full bg-accent px-4 py-2 text-sm text-accent-foreground',
        inactive:
          'cursor-pointer rounded-full border border-border bg-card px-4 py-2 text-sm text-secondary hover:text-foreground',
        status:
          'h-[18px] shrink-0 gap-1.5 rounded-full bg-success/12 px-2 text-xs leading-none text-success uppercase',
      },
    },
    defaultVariants: {
      variant: 'inactive',
    },
  }
)

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
    dot?: boolean
  }

function Badge({
  className,
  variant,
  asChild = false,
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {dot ? <span aria-hidden className="size-[5px] shrink-0 rounded-[2.5px] bg-success" /> : null}
      <Slottable>{children}</Slottable>
    </Comp>
  )
}

export { Badge, badgeVariants }
