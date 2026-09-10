'use client'

import { useEffect, useRef, useState } from 'react'
import { MdCheck, MdContentCopy } from 'react-icons/md'

import { IconButton, type IconButtonProps } from '../IconButton/IconButton.js'
import { cn } from '../../utils/cn.js'

const COPIED_DISPLAY_MS = 1500

export type CopyButtonProps = Omit<IconButtonProps, 'children' | 'onClick' | 'value'> & {
  text: string
  copiedAriaLabel?: string
  iconSize?: number
  onCopied?: () => void
}

function CopyButton({
  text,
  copiedAriaLabel,
  iconSize = 14,
  className,
  'aria-label': ariaLabel,
  onCopied,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function handleCopy() {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        onCopied?.()
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setCopied(false), COPIED_DISPLAY_MS)
      })
      .catch(() => {
        // Silent — caller's value remains visible for manual copy.
      })
  }

  return (
    <IconButton
      type="button"
      {...props}
      onClick={handleCopy}
      aria-label={copied && copiedAriaLabel ? copiedAriaLabel : ariaLabel}
      className={cn('size-7', className)}
    >
      {copied ? (
        <MdCheck size={iconSize} aria-hidden="true" className="text-success" />
      ) : (
        <MdContentCopy size={iconSize} aria-hidden="true" />
      )}
    </IconButton>
  )
}

export { CopyButton }
