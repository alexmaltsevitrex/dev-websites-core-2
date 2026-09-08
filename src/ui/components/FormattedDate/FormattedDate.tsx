import { cn } from '../../utils/cn.js'

export type FormatDateOptions = {
  month?: 'short' | 'long'
}

export type FormattedDateProps = {
  iso: string | null | undefined
  locale: string
  className?: string
  month?: FormatDateOptions['month']
}

function formatDate(
  iso: string | null | undefined,
  locale: string,
  options?: FormatDateOptions
): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString(locale, {
    year: 'numeric',
    month: options?.month ?? 'long',
    day: 'numeric',
  })
}

function FormattedDate({ iso, locale, className, month }: FormattedDateProps) {
  if (!iso) return null

  return (
    <time dateTime={iso} className={cn(className)}>
      {formatDate(iso, locale, { month })}
    </time>
  )
}

export { FormattedDate, formatDate }
