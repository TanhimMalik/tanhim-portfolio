import { Panel } from '../Panel'
import { Reveal } from '../Reveal'
import type { PhysicsShapeSpec } from '../Shapes'
import { profile, panelThemes } from '../../data'

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'LinkedIn', value: 'in/tanhimmalik', href: profile.linkedin },
  { label: 'GitHub', value: 'TanhimMalik', href: profile.github },
]

const theme = panelThemes[6]

const SHAPES: PhysicsShapeSpec[] = [
  { id: 'contact-1', kind: 'circle', size: 180, color: theme.accent, opacity: 0.15 },
  { id: 'contact-2', kind: 'ring', size: 90, color: theme.accent, opacity: 0.5 },
  { id: 'contact-3', kind: 'circle', size: 40, color: theme.accent, opacity: 0.6 },
  { id: 'contact-4', kind: 'square', size: 46, color: theme.fg, opacity: 0.12 },
  { id: 'contact-5', kind: 'triangle', size: 55, color: theme.accent, opacity: 0.35 },
  { id: 'contact-6', kind: 'star', size: 60, color: theme.fg, opacity: 0.1 },
  { id: 'contact-7', kind: 'circle', size: 24, color: theme.accent, opacity: 0.8 },
]

export function Contact({ active }: { active: boolean }) {
  return (
    <Panel
      id="panel-6"
      index="07"
      label="Contact"
      theme={theme}
      shapes={SHAPES}
    >
      <Reveal active={active}>
        <h2 className="text-4xl tracking-tight md:text-5xl" style={{ fontFamily: 'var(--font-black)' }}>
          Let&apos;s talk
        </h2>
      </Reveal>
      <Reveal active={active} delay={120}>
        <p className="mt-6 max-w-lg text-lg opacity-70">
          I'm open to new opportunities and collaborations. Reach out any time.
        </p>
      </Reveal>
      <div className="mt-10 space-y-4">
        {links.map((link, i) => (
          <Reveal active={active} delay={240 + i * 100} key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border-b pb-3 text-lg"
              style={{ borderColor: 'rgba(255,255,255,0.15)' }}
            >
              <span className="font-mono text-xs uppercase tracking-widest opacity-50">{link.label}</span>
              <span className="transition-colors" style={{ color: theme.fg }}>
                <span className="group-hover:hidden">{link.value}</span>
                <span className="hidden group-hover:inline" style={{ color: theme.accent }}>
                  {link.value} ↗
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </Panel>
  )
}
