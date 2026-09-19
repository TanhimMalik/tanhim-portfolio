import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const MOBILE_BREAKPOINT = 768
const PIXELS_PER_SECTION = 900
const MAX_STEP_PX = 150
const LERP_FACTOR = 0.14
const SNAP_DEBOUNCE_MS = 150

export function useHorizontalScroll(panelCount: number) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const goToRef = useRef<((index: number) => void) | null>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const isDesktop = window.innerWidth >= MOBILE_BREAKPOINT

    if (!isDesktop) {
      const panels = Array.from(container.querySelectorAll<HTMLElement>('.panel'))
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
          if (visible) {
            const index = panels.indexOf(visible.target as HTMLElement)
            if (index !== -1) setActiveIndex(index)
          }
        },
        { threshold: 0.5 },
      )
      panels.forEach((panel) => observer.observe(panel))
      goToRef.current = (index) =>
        document.getElementById(`panel-${index}`)?.scrollIntoView({ behavior: 'smooth' })
      return () => observer.disconnect()
    }

    let rawProgress = 0
    let visualProgress = 0
    let rafId = 0
    let running = false
    let snapTimer = 0

    const render = () => {
      gsap.set(track, { x: -visualProgress * window.innerWidth })
      setActiveIndex(Math.round(visualProgress))
    }

    const tick = () => {
      visualProgress += (rawProgress - visualProgress) * LERP_FACTOR
      if (Math.abs(rawProgress - visualProgress) < 0.001) {
        visualProgress = rawProgress
        render()
        running = false
        setIsScrolling(false)
        return
      }
      render()
      rafId = requestAnimationFrame(tick)
    }

    const ensureRunning = () => {
      if (!running) {
        running = true
        setIsScrolling(true)
        rafId = requestAnimationFrame(tick)
      }
    }

    const setTarget = (value: number) => {
      rawProgress = Math.max(0, Math.min(panelCount - 1, value))
      ensureRunning()
    }

    goToRef.current = (index) => {
      window.clearTimeout(snapTimer)
      setTarget(index)
    }

    const scheduleSnap = () => {
      window.clearTimeout(snapTimer)
      snapTimer = window.setTimeout(() => {
        setTarget(Math.round(rawProgress))
      }, SNAP_DEBOUNCE_MS)
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      window.clearTimeout(snapTimer)
      let delta = e.deltaY
      if (e.deltaMode === 1) delta *= 18
      else if (e.deltaMode === 2) delta *= window.innerHeight
      delta = Math.max(-MAX_STEP_PX, Math.min(MAX_STEP_PX, delta))
      setTarget(rawProgress + delta / PIXELS_PER_SECTION)
      scheduleSnap()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        window.clearTimeout(snapTimer)
        setTarget(Math.round(rawProgress) + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        window.clearTimeout(snapTimer)
        setTarget(Math.round(rawProgress) - 1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.clearTimeout(snapTimer)
      cancelAnimationFrame(rafId)
    }
  }, [panelCount])

  const scrollToIndex = (index: number) => goToRef.current?.(index)

  return { containerRef, trackRef, activeIndex, scrollToIndex, isScrolling }
}
