'use client'

import { Primitive } from '@radix-ui/react-primitive'
import { Slot } from '@radix-ui/react-slot'

import { focusRingClassName } from '../../a11y/focus.js'
import { cn } from '../../utils/cn.js'

import type { ComponentProps } from 'react'

export type IconButtonProps = ComponentProps<typeof Primitive.button> & {
  asChild?: boolean
}

function IconButton({ className, asChild = false, ...props }: IconButtonProps) {
  const Comp = asChild ? Slot : Primitive.button

  return (
    <Comp
      data-slot="icon-button"
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-btn text-foreground transition-colors outline-none hover:bg-foreground/5 focus:bg-foreground/5 disabled:pointer-events-none disabled:opacity-50',
        focusRingClassName,
        className
      )}
      {...props}
    />
  )
}

export { IconButton }
