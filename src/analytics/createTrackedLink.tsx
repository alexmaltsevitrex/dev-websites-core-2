'use client'

import {
  createElement,
  type ComponentPropsWithoutRef,
  type ElementType,
  type MouseEvent,
  type ReactElement,
} from 'react'

/**
 * Discriminated tracking props. Apps keep tight `Section` / destination unions;
 * pass them as generics to `createTrackedLink`.
 */
export type CreateTrackedEvent<TSection extends string, TDestination extends string> =
  | { event?: never; section?: never; destination?: never }
  | { event: 'docs_clicked'; section: TSection; destination?: string }
  | { event: 'get_started_clicked'; section: TSection; destination?: never }
  | {
      event: 'external_link_clicked'
      section: TSection
      destination: TDestination
    }

export type TrackedCapture<TSection extends string, TDestination extends string> = {
  docsClicked: (p: { section: TSection; destination?: string }) => void
  getStartedClicked: (p: { section: TSection }) => void
  externalLinkClicked: (p: { destination: TDestination; section: TSection }) => void
}

/**
 * Builds a site `TrackedLink` that wraps the app's Link (`next-intl` navigation
 * Link or `next/link`) and fires the provided capture callbacks.
 *
 * Routing and event catalogs stay in the app — core only owns the click wiring.
 */
export function createTrackedLink<
  TLink extends ElementType,
  TSection extends string = string,
  TDestination extends string = string,
>(Link: TLink, capture: TrackedCapture<TSection, TDestination>) {
  type LinkProps = ComponentPropsWithoutRef<TLink>
  type TrackedEvent = CreateTrackedEvent<TSection, TDestination>
  type TrackedLinkProps = LinkProps & TrackedEvent

  function TrackedLink(props: TrackedLinkProps): ReactElement {
    const { event, section, destination, onClick, href, ...rest } = props as TrackedLinkProps & {
      event?: TrackedEvent['event']
      section?: TSection
      destination?: string
      onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
      href?: unknown
    }

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (event === 'docs_clicked' && section) {
        capture.docsClicked({
          section,
          destination: (destination as string | undefined) ?? String(href),
        })
      } else if (event === 'get_started_clicked' && section) {
        capture.getStartedClicked({ section })
      } else if (event === 'external_link_clicked' && section && destination) {
        capture.externalLinkClicked({
          section,
          destination: destination as TDestination,
        })
      }
      onClick?.(e)
    }

    return createElement(Link, {
      ...(rest as LinkProps),
      href,
      onClick: handleClick,
    } as LinkProps)
  }

  return TrackedLink as (props: TrackedLinkProps) => ReactElement
}

export type { CreateTrackedEvent as TrackedEvent }
