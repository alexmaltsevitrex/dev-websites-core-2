'use client'

import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

import { Button } from '../Button/Button.js'
import { focusRingClassName } from '../../a11y/focus.js'
import { cn } from '../../utils/cn.js'

import type { EmblaOptionsType } from 'embla-carousel'

type EmblaCarouselType = UseEmblaCarouselType[1]

export type CarouselApi = {
  selectedIndex: number
  scrollSnaps: number[]
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollTo: (index: number) => void
  scrollPrev: () => void
  scrollNext: () => void
  viewportRef: (node: HTMLElement | null) => void
  emblaApi: EmblaCarouselType | undefined
}

const CarouselContext = createContext<CarouselApi | null>(null)

export function useCarousel() {
  const context = useContext(CarouselContext)
  if (!context) {
    throw new Error('Carousel components must be used within <Carousel>')
  }
  return context
}

export type CarouselProps = HTMLAttributes<HTMLDivElement> & {
  options?: EmblaOptionsType
  /** Accessible name for the carousel region. Apps own i18n. */
  label: string
  children: ReactNode
}

function Carousel({ options, label, className, children, ...props }: CarouselProps) {
  const [viewportRef, emblaApi] = useEmblaCarousel(options)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!emblaApi) return

    function onSelect(api: NonNullable<typeof emblaApi>) {
      setSelectedIndex(api.selectedScrollSnap())
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)

    return () => {
      emblaApi.off('reInit', onSelect)
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const value: CarouselApi = {
    viewportRef,
    emblaApi,
    selectedIndex,
    scrollSnaps,
    canScrollPrev,
    canScrollNext,
    scrollTo: (index) => emblaApi?.scrollTo(index),
    scrollPrev: () => emblaApi?.scrollPrev(),
    scrollNext: () => emblaApi?.scrollNext(),
  }

  return (
    <CarouselContext.Provider value={value}>
      <div className={cn('flex flex-col', className)} {...props}>
        <div aria-label={label} aria-roledescription="carousel">
          {children}
        </div>
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselViewport({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { viewportRef } = useCarousel()
  return (
    <div ref={viewportRef} className={cn('overflow-hidden', className)} {...props}>
      {children}
    </div>
  )
}

function CarouselContainer({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex', className)} {...props}>
      {children}
    </div>
  )
}

function CarouselSlide({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn('min-w-0 shrink-0 grow-0 basis-full', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export type CarouselControlsProps = {
  className?: string
  prevLabel: string
  nextLabel: string
}

function ChevronLeft() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20" fill="none">
      <path
        d="M12.5 4.5 7 10l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20" fill="none">
      <path
        d="M7.5 4.5 13 10l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CarouselControls({ className, prevLabel, nextLabel }: CarouselControlsProps) {
  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useCarousel()

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        type="button"
        variant="secondary"
        size="icon"
        aria-label={prevLabel}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <ChevronLeft />
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="icon"
        aria-label={nextLabel}
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}

export type CarouselPaginationProps = {
  className?: string
  paginationLabel: string
  slideLabel: (slide: number) => string
}

function CarouselPagination({ className, paginationLabel, slideLabel }: CarouselPaginationProps) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel()

  if (scrollSnaps.length <= 1) return null

  return (
    <div
      role="tablist"
      aria-label={paginationLabel}
      className={cn('flex items-center justify-center gap-2', className)}
    >
      {scrollSnaps.map((_, index) => {
        const isActive = index === selectedIndex
        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-label={slideLabel(index + 1)}
            aria-selected={isActive}
            onClick={() => scrollTo(index)}
            className={cn(
              'size-2 cursor-pointer rounded-full transition-colors',
              focusRingClassName,
              isActive ? 'bg-accent' : 'bg-foreground/25 hover:bg-foreground/40'
            )}
          />
        )
      })}
    </div>
  )
}

export {
  Carousel,
  CarouselViewport,
  CarouselContainer,
  CarouselSlide,
  CarouselControls,
  CarouselPagination,
}
