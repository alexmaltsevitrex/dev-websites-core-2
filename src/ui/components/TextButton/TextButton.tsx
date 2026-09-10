'use client'

import { Slot } from '@radix-ui/react-slot'

import { cn } from '../../utils/cn.js'

import type { ComponentPropsWithoutRef } from 'react'

export type TextButtonProps = ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean
}

function TextButton({ className, asChild = false, ...props }: TextButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="text-button"
      className={cn(
        'inline-flex h-auto cursor-pointer items-center justify-start rounded-btn bg-transparent px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:text-secondary',
        className
      )}
      {...props}
    />
  )
}

export { TextButton }
