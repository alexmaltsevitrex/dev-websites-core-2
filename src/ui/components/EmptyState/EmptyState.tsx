import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../utils/cn.js'

import type { HTMLAttributes, ReactNode } from 'react'

const emptyStateVariants = cva(
  'flex w-full flex-col items-center justify-center gap-6 rounded-card px-10 py-20 text-center',
  {
    variants: {
      tone: {
        dark: 'bg-card/40',
        light: 'bg-foreground/5',
      },
    },
    defaultVariants: {
      tone: 'dark',
    },
  }
)

export type EmptyStateProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> &
  VariantProps<typeof emptyStateVariants> & {
    icon?: ReactNode
    title: ReactNode
    description?: ReactNode
    actions?: ReactNode
    titleClassName?: string
    descriptionClassName?: string
  }

function EmptyState({
  icon,
  title,
  description,
  actions,
  tone,
  className,
  titleClassName,
  descriptionClassName,
  ...props
}: EmptyStateProps) {
  return (
    <div className={cn(emptyStateVariants({ tone }), className)} {...props}>
      {icon}

      <h2 className={cn('text-2xl font-semibold text-foreground', titleClassName)}>{title}</h2>

      {description ? (
        <div className={cn('max-w-[560px] text-base text-secondary', descriptionClassName)}>
          {description}
        </div>
      ) : null}

      {actions ? (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">{actions}</div>
      ) : null}
    </div>
  )
}

export { EmptyState, emptyStateVariants }
