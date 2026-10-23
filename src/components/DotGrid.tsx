import { useEffect, useRef } from 'react'

const GAP = 22
const DOT = 1
const RADIUS = 180
const BULGE = 8
const LEVELS = 12
const colors = {
  light: { dot: [22, 20, 15, 0.1], accent: [255, 90, 31] },
  dark: { dot: [243, 240, 234, 0.08], accent: [255, 110, 60] },
}

// The hero's dot pattern. With a mouse, dots near the cursor swell, push outward
// and turn orange, then settle back once it leaves.
export function DotGrid() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    const area = canvas?.closest('section')
    if (!canvas || !ctx || !area) return

    let width = 0
    let height = 0
    let frame = 0
    let strength = 0
    let target = 0
    let x = -1000
    let y = -1000
    let tx = x
    let ty = y

    const draw = () => {
      const theme = document.documentElement.classList.contains('dark') ? colors.dark : colors.light
      const [dr, dg, db, da] = theme.dot
      const [ar, ag, ab] = theme.accent
      ctx.clearRect(0, 0, width, height)

      // Resting dots fade out away from the top centre. Bucket them by opacity so
      // each bucket is a single fill.
      const buckets: Path2D[] = Array.from({ length: LEVELS }, () => new Path2D())
      const near: [number, number, number, number][] = []
      for (let cy = GAP / 2; cy < height; cy += GAP) {
        for (let cx = GAP / 2; cx < width; cx += GAP) {
          const fade = Math.max(0, 1 - Math.hypot((cx - width / 2) / (width * 0.8), cy / (height * 0.75)))
          const dist = strength > 0.01 ? Math.hypot(cx - x, cy - y) : RADIUS
          if (dist < RADIUS) {
            near.push([cx, cy, dist, fade])
          } else if (fade > 0) {
            const path = buckets[Math.min(LEVELS - 1, Math.floor(fade * LEVELS))]
            path.moveTo(cx + DOT, cy)
            path.arc(cx, cy, DOT, 0, Math.PI * 2)
          }
        }
      }
      buckets.forEach((path, i) => {
        ctx.fillStyle = `rgb(${dr} ${dg} ${db} / ${(da * (i + 1)) / LEVELS})`
        ctx.fill(path)
      })

      for (const [cx, cy, dist, fade] of near) {
        const t = 1 - dist / RADIUS
        const e = t * t * (3 - 2 * t) * strength
        const push = dist > 0 ? (e * BULGE) / dist : 0
        // Blend from the resting dot to the accent so the edge of the effect has no seam.
        const mix = Math.min(1, e * 1.6)
        const alpha = da * fade + (0.95 * (0.45 + 0.55 * fade) - da * fade) * e
        ctx.fillStyle = `rgb(${dr + (ar - dr) * mix} ${dg + (ag - dg) * mix} ${db + (ab - db) * mix} / ${alpha})`
        ctx.beginPath()
        ctx.arc(cx + (cx - x) * push, cy + (cy - y) * push, DOT + e * 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const tick = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      strength += (target - strength) * 0.08
      draw()
      const settling = Math.abs(target - strength) > 0.005 || Math.abs(tx - x) + Math.abs(ty - y) > 0.3
      frame = settling ? requestAnimationFrame(tick) : 0
    }

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      tx = e.clientX - rect.left
      ty = e.clientY - rect.top
      if (target === 0) {
        x = tx
        y = ty
      }
      target = 1
      start()
    }

    const onLeave = () => {
      target = 0
      start()
    }

    const resizer = new ResizeObserver(resize)
    resizer.observe(canvas)
    const themeWatcher = new MutationObserver(draw)
    themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const interactive =
      matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches
    if (interactive) {
      area.addEventListener('pointermove', onMove)
      area.addEventListener('pointerleave', onLeave)
    }

    return () => {
      resizer.disconnect()
      themeWatcher.disconnect()
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="absolute inset-0 size-full" />
}
