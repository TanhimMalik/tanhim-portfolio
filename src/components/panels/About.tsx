import { Panel } from '../Panel'
import { Reveal } from '../Reveal'
import type { PhysicsShapeSpec } from '../Shapes'
import { education, panelThemes } from '../../data'

const theme = panelThemes[1]

const SHAPES: PhysicsShapeSpec[] = [
  { id: 'about-1', kind: 'star', size: 170, color: theme.accent, opacity: 0.95 },
  { id: 'about-2', kind: 'square', size: 60, color: theme.accent, opacity: 0.85 },
  { id: 'about-3', kind: 'circle', size: 100, color: theme.fg, opacity: 0.15 },
  { id: 'about-4', kind: 'circle', size: 40, color: theme.accent, opacity: 0.7 },
  { id: 'about-5', kind: 'ring', size: 90, color: theme.fg, opacity: 0.3 },
  { id: 'about-6', kind: 'triangle', size: 60, color: theme.accent, opacity: 0.6 },
  { id: 'about-7', kind: 'square', size: 34, color: theme.fg, opacity: 0.25 },
  { id: 'about-8', kind: 'circle', size: 60, color: theme.accent, opacity: 0.4 },
]

export function About({ active }: { active: boolean }) {
  return (
    <Panel
      id="panel-1"
      index="02"
      label="About"
      theme={theme}
      shapes={SHAPES}
    >
      <Reveal active={active}>
        <h2 className="text-4xl tracking-tight md:text-5xl" style={{ fontFamily: 'var(--font-black)' }}>
          About
        </h2>
      </Reveal>
      <Reveal active={active} delay={120}>
        <p className="mt-8 max-w-xl text-lg leading-relaxed opacity-80">
          I'm a software engineer who likes building things that make other developers'
          lives easier — internal tools, dashboards, and the infrastructure underneath
          them. My background spans full-stack web apps, cloud infrastructure, and
          observability tooling, from fintech trading platforms to travel tech.
        </p>
      </Reveal>
      <div className="mt-12 space-y-4">
        {education.map((e, i) => (
          <Reveal active={active} delay={240 + i * 100} key={e.school}>
            <div className="border-l-2 pl-4" style={{ borderColor: theme.accent }}>
              <p className="font-medium">{e.school}</p>
              <p className="text-sm opacity-60">
                {e.degree} · {e.period}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Panel>
  )
}
