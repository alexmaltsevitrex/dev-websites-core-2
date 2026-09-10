import { cn } from '../../utils/cn.js'

import type { ComponentProps } from 'react'

export type AvatarProps = ComponentProps<'div'> & {
  initials?: string
}

function Avatar({ className, initials, children, ...props }: AvatarProps) {
  return (
    <div
      data-slot="avatar"
      className={cn(
        'inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-surface text-btn font-semibold text-secondary',
        className
      )}
      {...props}
    >
      {children ?? initials}
    </div>
  )
}

export { Avatar }
