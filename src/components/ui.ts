export const container = 'mx-auto w-full max-w-6xl px-5 sm:px-8'

const buttonBase =
  'group/btn inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-200 ease-out active:scale-[0.98]'

export const buttonPrimary = `${buttonBase} bg-ink text-canvas hover:bg-ink-soft`
export const buttonSecondary = `${buttonBase} border border-line bg-surface text-ink hover:border-ink/25`

export const textLink = 'group/link inline-flex items-center gap-2 text-ink transition-colors hover:text-accent-ink'
export const underline =
  'bg-[image:linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-px transition-[background-size] duration-300 ease-out group-hover/link:bg-[length:100%_1px] group-focus-visible/link:bg-[length:100%_1px]'

const nudge = 'transition-transform duration-200 ease-out'
export const nudgeUpRight = `${nudge} group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5`
export const nudgeDown = `${nudge} group-hover/btn:translate-y-0.5 group-hover/link:translate-y-0.5`
export const nudgeUp = `${nudge} group-hover/link:-translate-y-0.5`

export const chip = 'rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted'
export const eyebrow = 'font-mono text-xs uppercase tracking-[0.18em]'
