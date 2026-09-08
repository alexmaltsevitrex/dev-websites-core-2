'use client'

import { useState } from 'react'
import { MdLockOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md'

import { Input, type InputProps } from '../Input/Input.js'
import { cn } from '../../utils/cn.js'

export type PasswordInputProps = InputProps & {
  showLabel: string
  hideLabel: string
}

function PasswordInput({
  showLabel,
  hideLabel,
  className,
  leftIcon,
  rightIcon: _rightIcon,
  ref,
  ...props
}: PasswordInputProps) {
  const [shown, setShown] = useState(false)

  return (
    <Input
      {...props}
      ref={ref}
      type={shown ? 'text' : 'password'}
      className={cn(className)}
      leftIcon={leftIcon ?? <MdLockOutline size={18} className="text-muted" aria-hidden="true" />}
      rightIcon={
        <button
          type="button"
          onClick={() => setShown((prev) => !prev)}
          aria-label={shown ? hideLabel : showLabel}
          aria-pressed={shown}
          className={cn(
            'flex size-[18px] items-center justify-center',
            'text-muted transition-colors hover:text-foreground',
            'focus-visible:text-foreground focus-visible:outline-none'
          )}
        >
          {shown ? (
            <MdVisibilityOff size={18} aria-hidden="true" />
          ) : (
            <MdVisibility size={18} aria-hidden="true" />
          )}
        </button>
      }
    />
  )
}

export { PasswordInput }
