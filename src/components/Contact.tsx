import { useState } from 'react'
import { ArrowUp, Check, Copy, DownloadSimple, EnvelopeSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { profile } from '../data'
import { Reveal } from './Reveal'
import { buttonPrimary, buttonSecondary, container, eyebrow } from './ui'

const linkClass = 'inline-flex items-center gap-2 text-ink transition-colors hover:text-accent-ink'

const copyLabels = { idle: 'Copy email', copied: 'Copied', failed: "Couldn't copy" }

export function Contact() {
  const [copyState, setCopyState] = useState<keyof typeof copyLabels>('idle')

  const copyEmail = () => {
    const show = (state: keyof typeof copyLabels) => {
      setCopyState(state)
      window.setTimeout(() => setCopyState('idle'), 2000)
    }
    navigator.clipboard.writeText(profile.email).then(
      () => show('copied'),
      () => show('failed'),
    )
  }

  return (
    <footer id="contact" className="pt-12 pb-10 sm:pt-16">
      <div className={container}>
        <Reveal>
          <div className="relative isolate overflow-clip rounded-[2rem] border border-line bg-surface px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -right-24 -bottom-48 size-[30rem] rounded-full bg-[#ffb28a] opacity-40 blur-[110px]" />
              <div className="absolute -bottom-48 left-1/4 size-[24rem] rounded-full bg-[#a9c1ea] opacity-25 blur-[110px]" />
            </div>

            <p className={`${eyebrow} text-accent-ink`}>Contact</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] font-bold tracking-[-0.045em]">
              Let's talk. <span className="block text-faint">Whether it's a role, a project or a question.</span>
            </h2>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className={buttonPrimary}>
                <EnvelopeSimple weight="bold" className="size-4" aria-hidden />
                {profile.email}
              </a>
              <button type="button" onClick={copyEmail} className={buttonSecondary}>
                {copyState === 'copied' ? (
                  <Check weight="bold" className="size-4 text-accent-ink" aria-hidden />
                ) : (
                  <Copy weight="bold" className="size-4" aria-hidden />
                )}
                <span aria-live="polite">{copyLabels[copyState]}</span>
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
              <a href={profile.github} target="_blank" rel="noreferrer" className={linkClass}>
                <GithubLogo weight="fill" className="size-4" aria-hidden />
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
                <LinkedinLogo weight="fill" className="size-4" aria-hidden />
                LinkedIn
              </a>
              <a href={profile.resume} download className={linkClass}>
                <DownloadSimple weight="bold" className="size-4" aria-hidden />
                Resume
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-col-reverse gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-ink">
            Back to top
            <ArrowUp weight="bold" className="size-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  )
}
