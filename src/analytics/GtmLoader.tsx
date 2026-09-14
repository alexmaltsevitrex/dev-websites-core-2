'use client'

import { GoogleTagManager } from '@next/third-parties/google'
import { useEffect, useState } from 'react'

export type GtmLoaderProps = {
  gtmId: string
}

/**
 * Wraps `@next/third-parties` `GoogleTagManager` and delays mounting it until
 * the page has fully loaded (`window.load`). The Next.js helper itself uses
 * `next/script` with `afterInteractive`, which would otherwise inject GTM
 * during hydration and contribute to TBT.
 */
export function GtmLoader({ gtmId }: GtmLoaderProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!gtmId) return

    const onLoad = () => setReady(true)

    if (document.readyState === 'complete') {
      // Defer one tick so this doesn't fire a synchronous setState during the
      // effect (and to give the browser a frame to settle after `load`).
      const id = window.setTimeout(onLoad, 0)
      return () => window.clearTimeout(id)
    }

    window.addEventListener('load', onLoad, { once: true })
    return () => window.removeEventListener('load', onLoad)
  }, [gtmId])

  if (!ready) return null
  return <GoogleTagManager gtmId={gtmId} />
}
