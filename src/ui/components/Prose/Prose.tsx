import { cn } from '../../utils/cn.js'

import type { HTMLAttributes, ReactNode } from 'react'

export type ProseProps = HTMLAttributes<HTMLDivElement> & {
  html?: string
  children?: ReactNode
}

function Prose({ className, html, children, ...rest }: ProseProps) {
  if (html != null) {
    return (
      <div
        className={cn('prose', className)}
        dangerouslySetInnerHTML={{ __html: html }}
        {...rest}
      />
    )
  }

  return (
    <div className={cn('prose', className)} {...rest}>
      {children}
    </div>
  )
}

export { Prose }
