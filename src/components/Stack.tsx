import { stack } from '../data'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { container, eyebrow } from './ui'

// One row per category: the label on the left and its tools as logo chips that wrap.
export function Stack() {
  return (
    <section id="stack" className="py-20 sm:py-24">
      <div className={container}>
        <SectionHeading label="Stack" title="Tools I reach for." />

        <div className="spotlight-group mt-12 divide-y divide-line border-y border-line">
          {stack.map((group) => (
            <Reveal key={group.group} className="grid gap-4 py-6 lg:grid-cols-12 lg:gap-8 lg:py-7">
              <h3 className={`${eyebrow} text-muted lg:col-span-3 lg:pt-3`}>{group.group}</h3>
              <ul className="flex flex-wrap gap-2.5 lg:col-span-9">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="spotlight group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-4 pl-1.5"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-canvas transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110 dark:bg-night-ink">
                      <img src={item.logo} alt="" width={18} height={18} className="size-[18px]" loading="lazy" />
                    </span>
                    <span className="text-sm font-semibold">{item.name}</span>
                    {item.note && <span className="hidden text-xs text-muted sm:inline">{item.note}</span>}
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
