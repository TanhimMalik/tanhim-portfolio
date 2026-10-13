import { useRef, type PointerEvent, type PropsWithChildren } from 'react'
import { ArrowUpRight, GithubLogo, LockSimple } from '@phosphor-icons/react'
import { profile, projects, thisSite, type Project } from '../data'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { buttonPrimary, buttonSecondary, chip, container, eyebrow, nudgeUpRight, textLink, underline } from './ui'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

export function Work() {
  const [featured, ...rest] = projects

  return (
    <section id="work" className="py-24 sm:py-32">
      <div className={container}>
        <SectionHeading label="Selected work" title="Things I've built." />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <article className="spotlight group flex h-full flex-col overflow-clip rounded-[2rem] border border-line bg-surface">
              <div className="overflow-clip border-b border-line bg-sunken px-5 pt-5 sm:px-8 sm:pt-8">
                <Tilt>
                  <Screenshot
                    project={featured}
                    sizes="(min-width: 1024px) 655px, (min-width: 640px) calc(100vw - 128px), calc(100vw - 80px)"
                  />
                </Tilt>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="text-3xl font-bold tracking-tight">{featured.name}</h3>
                <p className="mt-3 text-lg leading-relaxed text-muted">{featured.description}</p>
                <StackChips stack={featured.stack} />
                <ProjectLinks project={featured} />
              </div>
            </article>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={80} className="flex-1">
              <article className="spotlight flex h-full flex-col rounded-[2rem] border border-line bg-surface p-6 sm:p-8">
                <p className={`${eyebrow} text-muted`}>Meta</p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">{thisSite.name}</h3>
                <p className="mt-3 leading-relaxed text-muted">{thisSite.description}</p>
                <a
                  href={thisSite.source}
                  target="_blank"
                  rel="noreferrer"
                  className={`${textLink} mt-auto self-start pt-6 text-sm font-semibold`}
                >
                  <GithubLogo weight="fill" className="size-4" aria-hidden />
                  <span className={underline}>View source</span>
                  <ArrowUpRight weight="bold" className={`size-3.5 ${nudgeUpRight}`} aria-hidden />
                </a>
              </article>
            </Reveal>

            <Reveal delay={160} className="flex-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="group relative flex h-full min-h-56 flex-col justify-between overflow-clip rounded-[2rem] bg-accent p-6 text-on-accent transition hover:brightness-105 sm:p-8"
              >
                <GithubLogo weight="fill" className="size-9" aria-hidden />
                <ArrowUpRight
                  weight="bold"
                  className="absolute top-6 right-6 size-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:top-8 sm:right-8"
                  aria-hidden
                />
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">More on GitHub</h3>
                  <p className="mt-2 text-on-accent/85">Everything else I've been working on.</p>
                </div>
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.name} delay={i * 80} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="spotlight group flex h-full flex-col overflow-clip rounded-[2rem] border border-line bg-surface">
      <div className="overflow-clip border-b border-line bg-sunken px-5 pt-5 sm:px-7 sm:pt-7">
        <Screenshot
          project={project}
          sizes="(min-width: 1152px) 485px, (min-width: 768px) calc(50vw - 92px), calc(100vw - 80px)"
          className="aspect-[1600/756] object-cover object-top transition duration-500 ease-out group-hover:-translate-y-1"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-bold tracking-tight">{project.name}</h3>
          {project.status && (
            <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-ink">
              {project.status}
            </span>
          )}
        </div>
        <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
        <StackChips stack={project.stack} />
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}

function Screenshot({ project, sizes, className = '' }: { project: Project; sizes: string; className?: string }) {
  return (
    <img
      src={project.screenshot}
      srcSet={`${project.screenshotSmall} 800w, ${project.screenshot} 1600w`}
      sizes={sizes}
      width={1600}
      height={project.height}
      loading="lazy"
      decoding="async"
      alt={project.alt}
      className={`w-full rounded-t-xl shadow-[0_20px_50px_-20px_rgba(22,20,15,0.35)] ring-1 ring-ink/10 ${className}`}
    />
  )
}

function StackChips({ stack }: { stack: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Built with">
      {stack.map((tech) => (
        <li key={tech} className={chip}>
          {tech}
        </li>
      ))}
    </ul>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.live && !project.source) {
    return (
      <p className="mt-auto flex items-center gap-2 pt-7 text-sm text-muted">
        <LockSimple weight="bold" className="size-4 shrink-0" aria-hidden />
        {project.note}
      </p>
    )
  }

  return (
    <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer" className={buttonPrimary}>
          {project.liveLabel ?? 'Live demo'}
          <ArrowUpRight weight="bold" className={`size-4 ${nudgeUpRight}`} aria-hidden />
        </a>
      )}
      {project.source && (
        <a href={project.source} target="_blank" rel="noreferrer" className={buttonSecondary}>
          <GithubLogo weight="fill" className="size-4" aria-hidden />
          {project.sourceLabel ?? 'Source'}
        </a>
      )}
      {project.note && <span className="text-sm text-muted">{project.note}</span>}
    </div>
  )
}

function Tilt({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse' || reduceMotion.matches) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1200px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-4px)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="transition-transform duration-300 ease-out">
      {children}
    </div>
  )
}
