import { impact } from '../data'
import { Reveal } from './Reveal'
import { container, eyebrow } from './ui'

export function Impact() {
  return (
    <section aria-label="Impact" className="pb-24 sm:pb-32">
      <ul className={`${container} grid gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
        {impact.map((item, i) => (
          <li key={item.label}>
            <Reveal delay={i * 70} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-line bg-surface p-6 sm:p-7">
                <p className={`${eyebrow} text-muted`}>{item.where}</p>
                <p className="mt-8 font-display text-6xl leading-none font-bold tracking-[-0.05em]">
                  {item.qualifier && (
                    <span className="mr-2 align-[0.35em] font-sans text-base font-medium tracking-normal text-muted">
                      {item.qualifier}
                    </span>
                  )}
                  {item.value}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{item.label}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
