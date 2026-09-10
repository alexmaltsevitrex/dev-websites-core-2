'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '../../utils/cn.js'

import type { CSSProperties, ReactNode, Ref } from 'react'

export type LazyVideoProps = {
  'src': string
  'type'?: string
  'className'?: string
  'style'?: CSSProperties
  'poster'?: string
  'autoPlay'?: boolean
  'loop'?: boolean
  'muted'?: boolean
  'playsInline'?: boolean
  'controls'?: boolean
  'preload'?: 'none' | 'metadata' | 'auto'
  'rootMargin'?: string
  'children'?: ReactNode
  'aria-label'?: string
  'ref'?: Ref<HTMLVideoElement>
}

function LazyVideo({
  src,
  type = 'video/webm',
  rootMargin = '0px',
  autoPlay,
  loop,
  muted,
  playsInline,
  controls,
  preload = 'none',
  poster,
  className,
  style,
  children,
  'aria-label': ariaLabel,
  ref,
}: LazyVideoProps) {
  const localRef = useRef<HTMLVideoElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (shouldLoad) return
    const el = localRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [shouldLoad, rootMargin])

  useEffect(() => {
    if (!shouldLoad) return
    const el = localRef.current
    if (!el) return
    el.load()
    if (!autoPlay) return
    const playback = el.play()
    if (playback && typeof playback.catch === 'function') {
      playback.catch(() => undefined)
    }
  }, [shouldLoad, autoPlay])

  const setRefs = (node: HTMLVideoElement | null) => {
    localRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  return (
    <video
      ref={setRefs}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      controls={controls}
      poster={poster}
      preload={preload}
      className={cn(className)}
      style={style}
      aria-label={ariaLabel}
    >
      {shouldLoad ? <source src={src} type={type} /> : null}
      {children}
    </video>
  )
}

export { LazyVideo }
