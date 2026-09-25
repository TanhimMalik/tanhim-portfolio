import { stack } from '../data'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { container, eyebrow } from './ui'

export function Stack() {
  return (
    <section id="stack" className="py-24 sm:py-32">
      <div className={container}>
        <SectionHeading label="Stack" title="Tools I reach for." />

        <div className="mt-14 space-y-10">
          {stack.map((group) => (
            <Reveal key={group.group}>
              <h3 className={`${eyebrow} text-muted`}>{group.group}</h3>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 pr-4 transition duration-200 hover:-translate-y-0.5 hover:border-ink/15"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-canvas dark:bg-night-ink">
                      <img src={item.logo} alt="" width={24} height={24} className="size-6" loading="lazy" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{item.name}</span>
                      {item.note && <span className="block text-xs leading-snug text-muted">{item.note}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
