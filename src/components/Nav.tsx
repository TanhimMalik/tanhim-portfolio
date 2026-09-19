import { profile } from '../data'
import type { PanelTheme } from '../data'

type NavItem = {
  label: string
  index: number
  subItems?: { label: string; index: number }[]
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Intro', index: 0 },
  { label: 'About', index: 1 },
  {
    label: 'Experience',
    index: 2,
    subItems: [
      { label: 'Tripadvisor', index: 2 },
      { label: 'Jefferies', index: 3 },
    ],
  },
  { label: 'Projects', index: 4 },
  { label: 'Skills', index: 5 },
  { label: 'Contact', index: 6 },
]

const SECTION_NAMES = ['Intro', 'About', 'Tripadvisor', 'Jefferies', 'Projects', 'Skills', 'Contact']

export function Nav({
  activeIndex,
  onNavigate,
  theme,
  isScrolling,
}: {
  activeIndex: number
  onNavigate: (index: number) => void
  theme: PanelTheme
  isScrolling: boolean
}) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-10">
      <button
        onClick={() => onNavigate(0)}
        className="pointer-events-auto rounded-full px-4 py-2 font-mono text-sm font-medium tracking-tight backdrop-blur-sm transition-colors duration-500"
        style={{ backgroundColor: theme.soft, color: theme.fg }}
      >
        {profile.name}
      </button>
      <nav
        className="group/all pointer-events-auto hidden items-center gap-1 rounded-full px-3 py-2 backdrop-blur-sm transition-colors duration-500 md:flex"
        style={{ backgroundColor: theme.soft }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = item.subItems
            ? item.subItems.some((s) => s.index === activeIndex)
            : item.index === activeIndex
          const liveLabel = isActive ? SECTION_NAMES[activeIndex] : item.label

          return (
            <div key={item.label} className="group/item relative">
              <button
                onClick={() => onNavigate(item.index)}
                className="flex items-center px-2 py-1"
                aria-label={`Go to ${item.label}`}
              >
                <span
                  className="h-1.5 shrink-0 rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? '1.4rem' : '0.375rem',
                    backgroundColor: isActive ? theme.accent : theme.fg,
                    opacity: isActive ? 1 : 0.35,
                  }}
                />
                <span
                  className="max-w-0 overflow-hidden whitespace-nowrap font-mono text-xs opacity-0 transition-all duration-300 group-hover/all:max-w-[120px] group-hover/all:pl-2 group-hover/all:opacity-100"
                  style={{
                    color: isActive ? theme.accent : theme.fg,
                    maxWidth: isScrolling && isActive ? '120px' : undefined,
                    paddingLeft: isScrolling && isActive ? '0.5rem' : undefined,
                    opacity: isScrolling && isActive ? 1 : undefined,
                  }}
                >
                  {isScrolling && isActive ? liveLabel : item.label}
                </span>
              </button>

              {item.subItems && (
                <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover/item:pointer-events-auto group-hover/item:opacity-100">
                  <div className="rounded-2xl p-1.5 backdrop-blur-sm" style={{ backgroundColor: theme.soft }}>
                    <div className="flex flex-col gap-0.5">
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => onNavigate(sub.index)}
                          className="whitespace-nowrap rounded-xl px-3 py-1.5 text-left font-mono text-xs transition-colors"
                          style={{ color: sub.index === activeIndex ? theme.accent : theme.fg }}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </header>
  )
}
