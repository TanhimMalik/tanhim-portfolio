import { useEffect, useRef, useState, type PointerEvent, type PropsWithChildren } from 'react'
import { ArrowUpRight, GithubLogo, LockSimple, Play } from '@phosphor-icons/react'
import { profile, projects, thisSite, type Project } from '../data'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { buttonPrimary, buttonSecondary, chip, container, eyebrow, nudgeUpRight, textLink, underline } from './ui'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

export function Work() {
  const featured = projects.filter((project) => project.highlights)
  const others = projects.filter((project) => !project.highlights)

  return (
    <section id="work" className="py-20 sm:py-24">
      <div className={container}>
        <SectionHeading label="Selected work" title="Things I've built." />

        <div className="mt-12 space-y-6">
          {featured.map((project, i) => (
            <Reveal key={project.name}>
              <FeatureCard project={project} flip={i % 2 === 1} />
            </Reveal>
          ))}

          <div className="grid gap-6 lg:grid-cols-3">
            {others.map((project) => (
              <Reveal key={project.name} className="lg:col-span-2">
                <ProjectCard project={project} />
              </Reveal>
            ))}

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
        </div>
      </div>
    </section>
  )
}

// A main project: screenshot and summary side by side, with the engineering
// details in a strip underneath. Alternate cards put the screenshot on the right.
function FeatureCard({ project, flip }: { project: Project; flip: boolean }) {
  const highlights = project.highlights ?? []

  return (
    <article className="spotlight group overflow-clip rounded-[2rem] border border-line bg-surface">
      <div className="grid lg:grid-cols-12">
        <div
          className={`flex flex-col justify-end overflow-clip border-b border-line bg-sunken px-5 pt-5 sm:px-8 sm:pt-8 lg:col-span-7 lg:border-b-0 lg:pt-12 ${flip ? 'lg:order-2 lg:border-l' : 'lg:border-r'}`}
        >
          <Tilt>
            <Screenshot
              project={project}
              sizes="(min-width: 1152px) 570px, (min-width: 1024px) calc(58vw - 100px), (min-width: 640px) calc(100vw - 128px), calc(100vw - 80px)"
            />
          </Tilt>
        </div>
        <div className="flex flex-col p-6 sm:p-8 lg:col-span-5">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-3xl font-bold tracking-tight">{project.name}</h3>
            {project.status && <StatusBadge status={project.status} />}
          </div>
          <p className="mt-3 text-[17px] leading-relaxed text-muted">{project.description}</p>
          <StackChips stack={project.stack} />
          <ProjectLinks project={project} />
        </div>
      </div>

      <div className="border-t border-line px-6 py-6 sm:px-8 sm:py-8">
        <h4 className={`${eyebrow} text-muted`}>Under the hood</h4>
        <ul className={`mt-5 grid gap-x-10 gap-y-7 sm:grid-cols-2 ${highlights.length % 3 === 0 ? 'lg:grid-cols-3' : ''}`}>
          {highlights.map((item, i) => (
            <li key={item.title}>
              <p className="font-mono text-xs text-accent-ink">{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-2 font-semibold tracking-tight">{item.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="spotlight group flex h-full flex-col overflow-clip rounded-[2rem] border border-line bg-surface">
      <div className="overflow-clip border-b border-line bg-sunken px-5 pt-5 sm:px-8 sm:pt-8">
        <div className="transition duration-500 ease-out group-hover:-translate-y-1">
          <Screenshot
            project={project}
            sizes="(min-width: 1024px) 655px, (min-width: 640px) calc(100vw - 128px), calc(100vw - 80px)"
            className="aspect-[1600/756] object-cover object-top"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-bold tracking-tight">{project.name}</h3>
          {project.status && <StatusBadge status={project.status} />}
        </div>
        <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
        <StackChips stack={project.stack} />
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-ink">
      {status}
    </span>
  )
}

// The screenshot, plus a short screen recording that plays over it while the card
// is hovered or focused. Touch and reduced-motion visitors only get the screenshot.
function Screenshot({ project, sizes, className = '' }: { project: Project; sizes: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [canPlay] = useState(() => Boolean(project.clip) && finePointer.matches && !reduceMotion.matches)
  const [playing, setPlaying] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const card = ref.current?.closest('article')
    if (!canPlay || !video || !card) return

    // Start buffering once the card is close to the viewport, so a hover plays straight away.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        video.preload = 'auto'
        observer.disconnect()
      },
      { rootMargin: '300px 0px' },
    )
    observer.observe(card)

    let rewind = 0
    const start = () => {
      clearTimeout(rewind)
      setActive(true)
      video.play().catch(() => setActive(false))
    }
    const stop = (e: Event) => {
      if (e instanceof FocusEvent && card.contains(e.relatedTarget as Node)) return
      setActive(false)
      video.pause()
      // Rewind after the fade so the next hover starts from the poster frame.
      rewind = window.setTimeout(() => {
        video.currentTime = 0
      }, 400)
    }

    card.addEventListener('pointerenter', start)
    card.addEventListener('pointerleave', stop)
    card.addEventListener('focusin', start)
    card.addEventListener('focusout', stop)
    return () => {
      observer.disconnect()
      clearTimeout(rewind)
      card.removeEventListener('pointerenter', start)
      card.removeEventListener('pointerleave', stop)
      card.removeEventListener('focusin', start)
      card.removeEventListener('focusout', stop)
    }
  }, [canPlay])

  const frame = `w-full rounded-t-xl shadow-[0_20px_50px_-20px_rgba(22,20,15,0.35)] ring-1 ring-ink/10 ${className}`
  const showing = active && playing

  return (
    <div ref={ref} className="relative">
      <img
        src={project.screenshot}
        srcSet={`${project.screenshotSmall} 800w, ${project.screenshot} 1600w`}
        sizes={sizes}
        width={1600}
        height={project.height}
        loading="lazy"
        decoding="async"
        alt={project.alt}
        className={frame}
      />
      {canPlay && (
        <>
          <video
            ref={videoRef}
            src={project.clip}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            onPlaying={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className={`absolute inset-0 h-full object-cover object-top transition-opacity duration-300 ${frame} ${showing ? 'opacity-100' : 'opacity-0'}`}
          />
          <span
            aria-hidden
            className={`pointer-events-none absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-night/75 px-2.5 py-1 text-xs font-semibold text-night-ink ring-1 ring-white/10 backdrop-blur transition-opacity duration-300 ${showing ? 'opacity-0' : 'opacity-100'}`}
          >
            <Play weight="fill" className="size-3" />
            Hover to play
          </span>
        </>
      )}
    </div>
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
