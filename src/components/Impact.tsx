import { ArrowDown } from '@phosphor-icons/react'
import { impact } from '../data'
import { CountUp } from './CountUp'
import { Reveal } from './Reveal'
import { container, eyebrow } from './ui'

export function Impact() {
  return (
    <section aria-label="Impact" className="pb-20 sm:pb-24">
      <ul className={`${container} spotlight-group grid gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
        {impact.map((item, i) => (
          <li key={item.label}>
            <Reveal delay={i * 70} className="h-full">
              {/* Links to the Experience bullet this number comes from (see withMetrics). */}
              <a
                href={`#metric-${parseInt(item.value, 10)}`}
                className="spotlight group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 sm:p-7"
              >
                <span className="flex items-center justify-between">
                  <span className={`${eyebrow} text-muted`}>{item.where}</span>
                  <ArrowDown
                    weight="bold"
                    aria-hidden
                    className="size-4 text-faint transition duration-300 ease-out group-hover:translate-y-0.5 group-hover:text-accent-ink"
                  />
                </span>
                <p className="mt-8 font-display text-6xl leading-none font-bold tracking-[-0.05em]">
                  {item.qualifier && (
                    <span className="mr-2 align-[0.35em] font-sans text-base font-medium tracking-normal text-muted">
                      {item.qualifier}
                    </span>
                  )}
                  <CountUp value={item.value} />
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{item.label}</p>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
