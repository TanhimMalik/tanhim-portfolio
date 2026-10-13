import { useEffect, useRef, useState } from 'react'

const DURATION = 1400

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const target = parseInt(value, 10)
  const suffix = value.replace(/^\d+/, '')
  const [current, setCurrent] = useState(target)

  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setCurrent(0)
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const startedAt = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - startedAt) / DURATION, 1)
          setCurrent(Math.round(target * (1 - Math.pow(1 - t, 4))))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target])

  return (
    <>
      <span ref={ref} aria-hidden className="tabular-nums">
        {current}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </>
  )
}
