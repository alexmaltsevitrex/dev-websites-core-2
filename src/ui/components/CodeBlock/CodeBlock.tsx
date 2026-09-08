'use client'

import { useState } from 'react'

import { CopyButton } from '../CopyButton/CopyButton.js'
import { cn } from '../../utils/cn.js'

export type CodeBlockTheme = 'light' | 'dark'

export type CodeBlockProps = {
  code: string
  /** Pre-highlighted HTML (e.g. from shiki). When omitted, `code` is plain text. */
  html?: string
  filename?: string | null
  theme?: CodeBlockTheme
  copyable?: boolean
  collapsible?: boolean
  className?: string
  /** Apps own i18n — pass translated aria labels. */
  copyLabel: string
  copiedLabel: string
  expandLabel?: string
  collapseLabel?: string
  onCopied?: () => void
}

const CONTAINER_CLASS: Record<CodeBlockTheme, string> = {
  light: 'border-border bg-foreground/5 text-foreground',
  dark: 'border-border bg-card text-secondary',
}

const COPY_BUTTON_CLASS: Record<CodeBlockTheme, string> = {
  light: 'border-border bg-foreground/5 hover:bg-foreground/10',
  dark: 'border-border bg-card-elevated hover:bg-card-elevated/80',
}

const GRADIENT_CLASS: Record<CodeBlockTheme, string> = {
  light: 'from-transparent to-background',
  dark: 'from-transparent to-card',
}

const COLLAPSED_MAX_HEIGHT = 'max-h-40'
const PRE_STYLE = 'm-0 whitespace-pre-wrap break-words font-mono text-sm leading-relaxed'

function CodeBlock({
  code,
  html,
  filename,
  theme = 'dark',
  copyable = true,
  collapsible = false,
  className,
  copyLabel,
  copiedLabel,
  expandLabel = 'Show more',
  collapseLabel = 'Show less',
  onCopied,
}: CodeBlockProps) {
  const [expanded, setExpanded] = useState(false)
  const isCollapsed = collapsible && !expanded

  return (
    <div
      className={cn('my-3 overflow-hidden rounded-card border', CONTAINER_CLASS[theme], className)}
    >
      {filename ? (
        <div className="border-b border-border-subtle px-4 py-2 font-mono text-sm text-secondary sm:px-5">
          {filename}
        </div>
      ) : null}
      <div className="relative">
        <div
          className={cn(
            'p-5 sm:p-6',
            isCollapsed && COLLAPSED_MAX_HEIGHT,
            isCollapsed && 'overflow-hidden',
            collapsible && 'pb-16'
          )}
        >
          {html !== undefined ? (
            <div className={PRE_STYLE} dangerouslySetInnerHTML={{ __html: html }} />
          ) : (
            <pre className={PRE_STYLE}>
              <code>{code}</code>
            </pre>
          )}
        </div>

        {isCollapsed ? (
          <div
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-x-0 bottom-12 h-16 bg-gradient-to-b',
              GRADIENT_CLASS[theme]
            )}
          />
        ) : null}

        {copyable ? (
          <CopyButton
            text={code}
            aria-label={copyLabel}
            copiedAriaLabel={copiedLabel}
            onCopied={onCopied}
            className={cn('absolute top-3 right-3 border', COPY_BUTTON_CLASS[theme])}
          />
        ) : null}

        {collapsible ? (
          <button
            type="button"
            className="absolute bottom-3 left-1/2 -translate-x-1/2 cursor-pointer rounded-btn border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? collapseLabel : expandLabel}
          </button>
        ) : null}
      </div>
    </div>
  )
}

export { CodeBlock }
