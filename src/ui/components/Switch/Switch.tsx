'use client'

import { useState } from 'react'
import { Primitive } from '@radix-ui/react-primitive'

import { cn } from '../../utils/cn.js'

import type { ComponentProps } from 'react'

export type SwitchProps = Omit<ComponentProps<typeof Primitive.button>, 'onChange'> & {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

function Switch({
  className,
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  ...props
}: SwitchProps) {
  const isControlled = checkedProp !== undefined
  const [uncontrolled, setUncontrolled] = useState(defaultChecked)
  const checked = isControlled ? Boolean(checkedProp) : uncontrolled

  function setChecked(next: boolean) {
    if (!isControlled) setUncontrolled(next)
    onCheckedChange?.(next)
  }

  return (
    <Primitive.button
      type="button"
      role="switch"
      data-slot="switch"
      data-state={checked ? 'checked' : 'unchecked'}
      aria-checked={checked}
      disabled={disabled}
      onClick={() => setChecked(!checked)}
      className={cn(
        'inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full px-0.5',
        'bg-surface data-[state=checked]:bg-accent',
        'transition-colors duration-200',
        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <span
        data-state={checked ? 'checked' : 'unchecked'}
        className={cn(
          'block size-5 shrink-0 rounded-full bg-foreground shadow-sm',
          'transition-transform duration-200 ease-in-out',
          'data-[state=unchecked]:translate-x-0',
          'data-[state=checked]:translate-x-5'
        )}
      />
    </Primitive.button>
  )
}

export { Switch }
