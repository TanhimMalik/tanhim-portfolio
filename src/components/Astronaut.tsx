import { useEffect, useId, useRef } from 'react'
import { orbState } from '../orbState'

// Drawn with the seat at 0,0, in px for a 92px headline; positions are converted to em so
// it scales with the text it sits on. The default seat is the flat top of the "e" in "the".
const VB = { x: -24, y: -74, w: 58, h: 92 }
const SCALE = 1.12
const ON_THE_E = { x: 101 / 92, y: 25 / 92 }
const em = (value: number) => `${value.toFixed(4)}em`
const HEAD = { x: 1, y: -45 }
const ARM_REST = -24
const IDLE_LIGHT = { x: -0.5, y: -0.62 }
const GRAVITY = 1500 // px/s², for jumping off and dropping in

// How many times the hero astronaut has come back to the top, so the one at Contact knows
// to drop in again next time instead of already being there.
let heroReturns = 0

type Travel = 'waiting' | 'arriving' | 'seated' | 'leaving' | 'gone'

type Props = {
  /** Sit on a word (its parent span) or on top of the compact orb's planet. */
  perch?: 'word' | 'planet'
  /** Where on the word it sits, in em from the word's top-left. */
  seat?: { x: number; y: number }
  /** Watch the hero orb, or look out at the page and the visitor. */
  watch?: 'orb' | 'viewer'
  /** Wave when it lands. */
  greet?: boolean
  /**
   * In the hero it drops in, jumps off once the page is scrolled and drops back in at the
   * top. At Contact it drops in when the card comes into view.
   */
  journey?: 'leaves' | 'arrives'
  className?: string
}

