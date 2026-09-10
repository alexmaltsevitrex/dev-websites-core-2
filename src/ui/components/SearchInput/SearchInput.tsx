'use client'

import { MdSearch } from 'react-icons/md'

import { Input } from '../Input/Input.js'
import { cn } from '../../utils/cn.js'

export type SearchInputProps = {
  'value': string
  'onChange': (value: string) => void
  'placeholder'?: string
  'className'?: string
  'id'?: string
  'name'?: string
  'disabled'?: boolean
  'aria-label'?: string
}

function SearchInput({
  value,
  onChange,
  placeholder,
  className,
  id,
  name,
  disabled,
  'aria-label': ariaLabel,
}: SearchInputProps) {
  return (
    <Input
      id={id}
      name={name}
      type="search"
      value={value}
      disabled={disabled}
      aria-label={ariaLabel}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={cn('font-semibold placeholder:font-normal', className)}
      leftIcon={<MdSearch size={16} className="text-muted" aria-hidden="true" />}
    />
  )
}

export { SearchInput }
