import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react'
import { profile, projects, soldra, thisSite } from '../data'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { buttonPrimary, buttonSecondary, chip, container, eyebrow } from './ui'

export function Work() {
  return (
    <section id="work" className="py-24 sm:py-32">
      <div className={container}>
        <SectionHeading label="Selected work" title="Things I've built." aside="And the one I'm building now." />
        <Featured />
        <MoreProjects />
      </div>
    </section>
  )
}

function Featured() {
  return (
    <Reveal className="mt-14">
      <article id="soldra" className="relative isolate overflow-hidden rounded-[2rem] bg-night text-night-ink">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-48 -left-32 size-[38rem] rounded-full bg-[#6fa0c4] opacity-20 blur-[140px]" />
          <div className="absolute top-1/4 -right-40 size-[32rem] rounded-full bg-[#f0925c] opacity-15 blur-[140px]" />
        </div>

        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-14">
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <img src={soldra.logo} alt="" width={36} height={36} className="size-9" />
              <h3 className="text-3xl font-bold tracking-tight">{soldra.name}</h3>
              <span className="rounded-full border border-[#f0925c]/40 bg-[#f0925c]/10 px-3 py-1 text-xs font-semibold text-[#f6b48d]">
                {soldra.status}
              </span>
            </div>
            <p className="mt-5 font-display text-2xl leading-snug font-semibold tracking-tight">{soldra.tagline}</p>
            <p className="mt-5 leading-relaxed text-night-muted">{soldra.problem}</p>
            <p className="mt-4 leading-relaxed text-night-muted">{soldra.solution}</p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Built with">
              {soldra.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-night-line bg-night-raised px-3 py-1 text-xs font-medium text-night-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <img
              src={soldra.screenshot}
              width={1600}
              height={938}
              loading="lazy"
              decoding="async"
              alt="Soldra's dashboard: profit kept this year, total sold, the next quarterly tax date, and a sold-versus-kept chart for the last six months."
              className="w-full rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
            />
          </div>
        </div>

        <ul className="grid gap-px border-t border-night-line bg-night-line sm:grid-cols-2 lg:grid-cols-4">
          {soldra.details.map((detail) => (
            <li key={detail.title} className="bg-night p-6 sm:p-8">
              <h4 className="text-lg font-semibold tracking-tight">{detail.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-night-muted">{detail.body}</p>
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  )
}

function MoreProjects() {
  const [project] = projects

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-3">
      <Reveal className="lg:col-span-2">
        <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-surface">
          <div className="overflow-hidden border-b border-line bg-sunken px-5 pt-5 sm:px-8 sm:pt-8">
            <img
              src={project.screenshot}
              width={1600}
              height={756}
              loading="lazy"
              decoding="async"
              alt="Store Admin Dashboard overview: sales, users, products and conversion rate cards above a sales line chart and a category pie chart."
              className="w-full rounded-t-xl shadow-[0_20px_50px_-20px_rgba(22,20,15,0.35)] ring-1 ring-ink/10 transition duration-500 ease-out group-hover:-translate-y-1"
            />
          </div>
          <div className="flex flex-1 flex-col p-6 sm:p-8">
            <h3 className="text-2xl font-bold tracking-tight">{project.name}</h3>
            <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Built with">
              {project.stack.map((tech) => (
                <li key={tech} className={chip}>
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-3 pt-7">
              <a href={project.live} target="_blank" rel="noreferrer" className={buttonPrimary}>
                Live demo
                <ArrowUpRight weight="bold" className="size-4" aria-hidden />
              </a>
              <a href={project.source} target="_blank" rel="noreferrer" className={buttonSecondary}>
                <GithubLogo weight="fill" className="size-4" aria-hidden />
                Source
              </a>
            </div>
          </div>
        </article>
      </Reveal>

      <div className="flex flex-col gap-6">
        <Reveal delay={80} className="flex-1">
          <article className="flex h-full flex-col rounded-[2rem] border border-line bg-surface p-6 sm:p-8">
            <p className={`${eyebrow} text-muted`}>Meta</p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight">{thisSite.name}</h3>
            <p className="mt-3 leading-relaxed text-muted">{thisSite.description}</p>
            <a
              href={thisSite.source}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-ink transition-colors hover:text-accent-ink"
            >
              <GithubLogo weight="fill" className="size-4" aria-hidden />
              View source
              <ArrowUpRight weight="bold" className="size-3.5" aria-hidden />
            </a>
          </article>
        </Reveal>

        <Reveal delay={160} className="flex-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group relative flex h-full min-h-56 flex-col justify-between overflow-hidden rounded-[2rem] bg-accent p-6 text-ink transition hover:brightness-105 sm:p-8"
          >
            <GithubLogo weight="fill" className="size-9" aria-hidden />
            <ArrowUpRight
              weight="bold"
              className="absolute top-6 right-6 size-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:top-8 sm:right-8"
              aria-hidden
            />
            <div>
              <h3 className="text-2xl font-bold tracking-tight">More on GitHub</h3>
              <p className="mt-2 text-ink/85">Everything else I've been working on.</p>
            </div>
          </a>
        </Reveal>
      </div>
    </div>
  )
}
