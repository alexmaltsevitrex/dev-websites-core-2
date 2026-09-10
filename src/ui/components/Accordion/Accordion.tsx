'use client'

import { useState, type ReactNode } from 'react'

import { cn } from '../../utils/cn.js'

export type AccordionItem = {
  id: string
  title: string
  defaultOpen?: boolean
  content: ReactNode
}

export type AccordionProps = {
  items: AccordionItem[]
  className?: string
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      className={className}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AccordionRow({ item }: { item: AccordionItem }) {
  const [open, setOpen] = useState(Boolean(item.defaultOpen))

  return (
    <div className="border-b border-border">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
      >
        <h2 className="text-xl font-bold text-foreground">{item.title}</h2>
        <ChevronIcon
          className={cn('shrink-0 text-foreground transition-transform', open && 'rotate-180')}
        />
      </button>
      <div className={cn('pb-6 text-base text-secondary', open ? 'block' : 'hidden')}>
        {item.content}
      </div>
    </div>
  )
}

function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      {items.map((item) => (
        <AccordionRow key={item.id} item={item} />
      ))}
    </div>
  )
}

export { Accordion }
