import { ArrowRight, DownloadSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { profile } from '../data'
import { Reveal } from './Reveal'
import { buttonPrimary, buttonSecondary, container, eyebrow } from './ui'

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(22,20,15,0.09)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-32 right-[-8%] size-[34rem] rounded-full bg-[#ffb28a] opacity-45 blur-[110px]" />
        <div className="absolute top-24 left-[-12%] size-[28rem] rounded-full bg-[#a9c1ea] opacity-30 blur-[110px]" />
      </div>

      <div className={container}>
        <Reveal>
          <a
            href="#soldra"
            className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 py-1.5 pr-3.5 pl-3 text-sm text-muted shadow-sm backdrop-blur transition hover:border-ink/20 hover:text-ink"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
            </span>
            Currently building <span className="font-semibold text-ink">Soldra</span>
            <ArrowRight weight="bold" className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </a>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-8 max-w-5xl text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.95] font-bold tracking-[-0.045em]">
            Hi, I'm {profile.firstName}.{' '}
            <span className="block text-faint">I build software that gets out of the way.</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            I'm a software engineer who has built developer tooling at Tripadvisor and trading-desk apps at Jefferies.
            Right now I'm building Soldra, a profit and tax tracker for online resellers.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={profile.resume} download className={buttonPrimary}>
              <DownloadSimple weight="bold" className="size-4" aria-hidden />
              Download resume
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className={buttonSecondary}>
              <GithubLogo weight="fill" className="size-4" aria-hidden />
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={buttonSecondary}>
              <LinkedinLogo weight="fill" className="size-4" aria-hidden />
              LinkedIn
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className={`${eyebrow} text-muted`}>Previously at</span>
            <span className="font-display text-2xl font-bold tracking-tight text-ink-soft">Tripadvisor</span>
            <span className="font-display text-2xl font-bold tracking-tight text-ink-soft">Jefferies</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
