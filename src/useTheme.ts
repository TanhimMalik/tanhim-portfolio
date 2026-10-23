import { useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'

const toolbarColors = { light: '#f7f4ee', dark: '#151412' }

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', dark ? toolbarColors.dark : toolbarColors.light)
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  } catch {
    // storage is blocked in some private browsing modes; the switch still applies for this visit
  }
}

export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggle = (e?: MouseEvent<HTMLElement>) => {
    const next = !dark
    const swap = () => {
      applyTheme(next)
      flushSync(() => setDark(next))
    }

    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      swap()
      return
    }

    // Grow the new theme out of the click point (or the button's centre for keyboard presses).
    let x = innerWidth / 2
    let y = 0
    if (e && e.detail > 0) {
      x = e.clientX
      y = e.clientY
    } else if (e) {
      const rect = e.currentTarget.getBoundingClientRect()
      x = rect.left + rect.width / 2
      y = rect.top + rect.height / 2
    }
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    document.startViewTransition(swap).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  return { dark, toggle }
}
