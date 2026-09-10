'use client'

import { useEffect, useRef, useState } from 'react'

export type UseInViewOptions = {
  once?: boolean
  rootMargin?: string
  threshold?: number
}

export function useInView<T extends Element>({
  once = true,
  rootMargin = '0px 0px -15% 0px',
  threshold = 0,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      const id = setTimeout(() => setInView(true))
      return () => clearTimeout(id)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((entry) => entry.isIntersecting)
        setInView(isIntersecting)
        if (isIntersecting && once) observer.disconnect()
      },
      { rootMargin, threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, rootMargin, threshold])

  return { ref, inView }
}
