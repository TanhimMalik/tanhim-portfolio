// Feeds the cursor position into .spotlight cards as --mx/--my. Inside a
// .spotlight-group every card gets it, so neighbouring borders light up too.
export function initSpotlight() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let pending: PointerEvent | null = null

  const update = () => {
    const e = pending
    pending = null
    if (!e || !(e.target instanceof Element)) return
    const scope = e.target.closest('.spotlight-group') ?? e.target.closest('.spotlight')
    if (!scope) return
    const cards = scope.matches('.spotlight') ? [scope] : scope.querySelectorAll('.spotlight')
    for (const card of cards) {
      const rect = card.getBoundingClientRect()
      const el = card as HTMLElement
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      el.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }
  }

  document.addEventListener(
    'pointermove',
    (e) => {
      if (!pending) requestAnimationFrame(update)
      pending = e
    },
    { passive: true },
  )
}
