import { useEffect, useRef, type PropsWithChildren } from 'react'
import { orbState } from '../orbState'

// Everything is laid out in a 200x200 box centred on 0,0, so the SVG scales with the stage.
const SPHERE = 52.6
const RINGS = [
  { radius: SPHERE * 1.42, elevation: 22, roll: -22 },
  { radius: SPHERE * 1.68, elevation: 36, roll: 16 },
]
// [ring, size, speed in rad/s, starting angle]
const MOONS = [
  [0, 1.9, 0.38, 0.4],
  [0, 1.05, 0.38, 3.9],
  [1, 1.25, -0.24, 2.2],
] as const
const DOTS = 44
const IDLE_LIGHT = { x: -0.5, y: -0.62 }

const deg = Math.PI / 180

type Orbit = { elevation: number; roll: number }

function project(radius: number, { elevation, roll }: Orbit, a: number) {
  const x = radius * Math.cos(a)
  const y = radius * Math.sin(a) * Math.sin(elevation)
  const z = radius * Math.sin(a) * Math.cos(elevation)
  return [x * Math.cos(roll) - y * Math.sin(roll), x * Math.sin(roll) + y * Math.cos(roll), z]
}

// The hero's orb. The cursor acts as the light, the rings lean toward it, dragging
// spins the moons, and a click sends out a ripple. Motion-sensitive visitors get a still orb.
// The compact one sits in the page flow for screens too narrow for the full-size orb.
export function HeroOrb({ compact = false, children }: PropsWithChildren<{ compact?: boolean }>) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    const area = el?.closest('section')
    if (!el || !area) return
    const q = <T extends Element>(s: string) => el.querySelector<T>(s)!
    const body = q<HTMLDivElement>('[data-body]')
    const sphere = q<HTMLDivElement>('[data-sphere]')
    const swirl = q<HTMLDivElement>('[data-swirl]')
    const ringBack = q<SVGPathElement>('[data-ring="back"]')
    const ringFront = q<SVGPathElement>('[data-ring="front"]')
    const dotsBack = q<SVGPathElement>('[data-dots="back"]')
    const dotsFront = q<SVGPathElement>('[data-dots="front"]')
    const moons = MOONS.map((_, i) => [q<SVGCircleElement>(`[data-moon="${i}b"]`), q<SVGCircleElement>(`[data-moon="${i}f"]`)])

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches

    let light = { ...IDLE_LIGHT }
    let lightTarget = { ...IDLE_LIGHT }
    let lean = { x: 0, y: 0 }
    let leanTarget = { x: 0, y: 0 }
    let hovering = false
    let phase = 0
    let spin = 0
    let squash = 0
    let squashVel = 0
    let swirlAngle = 0
    let t = 0
    let visible = false

    const draw = () => {
      const orbits = RINGS.map((ring) => ({
        elevation: (ring.elevation + lean.y * 7) * deg,
        roll: (ring.roll + lean.x * 8) * deg,
      }))

      // Ring 0 is a thin line; the half nearer the viewer is drawn over the sphere.
      let back = ''
      let front = ''
      for (let i = 0; i <= 64; i++) {
        const [x, y] = project(RINGS[0].radius, orbits[0], (i / 64) * Math.PI)
        front += `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`
        const [bx, by] = project(RINGS[0].radius, orbits[0], Math.PI + (i / 64) * Math.PI)
        back += `${i ? 'L' : 'M'}${bx.toFixed(2)} ${by.toFixed(2)}`
      }
      ringFront.setAttribute('d', front)
      ringBack.setAttribute('d', back)

      // Ring 1 is dotted and turns with the moons, so the spin is visible on it too.
      let dBack = ''
      let dFront = ''
      for (let i = 0; i < DOTS; i++) {
        const [x, y, z] = project(RINGS[1].radius, orbits[1], (i / DOTS) * Math.PI * 2 - phase * 0.6)
        const r = 0.42 + (z / RINGS[1].radius) * 0.12
        const dot = `M${(x + r).toFixed(2)} ${y.toFixed(2)}a${r} ${r} 0 1 0 ${-2 * r} 0a${r} ${r} 0 1 0 ${2 * r} 0`
        if (z < 0) dBack += dot
        else dFront += dot
      }
      dotsBack.setAttribute('d', dBack)
      dotsFront.setAttribute('d', dFront)

      MOONS.forEach(([ring, size, speed, start], i) => {
        const [x, y, z] = project(RINGS[ring].radius, orbits[ring], start + phase * speed * 2.6)
        const r = (size * (1 + (z / RINGS[ring].radius) * 0.22)).toFixed(2)
        const [b, f] = moons[i]
        for (const c of [b, f]) {
          c.setAttribute('cx', x.toFixed(2))
          c.setAttribute('cy', y.toFixed(2))
          c.setAttribute('r', r)
        }
        b.style.opacity = z < 0 ? '1' : '0'
        f.style.opacity = z < 0 ? '0' : '1'
        if (i === 0) {
          orbState.moonX = x
          orbState.moonY = y
        }
      })

      const breathe = still ? 0 : Math.sin(t * 0.9) * 0.012
      const sx = 1 + breathe - squash
      const sy = 1 + breathe + squash * 0.8
      el.style.translate = `${(lean.x * 10).toFixed(2)}px ${(lean.y * 8).toFixed(2)}px`
      body.style.transform = `scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`
      sphere.style.setProperty('--lx', `${(50 + light.x * 30).toFixed(2)}%`)
      sphere.style.setProperty('--ly', `${(50 + light.y * 30).toFixed(2)}%`)
      sphere.style.setProperty('--dx', light.x.toFixed(3))
      sphere.style.setProperty('--dy', light.y.toFixed(3))
      // The shadow sits opposite the light and fades as the light comes round to face you.
      const side = Math.min(1, Math.hypot(light.x, light.y) / 0.8)
      sphere.style.setProperty('--sx', `${(50 - light.x * 30).toFixed(2)}%`)
      sphere.style.setProperty('--sy', `${(50 - light.y * 30).toFixed(2)}%`)
      sphere.style.setProperty('--sa', `${(35 + side * 65).toFixed(1)}%`)
      swirl.style.transform = `rotate(${swirlAngle.toFixed(2)}deg)`
    }

    if (still) {
      draw()
      return
    }

    let frame = 0
    let last = 0
    const tick = (now: number) => {
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016)
      last = now
      t += dt

      if (!hovering) {
        lightTarget = { x: IDLE_LIGHT.x + Math.sin(t * 0.31) * 0.18, y: IDLE_LIGHT.y + Math.cos(t * 0.23) * 0.14 }
      }
      const follow = 1 - Math.exp(-dt * 5)
      light.x += (lightTarget.x - light.x) * follow
      light.y += (lightTarget.y - light.y) * follow
      lean.x += (leanTarget.x - lean.x) * follow
      lean.y += (leanTarget.y - lean.y) * follow

      spin *= Math.exp(-dt * 1.4)
      orbState.spin = spin
      phase += dt * (0.4 + spin)
      swirlAngle += dt * (6 + spin * 40)

      // Squash and stretch on a damped spring.
      squashVel += (-170 * squash - 11 * squashVel) * dt
      squash += squashVel * dt

      draw()
      frame = requestAnimationFrame(tick)
    }
    const run = () => {
      if (!frame && visible && !document.hidden) {
        last = 0
        frame = requestAnimationFrame(tick)
      }
    }
    const pause = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) run()
      else pause()
    })
    observer.observe(el)
    const onVisibility = () => (document.hidden ? pause() : run())
    document.addEventListener('visibilitychange', onVisibility)

    const centre = () => {
      const rect = sphere.getBoundingClientRect()
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, size: rect.width }
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || !visible) return
      const c = centre()
      const dx = e.clientX - c.x
      const dy = e.clientY - c.y
      // Over the sphere the highlight sits under the cursor; outside it points toward it.
      const reach = Math.max(Math.hypot(dx, dy), c.size / 2)
      hovering = true
      lightTarget = { x: (dx / reach) * 0.85, y: (dy / reach) * 0.85 }
      const rect = area.getBoundingClientRect()
      leanTarget = {
        x: Math.max(-1, Math.min(1, dx / (rect.width / 2))),
        y: Math.max(-1, Math.min(1, dy / (rect.height / 2))),
      }
    }
    const onLeave = () => {
      hovering = false
      leanTarget = { x: 0, y: 0 }
    }

    // Drag sideways to fling the moons; a press without much movement is a click.
    let dragX: number | null = null
    let travel = 0
    const onDown = (e: PointerEvent) => {
      dragX = e.clientX
      travel = 0
      sphere.setPointerCapture(e.pointerId)
      el.dataset.dragging = ''
    }
    const onDrag = (e: PointerEvent) => {
      if (dragX === null) return
      const dx = e.clientX - dragX
      dragX = e.clientX
      travel += Math.abs(dx)
      spin = Math.max(-9, Math.min(9, spin + dx * 0.035))
    }
    const onUp = () => {
      if (dragX === null) return
      dragX = null
      delete el.dataset.dragging
      if (travel < 6) {
        orbState.pokes++
        squashVel += 2.4
        spin = Math.min(9, spin + 4)
        const ring = document.createElement('span')
        ring.className = 'hero-orb-ripple'
        body.append(ring)
        ring.addEventListener('animationend', () => ring.remove())
      }
    }

    if (finePointer) {
      area.addEventListener('pointermove', onMove)
      area.addEventListener('pointerleave', onLeave)
    }
    sphere.addEventListener('pointerdown', onDown)
    sphere.addEventListener('pointermove', onDrag)
    sphere.addEventListener('pointerup', onUp)
    sphere.addEventListener('pointercancel', onUp)
    draw()

    return () => {
      pause()
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerleave', onLeave)
      sphere.removeEventListener('pointerdown', onDown)
      sphere.removeEventListener('pointermove', onDrag)
      sphere.removeEventListener('pointerup', onUp)
      sphere.removeEventListener('pointercancel', onUp)
    }
  }, [])

  return (
    <div ref={root} aria-hidden className={compact ? 'hero-orb is-compact' : 'hero-orb'}>
      <svg className="hero-orb-layer" viewBox="-100 -100 200 200">
        <path data-ring="back" className="hero-orb-ring is-back" />
        <path data-dots="back" className="hero-orb-dots is-back" />
        {MOONS.map((_, i) => (
          <circle key={i} data-moon={`${i}b`} className={`hero-orb-moon m${i} is-back`} />
        ))}
      </svg>
      <div data-body className="hero-orb-body">
        <div data-sphere className="hero-orb-sphere">
          <div data-swirl className="hero-orb-swirl" />
          <div className="hero-orb-shine" />
        </div>
      </div>
      <svg className="hero-orb-layer" viewBox="-100 -100 200 200">
        <path data-ring="front" className="hero-orb-ring" />
        <path data-dots="front" className="hero-orb-dots" />
        {MOONS.map((_, i) => (
          <circle key={i} data-moon={`${i}f`} className={`hero-orb-moon m${i}`} />
        ))}
      </svg>
      {children}
    </div>
  )
}
