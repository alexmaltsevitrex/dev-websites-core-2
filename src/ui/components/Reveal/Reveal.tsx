'use client'

import { Slot } from '@radix-ui/react-slot'

import { useInView } from '../../hooks/useInView.js'
import { cn } from '../../utils/cn.js'

import type { ComponentProps } from 'react'

export type RevealProps = ComponentProps<'div'> & {
  asChild?: boolean
  delay?: string
}

function Reveal({ asChild = false, delay, className, ...props }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      ref={ref}
      className={cn(
        'transition-all duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
        delay,
        inView
          ? 'translate-y-0 opacity-100'
          : 'translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
        className
      )}
      {...props}
    />
  )
}

export { Reveal }
