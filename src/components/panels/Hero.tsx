import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Panel } from '../Panel'
import { Reveal } from '../Reveal'
import type { PhysicsShapeSpec } from '../Shapes'
import { profile, panelThemes } from '../../data'

const NAME_LINES = profile.name.split(' ')
const theme = panelThemes[0]

const SHAPES: PhysicsShapeSpec[] = [
  { id: 'hero-1', kind: 'circle', size: 220, color: theme.accent, opacity: 0.95 },
  { id: 'hero-2', kind: 'circle', size: 90, color: theme.accent, opacity: 0.9 },
  { id: 'hero-3', kind: 'circle', size: 46, color: theme.fg, opacity: 0.25 },
  { id: 'hero-4', kind: 'ring', size: 130, color: theme.accent, opacity: 1 },
  { id: 'hero-5', kind: 'ring', size: 60, color: theme.fg, opacity: 0.4 },
  { id: 'hero-6', kind: 'triangle', size: 70, color: theme.fg, opacity: 0.3 },
  { id: 'hero-7', kind: 'square', size: 55, color: theme.accent, opacity: 0.85 },
  { id: 'hero-8', kind: 'star', size: 90, color: theme.fg, opacity: 0.2 },
  { id: 'hero-9', kind: 'circle', size: 34, color: theme.accent, opacity: 0.7 },
]

export function Hero({ active }: { active: boolean }) {
  const lettersRef = useRef<HTMLSpanElement[]>([])
  lettersRef.current = []

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(lettersRef.current, { y: '110%', rotate: 6, opacity: 0 })
      gsap.to(lettersRef.current, {
        y: '0%',
        rotate: 0,
        opacity: 1,
        duration: 1,
        ease: 'back.out(1.7)',
        stagger: 0.045,
        delay: 0.2,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <Panel
      id="panel-0"
      index="01"
      label="Intro"
      theme={theme}
      shapes={SHAPES}
      gravityIntro
    >
      <p className="mb-4 font-mono text-sm" style={{ color: theme.accent }}>
        Hi, I&apos;m
      </p>
      <h1
        className="leading-[0.9] tracking-tight"
        style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(2.75rem, 11vw, 7rem)' }}
      >
        {NAME_LINES.map((word) => (
          <span key={word} className="block overflow-hidden whitespace-nowrap pb-2">
            {word.split('').map((char, ci) => (
              <span
                key={`${word}-${ci}`}
                ref={(el) => {
                  if (el) lettersRef.current.push(el)
                }}
                className="inline-block will-change-transform"
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </h1>
      <Reveal active={active} delay={500}>
        <h2 className="mt-4 text-2xl opacity-80 md:text-3xl">{profile.role}</h2>
      </Reveal>
      <Reveal active={active} delay={650}>
        <p className="mt-8 max-w-xl text-lg opacity-70">{profile.tagline}</p>
      </Reveal>
      <Reveal active={active} delay={800}>
        <div className="mt-12 hidden items-center gap-2 font-mono text-xs opacity-60 md:flex">
          <span>scroll to explore</span>
          <span className="inline-block animate-pulse">→</span>
        </div>
      </Reveal>
    </Panel>
  )
}
