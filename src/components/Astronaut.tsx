import { useEffect, useId, useRef } from 'react'
import { orbState } from '../orbState'

// Drawn with the seat at 0,0, in px at the headline's 92px size. SEAT is the flat top of
// the "e" in "the" at that size; everything is converted to em so it scales with the text.
const VB = { x: -24, y: -74, w: 58, h: 92 }
const SEAT = { x: 101, y: 25 }
const SCALE = 1.12
const em = (px: number) => `${(px / 92).toFixed(4)}em`
const HEAD = { x: 1, y: -45 }
const ARM_REST = -24
const IDLE_LIGHT = { x: -0.5, y: -0.62 }

// A small astronaut sitting on the headline, watching the hero orb. It follows the orange
// moon (more closely while the moons are spinning), looks at the cursor when it comes
// near, jumps when the orb is clicked and waves when hovered.
export function Astronaut() {
  const id = useId().replace(/:/g, '')
  const root = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = root.current
    const area = svg?.closest('section')
    if (!svg || !area) return
    const q = (s: string) => svg.querySelector<SVGElement>(s)!
    const body = q('[data-body]')
    const head = q('[data-head]')
    const visor = q('[data-visor]')
    const antenna = q('[data-antenna]')
    const arm = q('[data-arm]')
    const shinNear = q('[data-shin="near"]')
    const shinFar = q('[data-shin="far"]')
    const shadow = q('[data-shadow]')
    const glint = q('[data-glint]')
    const suit = q(`#${id}-suit`)

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches

    // Page-space positions, re-measured every so often (fonts, entrance animations, resizes).
    let headX = 0
    let headY = 0
    let planet = { x: 0, y: 0, unit: 1 }
    const measure = () => {
      const r = svg.getBoundingClientRect()
      const unit = r.width / VB.w
      headX = r.left + scrollX + (HEAD.x - VB.x) * unit
      headY = r.top + scrollY + (HEAD.y - VB.y) * unit
      const orb = area.querySelector('.hero-orb')?.getBoundingClientRect()
      if (orb) planet = { x: orb.left + scrollX + orb.width / 2, y: orb.top + scrollY + orb.height / 2, unit: orb.width / 200 }
    }

    let pointer: { x: number; y: number } | null = null
    let look = { x: 0.2, y: 0.98 }
    let light = { ...IDLE_LIGHT }
    let t = 0
    let hop = -1
    let wave = -1
    let pokes = orbState.pokes

    const aim = () => {
      if (pointer && Math.hypot(pointer.x - headX, pointer.y - headY) < 280) return pointer
      const w = 0.3 + 0.7 * Math.min(1, Math.abs(orbState.spin) / 3)
      return {
        x: planet.x + orbState.moonX * planet.unit * w,
        y: planet.y + orbState.moonY * planet.unit * w,
      }
    }

    const draw = (dt: number) => {
      const target = aim()
      const dx = target.x - headX
      const dy = target.y - headY
      const d = Math.hypot(dx, dy) || 1
      const follow = 1 - Math.exp(-dt * 4)
      look.x += (dx / d - look.x) * follow
      look.y += (dy / d - look.y) * follow

      const lightTarget = pointer
        ? { x: (pointer.x - headX) / Math.max(120, Math.hypot(pointer.x - headX, pointer.y - headY)), y: (pointer.y - headY) / Math.max(120, Math.hypot(pointer.x - headX, pointer.y - headY)) }
        : { x: IDLE_LIGHT.x + Math.sin(t * 0.31) * 0.18, y: IDLE_LIGHT.y + Math.cos(t * 0.23) * 0.14 }
      light.x += (lightTarget.x - light.x) * follow
      light.y += (lightTarget.y - light.y) * follow

      // Jump when the orb is clicked: up and down with the legs kicking out.
      let lift = 0
      let kick = 0
      if (hop >= 0) {
        const p = hop / 0.55
        if (p >= 1) hop = -1
        else {
          lift = Math.sin(Math.PI * p) * 7
          kick = Math.sin(Math.PI * p) * 32
          hop += dt
        }
      }

      // Wave: raise the arm, shake it a few times, put it back.
      let armAngle = ARM_REST
      if (wave >= 0) {
        const up = Math.min(1, wave / 0.25, (1.7 - wave) / 0.3)
        if (wave >= 1.7) wave = -1
        else {
          const k = up * up * (3 - 2 * up)
          armAngle = ARM_REST + (-112 + Math.sin(wave * 13) * 16 - ARM_REST) * k
          wave += dt
        }
      }

      const swing = still ? 0 : Math.sin(t * 2.1)
      shinNear.setAttribute('transform', `rotate(${(-6 + swing * 11 - kick).toFixed(2)})`)
      shinFar.setAttribute('transform', `rotate(${(-3 + Math.sin(t * 2.1 + 2.4) * (still ? 0 : 11) - kick * 0.8).toFixed(2)})`)
      arm.setAttribute('transform', `rotate(${armAngle.toFixed(2)})`)
      body.setAttribute('transform', `translate(0 ${(-lift).toFixed(2)})`)
      shadow.setAttribute('transform', `scale(${(1 - lift / 18).toFixed(3)} 1)`)
      shadow.style.opacity = (1 - lift / 12).toFixed(2)
      antenna.setAttribute('transform', `rotate(${((still ? 0 : Math.sin(t * 2.7) * 4) - kick * 0.4).toFixed(2)})`)

      const bob = still ? 0 : Math.sin(t * 1.3) * 0.4
      head.setAttribute('transform', `rotate(${(look.x * look.y * 12).toFixed(2)}) translate(0 ${bob.toFixed(2)})`)
      visor.setAttribute('transform', `translate(${((look.x - 1) * 3.6).toFixed(2)} ${(look.y * 2.6).toFixed(2)})`)

      const fx = (0.5 + light.x * 0.24).toFixed(3)
      const fy = (0.5 + light.y * 0.24).toFixed(3)
      suit.setAttribute('cx', fx)
      suit.setAttribute('cy', fy)
      suit.setAttribute('fx', fx)
      suit.setAttribute('fy', fy)
      glint.setAttribute('transform', `translate(${(light.x * 4).toFixed(2)} ${(light.y * 4).toFixed(2)})`)
    }

    if (still) {
      const settle = window.setTimeout(() => {
        measure()
        look = { x: 0, y: 0 }
        draw(10)
      }, 1600)
      return () => clearTimeout(settle)
    }

    let frame = 0
    let last = 0
    let frames = 0
    let visible = false
    const tick = (now: number) => {
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016)
      last = now
      t += dt
      if (frames++ % 30 === 0) measure()
      if (orbState.pokes !== pokes) {
        pokes = orbState.pokes
        hop = 0
      }
      draw(dt)
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
    observer.observe(svg)
    const onVisibility = () => (document.hidden ? pause() : run())
    document.addEventListener('visibilitychange', onVisibility)

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') pointer = { x: e.pageX, y: e.pageY }
    }
    const onLeave = () => {
      pointer = null
    }
    const onWave = () => {
      if (wave < 0) wave = 0
    }
    const onPoke = () => {
      hop = 0
      onWave()
    }
    if (finePointer) {
      area.addEventListener('pointermove', onMove)
      area.addEventListener('pointerleave', onLeave)
      svg.addEventListener('pointerenter', onWave)
    }
    svg.addEventListener('pointerdown', onPoke)

    return () => {
      pause()
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerleave', onLeave)
      svg.removeEventListener('pointerenter', onWave)
      svg.removeEventListener('pointerdown', onPoke)
    }
  }, [id])

  const suit = `url(#${id}-suit)`
  const far = `url(#${id}-far)`
  const boot = `url(#${id}-boot)`

  return (
    <svg
      ref={root}
      aria-hidden
      className="astronaut"
      viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
      style={{
        left: em(SEAT.x + VB.x * SCALE),
        top: em(SEAT.y + VB.y * SCALE),
        width: em(VB.w * SCALE),
        height: em(VB.h * SCALE),
      }}
    >
      <defs>
        <radialGradient id={`${id}-suit`} cx="0.38" cy="0.35" fx="0.38" fy="0.35" r="0.85">
          <stop offset="0" className="astro-hi" />
          <stop offset="0.5" className="astro-mid" />
          <stop offset="1" className="astro-lo" />
        </radialGradient>
        <linearGradient id={`${id}-far`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="astro-mid" />
          <stop offset="1" className="astro-lo" />
        </linearGradient>
        <linearGradient id={`${id}-boot`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="astro-boot-hi" />
          <stop offset="1" className="astro-boot-lo" />
        </linearGradient>
        <linearGradient id={`${id}-visor`} x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0" className="astro-visor-hi" />
          <stop offset="0.65" className="astro-visor-lo" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <clipPath id={`${id}-helmet`}>
          <circle cx="1" cy="-14" r="14.5" />
        </clipPath>
      </defs>

      <ellipse data-shadow className="astro-shadow" cx="3" cy="0.8" rx="12" ry="1.7" filter={`url(#${id}-soft)`} />

      <g data-body>
        {/* Far leg */}
        <rect x="-5" y="-11" width="20" height="9.5" rx="4.75" fill={far} />
        <g transform="translate(12 -6)">
          <g data-shin="far">
            <rect x="-4" y="-2" width="8" height="17" rx="4" fill={far} />
            <rect x="-4.6" y="11.5" width="11.5" height="7" rx="3.4" fill={boot} />
          </g>
        </g>

        {/* Backpack and body */}
        <rect x="-19" y="-33" width="11" height="24" rx="4" fill={far} />
        <rect x="-11.5" y="-31" width="21.5" height="31" rx="9.5" fill={suit} />
        <rect x="3.2" y="-24.5" width="5.6" height="7" rx="1.6" className="astro-panel" />
        <circle cx="6" cy="-21" r="1.25" className="astro-light" />

        {/* Near leg */}
        <rect x="-3" y="-10" width="21" height="10" rx="5" fill={suit} />
        <g transform="translate(15 -5)">
          <g data-shin="near">
            <rect x="-4.3" y="-2" width="8.6" height="17.5" rx="4.3" fill={suit} />
            <rect x="-5" y="11.5" width="12.5" height="7.5" rx="3.6" fill={boot} />
          </g>
        </g>

        {/* Head */}
        <ellipse cx="0" cy="-31" rx="9.8" ry="3.4" className="astro-ring" />
        <g transform="translate(0 -31)">
          <g data-head>
            <g transform="translate(-6 -25)">
              <g data-antenna>
                <line x1="0" y1="2" x2="-3.5" y2="-9" className="astro-wire" />
                <circle cx="-3.5" cy="-9.5" r="2.1" className="astro-tip" />
              </g>
            </g>
            <circle cx="1" cy="-14" r="14.5" fill={suit} />
            <circle cx="-8" cy="-13" r="3" className="astro-ear" />
            <g clipPath={`url(#${id}-helmet)`}>
              <g data-visor>
                <ellipse cx="6.5" cy="-13" rx="9.8" ry="11" className="astro-bezel" />
                <ellipse cx="6.5" cy="-13" rx="8.4" ry="9.6" fill={`url(#${id}-visor)`} />
                <circle cx="10.5" cy="-7" r="3.4" className="astro-reflection" filter={`url(#${id}-soft)`} />
                <ellipse cx="3.6" cy="-18.5" rx="2.6" ry="1.3" transform="rotate(-30 3.6 -18.5)" className="astro-visor-glint" />
              </g>
            </g>
            <g data-glint>
              <ellipse cx="-4.5" cy="-21" rx="3.4" ry="1.8" transform="rotate(-38 -4.5 -21)" className="astro-glint" />
            </g>
          </g>
        </g>

        {/* Near arm, resting on the knee (drawn last so a wave passes in front of the helmet) */}
        <g transform="translate(3 -25)">
          <g data-arm>
            <rect x="-3.3" y="-3.3" width="6.6" height="19" rx="3.3" fill={suit} />
            <rect x="-3.3" y="10.6" width="6.6" height="2" className="astro-cuff" />
            <circle cx="0" cy="16.3" r="3.8" fill={suit} />
          </g>
        </g>
      </g>
    </svg>
  )
}
