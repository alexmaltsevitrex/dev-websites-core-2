import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Shared `cn()` helper. Extends tailwind-merge so shared typography tokens from
 * WDK and QVAC are treated as font-size / color groups and do not cancel each
 * other incorrectly.
 */
const CUSTOM_FONT_SIZES = [
  'display-1',
  'display-2',
  'heading-1',
  'heading-2',
  'heading-3',
  'heading-4',
  'heading-5',
  'heading-6',
  'subhead-1',
  'subhead-2',
  'subhead-3',
  'body-1',
  'body-2',
  'body-lg',
  'body-md',
  'body-sm',
  'body-xs',
  'btn',
  'btn-cta',
  'code',
  'label',
  'badge',
  'caption',
  'eyebrow',
  'inter-h1',
  'inter-h2',
  'inter-h3',
  'blog-mob',
]

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: CUSTOM_FONT_SIZES }],
      'text-color': ['text-on-action', 'visited:text-on-action'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
