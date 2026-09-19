import { Panel } from '../Panel'
import { Reveal } from '../Reveal'
import type { PhysicsShapeSpec } from '../Shapes'
import { skills, panelThemes } from '../../data'

const theme = panelThemes[5]

const SHAPES: PhysicsShapeSpec[] = [
  { id: 'skills-1', kind: 'circle', size: 160, color: theme.accent, opacity: 0.45 },
  { id: 'skills-2', kind: 'square', size: 50, color: theme.accent, opacity: 0.5 },
  { id: 'skills-3', kind: 'ring', size: 80, color: '#101010', opacity: 0.15 },
  { id: 'skills-4', kind: 'triangle', size: 60, color: '#101010', opacity: 0.12 },
  { id: 'skills-5', kind: 'circle', size: 34, color: theme.accent, opacity: 0.7 },
  { id: 'skills-6', kind: 'star', size: 70, color: theme.accent, opacity: 0.3 },
  { id: 'skills-7', kind: 'square', size: 26, color: '#101010', opacity: 0.15 },
]

export function Skills({ active }: { active: boolean }) {
  return (
    <Panel
      id="panel-5"
      index="06"
      label="Skills"
      theme={theme}
      shapes={SHAPES}
    >
      <Reveal active={active}>
        <h2 className="text-4xl tracking-tight md:text-5xl" style={{ fontFamily: 'var(--font-black)' }}>
          Skills
        </h2>
      </Reveal>
      <div className="mt-8 space-y-8">
        {Object.entries(skills).map(([category, items], gi) => (
          <Reveal active={active} delay={150 + gi * 120} key={category}>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest opacity-60">{category}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border-2 border-black/15 px-4 py-1.5 text-sm transition-colors hover:border-black hover:bg-black hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Panel>
  )
}
