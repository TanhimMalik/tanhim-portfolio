import type { PanelTheme } from '../data'

export function NextButton({
  activeIndex,
  panelCount,
  theme,
  onClick,
}: {
  activeIndex: number
  panelCount: number
  theme: PanelTheme
  onClick: () => void
}) {
  const isLast = activeIndex === panelCount - 1

  return (
    <button
      onClick={onClick}
      disabled={isLast}
      aria-label="Go to next section"
      className="fixed bottom-8 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full border-2 text-xl transition-transform hover:scale-110 disabled:opacity-0 md:right-10 md:flex"
      style={{ borderColor: theme.fg, color: theme.fg }}
    >
      ↓
    </button>
  )
}
