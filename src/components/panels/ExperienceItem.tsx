import { Panel } from '../Panel'
import { Reveal } from '../Reveal'
import type { PhysicsShapeSpec } from '../Shapes'
import type { experience, PanelTheme } from '../../data'

type Job = (typeof experience)[number]

export function ExperienceItem({
  id,
  index,
  job,
  theme,
  shapes,
  active,
}: {
  id: string
  index: string
  job: Job
  theme: PanelTheme
  shapes?: PhysicsShapeSpec[]
  active: boolean
}) {
  return (
    <Panel id={id} index={index} label="Experience" theme={theme} shapes={shapes}>
      <Reveal active={active}>
        <h2 className="text-4xl tracking-tight md:text-5xl" style={{ fontFamily: 'var(--font-black)' }}>
          {job.role}
        </h2>
      </Reveal>
      <Reveal active={active} delay={100}>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 font-mono text-sm opacity-70">
          <span className="font-bold" style={{ color: theme.accent }}>
            {job.company}
          </span>
          <span>{job.location}</span>
          <span>{job.period}</span>
        </div>
      </Reveal>
      <ul className="mt-6 space-y-2 text-sm opacity-85 md:text-base">
        {job.points.map((point, i) => (
          <Reveal active={active} delay={220 + i * 90} key={point}>
            <li className="flex gap-3 leading-snug">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: theme.accent }} />
              {point}
            </li>
          </Reveal>
        ))}
      </ul>
    </Panel>
  )
}
