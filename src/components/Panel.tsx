import type { PropsWithChildren } from 'react'
import type { PanelTheme } from '../data'
import type { PhysicsShapeSpec } from './Shapes'
import { ShapeVisual } from './Shapes'
import { usePhysicsField } from '../hooks/usePhysicsField'

type PanelProps = PropsWithChildren<{
  id: string
  index: string
  label: string
  theme: PanelTheme
  shapes?: PhysicsShapeSpec[]
  gravityIntro?: boolean
}>

export function Panel({ id, index, label, theme, shapes = [], gravityIntro, children }: PanelProps) {
  const { containerRef, avoidRef, setShapeRef } = usePhysicsField(shapes, { gravityIntro })

  return (
    <section
      id={id}
      ref={containerRef}
      className="panel relative flex h-screen w-screen shrink-0 flex-col justify-center overflow-hidden px-8 pb-10 pt-28 transition-colors duration-500 md:px-24 md:pt-32"
      style={{ backgroundColor: theme.bg, color: theme.fg }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        {shapes.map((s) => (
          <div key={s.id} ref={setShapeRef(s.id)} className="absolute left-0 top-0 will-change-transform">
            <ShapeVisual kind={s.kind} size={s.size} color={s.color} opacity={s.opacity} />
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute left-8 top-24 z-10 flex items-center gap-3 font-mono text-xs tracking-widest md:left-24"
        style={{ color: theme.fg, opacity: 0.55 }}
      >
        <span style={{ color: theme.accent, opacity: 1, fontWeight: 700 }}>{index}</span>
        <span>/ {label.toUpperCase()}</span>
      </div>

      <div ref={avoidRef} className="relative z-10 max-w-4xl">
        {children}
      </div>
    </section>
  )
}