// A small astronaut sitting on a word or on the hero planet. Watching the orb, it follows
// the orange moon (more closely while the moons are spinning) and jumps when the orb is
// clicked. It looks at the cursor when it comes near, waves when hovered and jumps when
// pressed, or when a button near it is. Scrolling down, the hero one jumps off and falls
// out of the hero, and the one at Contact drops in, as if it's the same astronaut.
export function Astronaut({
  perch = 'word',
  seat = ON_THE_E,
  watch = 'orb',
  greet = false,
  journey = 'leaves',
  className = '',
}: Props) {
  const id = useId().replace(/:/g, '')
  const root = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = root.current
    const area = svg?.closest<HTMLElement>('section, footer')
    if (!svg || !area) return
    const q = (s: string) => svg.querySelector<SVGElement>(s)!
    const fly = q('[data-fly]')
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
    // pxUnit is CSS px per SVG unit. The scroll lines are where the hero one jumps off and
    // where it comes back.
    let headX = 0
    let headY = 0
    let pxUnit = 1
    let leaveLine = Infinity
    let returnLine = -Infinity
    let planet = { x: 0, y: 0, unit: 1 }
    const measure = () => {
      const r = svg.getBoundingClientRect()
      const unit = r.width / VB.w
      pxUnit = unit || 1
      headX = r.left + scrollX + (HEAD.x - VB.x) * unit
      headY = r.top + scrollY + (HEAD.y - VB.y) * unit
      const top = area.getBoundingClientRect().top + scrollY
      // Jump once the page has moved a little and the astronaut is in the top half of the screen, so a
      // planet that starts below the fold on a short phone isn't left the moment it comes into view.
      leaveLine = Math.max(top + area.offsetHeight * 0.18, headY - innerHeight * 0.45)
      returnLine = top + area.offsetHeight * 0.06
      if (watch !== 'orb') return
      const orbEl = svg.closest('.hero-orb') ?? [...area.querySelectorAll('.hero-orb')].find((o) => o.getClientRects().length)
      const orb = orbEl?.getBoundingClientRect()
      if (orb) planet = { x: orb.left + scrollX + orb.width / 2, y: orb.top + scrollY + orb.height / 2, unit: orb.width / 200 }
    }

    let pointer: { x: number; y: number } | null = null
    let look = { x: 0.2, y: 0.98 }
    let light = { ...IDLE_LIGHT }
    let t = 0
    let hop = -1
    let hopSize = 7
    let wave = -1
    let pokes = orbState.pokes

    let travel: Travel = still ? 'seated' : 'waiting'
    let travelT = 0
    let delay = journey === 'arrives' ? 0.35 : 1.1
    let seenReturns = heroReturns
    const drop = perch === 'planet' ? 160 : 230
    const setTravel = (next: Travel) => {
      travel = next
      travelT = 0
      svg.style.pointerEvents = next === 'seated' ? '' : 'none'
    }
    const land = () => {
      setTravel('seated')
      seenReturns = heroReturns
      hop = 0
      hopSize = 3.5
      if (greet) wave = 0
    }

    const aim = () => {
      if (pointer && (watch === 'viewer' || Math.hypot(pointer.x - headX, pointer.y - headY) < 280)) return pointer
      // Out at the page: down and to the left, toward the buttons, glancing around a little.
      if (watch === 'viewer') return { x: headX - 70 + Math.sin(t * 0.45) * 50, y: headY + 150 }
      // On the planet it watches the moon go round; from the headline mostly the planet.
      const w = perch === 'planet' ? 1 : 0.3 + 0.7 * Math.min(1, Math.abs(orbState.spin) / 3)
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

      // Jump when the orb is clicked (or bounce on landing): up and down, legs kicking out.
      let lift = 0
      let kick = 0
      if (hop >= 0) {
        const p = hop / 0.55
        if (p >= 1) hop = -1
        else {
          lift = Math.sin(Math.PI * p) * hopSize
          kick = Math.sin(Math.PI * p) * hopSize * 4.5
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

      // Dropping in, jumping off and falling. Distances are worked out in px, then drawn in
      // SVG units; the tumble turns around the middle of the body.
      let flyX = 0
      let flyY = 0
      let spin = 0
      let alpha = travel === 'waiting' || travel === 'gone' ? 0 : 1
      let ground = alpha
      if (travel === 'arriving') {
        const fallen = 0.5 * GRAVITY * travelT * travelT
        if (fallen >= drop) land()
        else {
          flyY = (fallen - drop) / pxUnit
          spin = (1 - fallen / drop) * -12
          alpha = Math.min(1, travelT / 0.12)
          ground = fallen / drop
          armAngle = -100
          kick = 18
        }
      } else if (travel === 'leaving') {
        const crouch = 0.16
        if (travelT < crouch) {
          const c = Math.sin((Math.PI * travelT) / crouch)
          flyY = c * 1.6
          armAngle = ARM_REST - c * 30
        } else {
          const air = travelT - crouch
          flyX = (160 * air) / pxUnit
          flyY = (-270 * air + 0.5 * GRAVITY * air * air) / pxUnit
          spin = air * 320
          armAngle = -120 + Math.sin(air * 22) * 35
          kick = 24 + Math.sin(air * 17) * 14
          alpha = Math.min(1, Math.max(0, (1.35 - air) / 0.35))
          ground = Math.max(0, 1 - air * 4)
          if (air > 1.35) setTravel('gone')
        }
      }
      fly.setAttribute('transform', `translate(${flyX.toFixed(2)} ${flyY.toFixed(2)}) rotate(${spin.toFixed(1)} 2 -30)`)
      fly.style.opacity = alpha.toFixed(2)

      const swing = still ? 0 : Math.sin(t * 2.1)
      shinNear.setAttribute('transform', `rotate(${(-6 + swing * 11 - kick).toFixed(2)})`)
      shinFar.setAttribute('transform', `rotate(${(-3 + Math.sin(t * 2.1 + 2.4) * (still ? 0 : 11) - kick * 0.8).toFixed(2)})`)
      arm.setAttribute('transform', `rotate(${armAngle.toFixed(2)})`)
      body.setAttribute('transform', `translate(0 ${(-lift).toFixed(2)})`)
      shadow.setAttribute('transform', `scale(${(1 - lift / 18).toFixed(3)} 1)`)
      shadow.style.opacity = ((1 - lift / 12) * ground).toFixed(2)
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
      travelT += dt
      if (frames++ % 30 === 0) measure()

      const y = scrollY
      if (travel === 'waiting') {
        if (journey === 'leaves' && y > leaveLine) setTravel('gone')
        else if (headY - y < innerHeight * (journey === 'leaves' ? 0.9 : 0.72)) {
          delay -= dt
          if (delay <= 0) setTravel('arriving')
        }
      } else if (travel === 'seated' && journey === 'leaves' && y > leaveLine) {
        setTravel('leaving')
      } else if (travel === 'gone' && journey === 'leaves' && y < returnLine) {
        heroReturns++
        setTravel('arriving')
      }

      if (watch === 'orb' && orbState.pokes !== pokes) {
        pokes = orbState.pokes
        if (travel === 'seated') {
          hop = 0
          hopSize = 7
        }
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

    // Starts a little before it scrolls into view, so the one at Contact can hide itself
    // before it's seen if it needs to drop in again.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) {
          if (journey === 'arrives' && travel === 'seated' && heroReturns > seenReturns) {
            setTravel('waiting')
            delay = 0.35
            fly.style.opacity = '0'
          }
          run()
          return
        }
        pause()
        // Scrolled away mid-flight: finish it now rather than freeze in mid-air.
        if (travel === 'leaving') setTravel('gone')
        if (travel === 'arriving') land()
        fly.style.opacity = travel === 'gone' || travel === 'waiting' ? '0' : '1'
        fly.removeAttribute('transform')
      },
      { rootMargin: '0px 0px 200px 0px' },
    )
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
      if (travel === 'seated' && wave < 0) wave = 0
    }
    const onPoke = () => {
      if (travel !== 'seated') return
      hop = 0
      hopSize = 7
      onWave()
    }
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('button')) onPoke()
    }
    if (finePointer) {
      area.addEventListener('pointermove', onMove)
      area.addEventListener('pointerleave', onLeave)
      svg.addEventListener('pointerenter', onWave)
    }
    svg.addEventListener('pointerdown', onPoke)
    area.addEventListener('click', onClick)

    return () => {
      pause()
      area.removeEventListener('click', onClick)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerleave', onLeave)
      svg.removeEventListener('pointerenter', onWave)
      svg.removeEventListener('pointerdown', onPoke)
    }
  }, [id, perch, watch, greet, journey])

  const suit = `url(#${id}-suit)`
  const far = `url(#${id}-far)`
  const boot = `url(#${id}-boot)`

  return (
    <svg
      ref={root}
      aria-hidden
      className={`astronaut ${perch === 'planet' ? 'on-planet' : ''} ${className}`}
      viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
      style={{
        // On the planet, CSS puts the seat on top of the sphere.
        ...(perch === 'word' && { left: em(seat.x + (VB.x * SCALE) / 92), top: em(seat.y + (VB.y * SCALE) / 92) }),
        width: em((VB.w * SCALE) / 92),
        height: em((VB.h * SCALE) / 92),
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

      <g data-fly>
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
      </g>
    </svg>
  )
}
