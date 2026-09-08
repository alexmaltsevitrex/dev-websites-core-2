import { MdAddCircleOutline, MdCheck, MdWarning } from 'react-icons/md'

import { cn } from '../../utils/cn.js'

import type { ComponentType, HTMLAttributes, SVGProps } from 'react'

export type ReleaseType = 'major' | 'minor' | 'patch'

type ReleaseTypeStyle = {
  badgeClassName: string
  textClassName: string
  Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>
}

const RELEASE_TYPES = new Set<ReleaseType>(['major', 'minor', 'patch'])

export function coerceBadgeReleaseType(raw: unknown): ReleaseType {
  if (typeof raw === 'string' && RELEASE_TYPES.has(raw as ReleaseType)) {
    return raw as ReleaseType
  }
  return 'patch'
}

export const BADGE_VERSION_RELEASE_TYPE_STYLES: Record<ReleaseType, ReleaseTypeStyle> = {
  major: {
    badgeClassName: 'bg-destructive/20 text-destructive',
    textClassName: 'text-destructive',
    Icon: MdWarning,
  },
  minor: {
    badgeClassName: 'bg-accent/20 text-accent',
    textClassName: 'text-accent',
    Icon: MdAddCircleOutline,
  },
  patch: {
    badgeClassName: 'bg-warning/20 text-warning',
    textClassName: 'text-warning',
    Icon: MdCheck,
  },
}

export type BadgeVersionProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  version: string
  type?: ReleaseType | string | null
  showReleaseType?: boolean
  /** Apps own i18n — required when `showReleaseType` is true. */
  releaseTypeLabel?: string
  wrapperClassName?: string
}

function BadgeVersion({
  version,
  type,
  showReleaseType = false,
  releaseTypeLabel,
  className,
  wrapperClassName,
  'aria-label': ariaLabelProp,
  ...rest
}: BadgeVersionProps) {
  const releaseType = coerceBadgeReleaseType(type)
  const styles = BADGE_VERSION_RELEASE_TYPE_STYLES[releaseType]
  const typeLabel = showReleaseType ? releaseTypeLabel : null
  const defaultGroupAriaLabel =
    showReleaseType && typeLabel && !ariaLabelProp ? `${version} ${typeLabel}` : undefined

  if (!showReleaseType) {
    return (
      <span
        data-slot="badge-version"
        data-release-type={releaseType}
        className={cn(
          'inline-flex items-center rounded-btn px-2 py-[3px] text-body-xs font-bold',
          styles.badgeClassName,
          className
        )}
        aria-label={ariaLabelProp}
        {...rest}
      >
        {version}
      </span>
    )
  }

  const Icon = styles.Icon

  return (
    <span
      className={cn('inline-flex flex-wrap items-center gap-2', wrapperClassName)}
      aria-label={ariaLabelProp ?? defaultGroupAriaLabel}
      {...rest}
    >
      <span
        data-slot="badge-version"
        data-release-type={releaseType}
        className={cn(
          'inline-flex items-center rounded-btn px-2 py-[3px] text-body-xs font-bold',
          styles.badgeClassName,
          className
        )}
      >
        {version}
      </span>
      {typeLabel ? (
        <span
          className={cn(
            'inline-flex items-center gap-1 text-btn font-semibold',
            styles.textClassName
          )}
        >
          <Icon size={14} aria-hidden />
          {typeLabel}
        </span>
      ) : null}
    </span>
  )
}

export { BadgeVersion }
