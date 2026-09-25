import { useState } from 'react'

const toolbarColors = { light: '#f7f4ee', dark: '#151412' }

export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggle = () => {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next ? toolbarColors.dark : toolbarColors.light)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      // storage is blocked in some private browsing modes; the switch still applies for this visit
    }
    setDark(next)
  }

  return { dark, toggle }
}
