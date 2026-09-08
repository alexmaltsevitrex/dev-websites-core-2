'use client'

import { useState } from 'react'

import { cn } from '../../utils/cn.js'

export type CodeBlockTabsTheme = 'light' | 'dark'

export type CodeBlockTab = {
  id: string
  label: string
  /** Pre-highlighted HTML (e.g. from shiki). */
  html: string
}

export type CodeBlockTabsProps = {
  tabs: CodeBlockTab[]
  className?: string
  theme?: CodeBlockTabsTheme
  /** Apps own i18n — aria-label for the tablist. */
  tabsAriaLabel: string
}

const PRE_CLASS =
  '[&>pre]:m-0 [&>pre]:font-mono [&>pre]:text-[13px] [&>pre]:leading-[22px] [&>pre]:wrap-break-word [&>pre]:whitespace-pre-wrap'

const SHELL: Record<CodeBlockTabsTheme, string> = {
  light: 'border-border bg-foreground/5',
  dark: 'border-border bg-surface-elevated',
}

const TAB_IDLE: Record<CodeBlockTabsTheme, string> = {
  light: 'border-border text-muted hover:text-foreground',
  dark: 'border-border bg-card text-muted hover:text-foreground',
}

function CodeBlockTabs({ tabs, className, theme = 'light', tabsAriaLabel }: CodeBlockTabsProps) {
  const [active, setActive] = useState(0)

  if (tabs.length === 0) return null

  return (
    <div
      className={cn(
        'flex flex-col gap-4 overflow-hidden rounded-card border p-5',
        SHELL[theme],
        className
      )}
    >
      <div role="tablist" aria-label={tabsAriaLabel} className="flex flex-wrap gap-2 print:hidden">
        {tabs.map((tab, idx) => {
          const isActive = idx === active
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`code-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`code-tab-panel-${tab.id}`}
              onClick={() => setActive(idx)}
              className={cn(
                'rounded-full border px-4 py-2 text-btn font-medium transition-colors',
                isActive ? 'border-accent/30 bg-accent/12 text-accent' : TAB_IDLE[theme]
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {tabs.map((tab, idx) => {
        const isActive = idx === active
        return (
          <div
            key={tab.id}
            id={`code-tab-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`code-tab-${tab.id}`}
            hidden={!isActive}
            className={cn(
              'overflow-hidden rounded-card border text-foreground',
              SHELL[theme],
              isActive ? 'block' : 'hidden print:block'
            )}
          >
            <div className="overflow-x-auto px-[18px] py-4">
              <div className={PRE_CLASS} dangerouslySetInnerHTML={{ __html: tab.html }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { CodeBlockTabs }
