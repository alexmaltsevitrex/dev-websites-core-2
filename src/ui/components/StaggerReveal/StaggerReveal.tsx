'use client'

import { Children } from 'react'

import { useInView } from '../../hooks/useInView.js'
import { cn } from '../../utils/cn.js'

import type { ReactNode } from 'react'

export type StaggerRevealProps = {
  className?: string
  children: ReactNode
}

const STAGGER_DELAYS = [
  'delay-[0ms]',
  'delay-[100ms]',
  'delay-[200ms]',
  'delay-[300ms]',
  'delay-[400ms]',
  'delay-[500ms]',
  'delay-[600ms]',
  'delay-[700ms]',
]

function StaggerReveal({ className, children }: StaggerRevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, index) => (
        <div
          className={cn(
            'h-full transition-all duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
            STAGGER_DELAYS[Math.min(index, STAGGER_DELAYS.length - 1)],
            inView
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
          )}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

export { StaggerReveal }
