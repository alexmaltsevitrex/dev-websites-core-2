'use client'

import { useRef, useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '../../utils/cn.js'

export type SelectOption = {
  value: string
  label: string
}

type CommonProps = {
  'id'?: string
  'options': SelectOption[]
  'aria-label'?: string
  'disabled'?: boolean
  'error'?: boolean | string
  'className'?: string
  'triggerClassName'?: string
}

type SingleProps = CommonProps & {
  multiple?: false
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
}

type MultiProps = CommonProps & {
  multiple: true
  value: string[]
  onChange: (value: string[]) => void
  addLabel: string
  emptyLabel?: string
  removeChipLabel: (label: string) => string
}

export type SelectProps = SingleProps | MultiProps

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      width="18"
      height="18"
      fill="none"
      className={className}
    >
      <path
        d="M4.5 6.75 9 11.25l4.5-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      className="shrink-0 text-accent"
    >
      <path
        d="M3 8.2 6.2 11l6.5-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" width="10" height="10" fill="none">
      <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function Select(props: SelectProps) {
  const { id, options, disabled, error, className, triggerClassName } = props
  const ariaLabel = props['aria-label']
  const multiContainerRef = useRef<HTMLDivElement>(null)
  const [multiMenuWidth, setMultiMenuWidth] = useState<number>()

  const errorId = id ? `${id}-error` : undefined
  const hasError = Boolean(error)
  const errorMessage = typeof error === 'string' ? error : undefined

  const selectedSet = new Set(props.multiple ? props.value : props.value ? [props.value] : [])
  const selectedChips = props.multiple
    ? props.value.map((v) => options.find((o) => o.value === v) ?? { value: v, label: v })
    : []
  const availableOptions = props.multiple
    ? options.filter((o) => !selectedSet.has(o.value))
    : options
  const allSelected = Boolean(props.multiple && availableOptions.length === 0)

  return (
    <div className={cn('flex w-full flex-col gap-1', !props.multiple && className)}>
      <DropdownMenu.Root
        modal={false}
        onOpenChange={(open) => {
          if (!props.multiple || !open) return
          const width = multiContainerRef.current?.getBoundingClientRect().width
          if (width) setMultiMenuWidth(width)
        }}
      >
        {props.multiple ? (
          <div
            ref={multiContainerRef}
            data-slot="select-multi"
            aria-describedby={hasError && errorId ? errorId : undefined}
            className={cn(
              'group/select flex w-full flex-wrap items-center gap-2 rounded-btn border border-border bg-background px-3 py-2.5 text-left transition-colors',
              'hover:border-accent/60',
              hasError && 'border-destructive',
              disabled && 'cursor-not-allowed opacity-50',
              className
            )}
          >
            {selectedChips.map((option, idx) => (
              <span
                key={`${option.value}-${idx}`}
                data-slot="select-chip"
                className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-card py-1 pr-2 pl-2.5 text-xs font-medium text-foreground"
              >
                {option.label}
                <button
                  type="button"
                  aria-label={props.removeChipLabel(option.label)}
                  disabled={disabled}
                  onClick={() => {
                    if (disabled) return
                    props.onChange(props.value.filter((_, i) => i !== idx))
                  }}
                  className="inline-flex cursor-pointer items-center justify-center text-muted transition-colors hover:text-foreground disabled:pointer-events-none"
                >
                  <CloseIcon />
                </button>
              </span>
            ))}

            <DropdownMenu.Trigger asChild disabled={disabled || allSelected}>
              <button
                id={id}
                type="button"
                data-slot="select-multi-add"
                aria-label={ariaLabel}
                className="cursor-pointer text-sm font-normal text-muted transition-colors hover:text-foreground data-[state=open]:text-foreground focus-visible:outline-none"
              >
                {allSelected && props.emptyLabel ? props.emptyLabel : props.addLabel}
              </button>
            </DropdownMenu.Trigger>
          </div>
        ) : (
          <DropdownMenu.Trigger asChild>
            <button
              id={id}
              type="button"
              disabled={disabled}
              aria-label={ariaLabel}
              aria-describedby={hasError && errorId ? errorId : undefined}
              data-slot="select-trigger"
              className={cn(
                'group/select inline-flex h-11 w-full shrink-0 cursor-pointer items-center gap-2 rounded-btn border border-border bg-background pr-3.5 pl-4 text-left transition-colors',
                'hover:border-accent/60 data-[state=open]:border-accent',
                'focus-visible:border-accent focus-visible:outline-none',
                hasError && 'border-destructive data-[state=open]:border-destructive',
                disabled && 'cursor-not-allowed opacity-50',
                triggerClassName
              )}
            >
              {props.label ? (
                <span className="shrink-0 text-sm text-muted">{props.label}</span>
              ) : null}
              <span className="flex-1 truncate text-sm font-semibold text-foreground">
                {options.find((o) => o.value === props.value)?.label ?? props.placeholder ?? ''}
              </span>
              <ChevronIcon className="shrink-0 text-foreground transition-transform group-data-[state=open]/select:rotate-180" />
            </button>
          </DropdownMenu.Trigger>
        )}

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="start"
            sideOffset={8}
            style={props.multiple && multiMenuWidth ? { width: multiMenuWidth } : undefined}
            className={cn(
              'z-50 overflow-hidden rounded-card border border-border bg-card-elevated py-1.5 shadow-lg',
              'focus:outline-none',
              !props.multiple && 'w-(--radix-dropdown-menu-trigger-width)'
            )}
          >
            {availableOptions.map((option) => {
              const isSelected = !props.multiple && props.value === option.value
              return (
                <DropdownMenu.Item
                  key={option.value}
                  onSelect={(event) => {
                    if (props.multiple) {
                      event.preventDefault()
                      props.onChange([...props.value, option.value])
                      return
                    }
                    props.onChange(option.value)
                  }}
                  className={cn(
                    'flex cursor-pointer items-center justify-between gap-3 px-3.5 py-2.5 text-sm font-medium text-secondary transition-colors outline-none',
                    'data-[highlighted]:bg-card data-[highlighted]:text-foreground',
                    isSelected && 'bg-card font-semibold text-foreground'
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected ? <CheckIcon /> : null}
                </DropdownMenu.Item>
              )
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {errorMessage ? (
        <p id={errorId} className="text-xs text-destructive">
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
}

export { Select }
