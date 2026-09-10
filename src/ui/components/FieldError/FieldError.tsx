import { cn } from '../../utils/cn.js'

import type { ReactNode } from 'react'

export type FieldErrorProps = {
  id?: string
  children?: ReactNode
  className?: string
}

/**
 * Presentational field error. Apps wire react-hook-form (or other) and pass the message.
 */
function FieldError({ id, children, className }: FieldErrorProps) {
  if (!children) return null

  return (
    <p id={id} data-slot="field-error" className={cn('text-xs text-destructive', className)}>
      {children}
    </p>
  )
}

export { FieldError }
