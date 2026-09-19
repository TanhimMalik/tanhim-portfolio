import { Panel } from '../Panel'
import { Reveal } from '../Reveal'
import type { PhysicsShapeSpec } from '../Shapes'
import { projects, panelThemes } from '../../data'

const LETTER_COLORS = ['#FF5A2E', '#7C3AED', '#1D4ED8', '#FF5FA2', '#101010']
const theme = panelThemes[4]

const SHAPES: PhysicsShapeSpec[] = [
  { id: 'proj-1', kind: 'circle', size: 120, color: theme.accent, opacity: 0.18 },
  { id: 'proj-2', kind: 'triangle', size: 80, color: '#7C3AED', opacity: 0.75 },
  { id: 'proj-3', kind: 'circle', size: 44, color: '#1D4ED8', opacity: 0.5 },
  { id: 'proj-4', kind: 'square', size: 50, color: '#FF5FA2', opacity: 0.6 },
  { id: 'proj-5', kind: 'ring', size: 70, color: '#101010', opacity: 0.15 },
  { id: 'proj-6', kind: 'circle', size: 28, color: theme.accent, opacity: 0.4 },
  { id: 'proj-7', kind: 'star', size: 60, color: '#7C3AED', opacity: 0.3 },
]

function RansomTitle({ text }: { text: string }) {
  return (
    <span>
      {text.split('').map((char, i) => (
        <span key={i} style={{ color: char === ' ' ? undefined : LETTER_COLORS[i % LETTER_COLORS.length] }}>
          {char}
        </span>
      ))}
    </span>
  )
}

export function Projects({ active }: { active: boolean }) {
  return (
    <Panel
      id="panel-4"
      index="05"
      label="Projects"
      theme={theme}
      shapes={SHAPES}
    >
      <Reveal active={active}>
        <h2 className="text-4xl tracking-tight md:text-5xl" style={{ fontFamily: 'var(--font-black)' }}>
          Projects
        </h2>
      </Reveal>
      <div className="mt-8 space-y-8">
        {projects.map((p, i) => (
          <Reveal active={active} delay={150 + i * 120} key={p.name}>
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-lg border-2 border-black/10 p-6 transition-all hover:-translate-y-1 hover:border-black/30"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold">
                  <RansomTitle text={p.name} />
                </h3>
                <span className="font-mono text-xs opacity-50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
              <p className="mt-2 opacity-70">{p.description}</p>
              <ul className="mt-4 space-y-2 text-sm opacity-70">
                {p.points.map((point) => (
                  <li key={point}>— {point}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className="rounded-full border-2 border-black/15 px-3 py-1 font-mono text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Panel>
  )
}
