import { useEffect, type RefObject } from 'react'

const MAX_SHIFT = 48
const EASE = 0.06

export function useCursorPull(layerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const layer = layerRef.current
    const area = layer?.parentElement
    if (!layer || !area) return
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = [...layer.querySelectorAll<HTMLElement>('[data-pull]')]
    let targetX = 0
    let targetY = 0
    let x = 0
    let y = 0
    let frame = 0

    const tick = () => {
      x += (targetX - x) * EASE
      y += (targetY - y) * EASE
      for (const item of items) {
        const strength = Number(item.dataset.pull)
        item.style.transform = `translate3d(${(x * strength).toFixed(1)}px, ${(y * strength).toFixed(1)}px, 0)`
      }
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.2 ? requestAnimationFrame(tick) : 0
    }

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      const rect = area.getBoundingClientRect()
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2 * MAX_SHIFT
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2 * MAX_SHIFT
      start()
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      start()
    }

    area.addEventListener('pointermove', onMove)
    area.addEventListener('pointerleave', onLeave)
    return () => {
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [layerRef])
}
