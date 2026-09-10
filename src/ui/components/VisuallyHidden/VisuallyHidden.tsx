import { cn } from '../../utils/cn.js'

import type { HTMLAttributes } from 'react'

export type VisuallyHiddenProps = HTMLAttributes<HTMLSpanElement>

function VisuallyHidden({ className, ...props }: VisuallyHiddenProps) {
  return (
    <span
      className={cn(
        'absolute h-px w-px overflow-hidden border-0 p-0 whitespace-nowrap [clip:rect(0,0,0,0)]',
        className
      )}
      {...props}
    />
  )
}

export { VisuallyHidden }
