import type { CSSProperties, PropsWithChildren } from 'react'

type RevealProps = PropsWithChildren<{
  active: boolean
  delay?: number
  className?: string
}>

export function Reveal({ active, delay = 0, className = '', children }: RevealProps) {
  return (
    <div
      className={`reveal ${active ? 'is-active' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
