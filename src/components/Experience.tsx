import { education, experience } from '../data'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { chip, container, eyebrow } from './ui'

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className={container}>
        <SectionHeading label="Experience" title="Where I've worked." aside="Real teams, real users." />

        <ol className="mt-14 border-t border-line">
          {experience.map((job) => (
            <li key={job.company} className="border-b border-line">
              <Reveal>
                <article className="grid gap-6 py-10 sm:py-12 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">{job.company}</h3>
                    <p className="mt-2 font-medium text-ink-soft">{job.role}</p>
                    <p className={`${eyebrow} mt-4 text-muted`}>{job.period}</p>
                    <p className="mt-1 text-sm text-muted">{job.location}</p>
                  </div>
                  <div className="lg:col-span-8">
                    <ul className="space-y-4">
                      {job.points.map((point) => (
                        <li key={point} className="flex gap-4 text-[17px] leading-relaxed text-ink-soft">
                          <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech used">
                      {job.stack.map((tech) => (
                        <li key={tech} className={chip}>
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-16">
          <h3 className={`${eyebrow} text-muted`}>Education</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {education.map((item) => (
              <li key={item.school} className="rounded-3xl border border-line bg-surface p-6 sm:p-7">
                <p className="font-display text-xl font-bold tracking-tight">{item.school}</p>
                <p className="mt-1 text-ink-soft">{item.credential}</p>
                <p className={`${eyebrow} mt-5 text-muted`}>{item.period}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
