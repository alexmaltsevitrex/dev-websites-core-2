import { cn } from '../../utils/cn.js'

import type { ReactNode } from 'react'

export type StepperItem = {
  id: string
  title: string
  description?: ReactNode
}

export type StepperProps = {
  items: StepperItem[]
  className?: string
}

function Stepper({ items, className }: StepperProps) {
  return (
    <ol className={cn('relative flex flex-col gap-8 pl-0', className)}>
      {items.map((item, idx) => (
        <li key={item.id} className="relative flex items-start gap-2.5">
          {idx < items.length - 1 ? (
            <span
              aria-hidden
              className="absolute top-8 bottom-[-32px] left-[17px] w-px bg-border"
            />
          ) : null}
          <span className="relative z-10 flex size-[34px] shrink-0 items-center justify-center rounded-full bg-accent text-sm font-normal text-accent-foreground">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <div className="flex-1 pt-1">
            <p className="mb-3 text-base font-bold text-foreground">{item.title}</p>
            {item.description ? (
              typeof item.description === 'string' ? (
                <div
                  className="prose text-base text-secondary"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              ) : (
                <div className="text-base text-secondary">{item.description}</div>
              )
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

export { Stepper }
