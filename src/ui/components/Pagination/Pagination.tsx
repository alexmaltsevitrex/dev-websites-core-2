import { PaginationItem } from '../PaginationItem/PaginationItem.js'
import { cn } from '../../utils/cn.js'

import type { ReactNode } from 'react'

export type PaginationLabels = {
  nav: string
  previous: string
  next: string
  pageLabel: (page: number) => string
}

export type PaginationProps = {
  page: number
  totalPages: number
  getPageHref: (page: number) => string
  labels: PaginationLabels
  siblingCount?: number
  className?: string
  /** Defaults to chevron SVGs. Override for branded icons. */
  previousIcon?: ReactNode
  nextIcon?: ReactNode
  /**
   * When true, page links render via Slot onto a single child you provide
   * through a custom render — prefer wrapping with next/link in the app
   * by mapping items yourself, or pass `renderItem`.
   */
  renderItem?: (props: {
    href: string
    active: boolean
    ariaLabel: string
    rel?: 'prev' | 'next'
    children: ReactNode
  }) => ReactNode
}

const ELLIPSIS = '…'
type PageItem = number | typeof ELLIPSIS

function buildPageItems(current: number, total: number, siblingCount: number): PageItem[] {
  if (total <= 1) return [1]

  const pages = new Set<number>([1, total, current])
  for (let i = 1; i <= siblingCount; i++) {
    if (current - i > 1) pages.add(current - i)
    if (current + i < total) pages.add(current + i)
  }

  const ordered = [...pages].sort((a, b) => a - b)
  const items: PageItem[] = []
  ordered.forEach((page, index) => {
    if (index > 0 && page - ordered[index - 1]! > 1) items.push(ELLIPSIS)
    items.push(page)
  })
  return items
}

function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 14 14" width="14" height="14" fill="none">
      <path
        d="M8.5 2.5 4 7l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 14 14" width="14" height="14" fill="none">
      <path
        d="M5.5 2.5 10 7l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Pagination({
  page,
  totalPages,
  getPageHref,
  labels,
  siblingCount = 1,
  className,
  previousIcon,
  nextIcon,
  renderItem,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const items = buildPageItems(page, totalPages, siblingCount)
  const isFirst = page <= 1
  const isLast = page >= totalPages

  const renderNavItem = ({
    href,
    active,
    ariaLabel,
    rel,
    children,
  }: {
    href?: string
    active?: boolean
    ariaLabel: string
    rel?: 'prev' | 'next'
    children: ReactNode
  }) => {
    if (href && renderItem) {
      return renderItem({
        href,
        active: Boolean(active),
        ariaLabel,
        rel,
        children,
      })
    }

    return (
      <PaginationItem href={href} active={active} ariaLabel={ariaLabel} rel={rel}>
        {children}
      </PaginationItem>
    )
  }

  return (
    <nav aria-label={labels.nav} className={cn('flex items-center gap-2', className)}>
      {renderNavItem({
        href: isFirst ? undefined : getPageHref(page - 1),
        ariaLabel: labels.previous,
        rel: 'prev',
        children: previousIcon ?? <ChevronLeftIcon />,
      })}

      {items.map((item, idx) =>
        item === ELLIPSIS ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex size-9 items-center justify-center text-btn font-semibold text-secondary"
            aria-hidden="true"
          >
            {ELLIPSIS}
          </span>
        ) : (
          <span key={item}>
            {renderNavItem({
              href: getPageHref(item),
              active: item === page,
              ariaLabel: labels.pageLabel(item),
              children: item,
            })}
          </span>
        )
      )}

      {renderNavItem({
        href: isLast ? undefined : getPageHref(page + 1),
        ariaLabel: labels.next,
        rel: 'next',
        children: nextIcon ?? <ChevronRightIcon />,
      })}
    </nav>
  )
}

export { Pagination, buildPageItems }
