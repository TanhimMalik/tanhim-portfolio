import { useEffect, useState } from 'react'
import { DownloadSimple, List, Moon, Sun, X } from '@phosphor-icons/react'
import { profile } from '../data'
import { useTheme } from '../useTheme'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const { dark, toggle } = useTheme()
  const ThemeIcon = dark ? Sun : Moon
  const themeLabel = dark ? 'Switch to light mode' : 'Switch to dark mode'

  useEffect(() => {
    const targets = ['#top', ...LINKS.map((link) => link.href)]
      .map((href) => document.querySelector(href))
      .filter((el): el is Element => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === 'top' ? '' : `#${entry.target.id}`)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-3xl items-center justify-between gap-2 rounded-full border border-line/80 bg-surface/75 p-1.5 pl-2 shadow-[0_12px_32px_-14px_rgba(22,20,15,0.22)] backdrop-blur-md"
      >
        <a href="#top" className="flex items-center gap-2.5 font-display text-[15px] font-bold tracking-tight whitespace-nowrap">
          <svg viewBox="0 0 64 64" aria-hidden className="size-8 shrink-0">
            <rect width="64" height="64" rx="16" className="fill-ink" />
            <path d="M14 15h28v8H32v26h-8V23H14z" className="fill-canvas" />
            <circle cx="46" cy="44.5" r="5" className="fill-accent" />
          </svg>
          {profile.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? 'location' : undefined}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active === link.href ? 'bg-sunken text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggle}
            aria-label={themeLabel}
            className="hidden size-10 cursor-pointer place-items-center rounded-full text-ink transition hover:bg-sunken md:grid"
          >
            <ThemeIcon weight="bold" className="size-5" aria-hidden />
          </button>
          <a
            href={profile.resume}
            download
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-canvas transition hover:bg-ink-soft"
          >
            Resume
            <DownloadSimple weight="bold" className="size-4" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-10 cursor-pointer place-items-center rounded-full text-ink transition hover:bg-sunken md:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <List className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="mx-auto mt-2 max-w-3xl rounded-3xl border border-line bg-surface p-2 shadow-xl md:hidden"
      >
        <ul>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-sunken"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-1 border-t border-line pt-1">
            <button
              type="button"
              onClick={toggle}
              aria-label={themeLabel}
              className="flex w-full cursor-pointer items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-sunken"
            >
              {dark ? 'Light mode' : 'Dark mode'}
              <ThemeIcon weight="bold" className="size-5" aria-hidden />
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
