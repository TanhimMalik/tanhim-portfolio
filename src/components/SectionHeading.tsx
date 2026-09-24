import { Reveal } from './Reveal'
import { eyebrow } from './ui'

type SectionHeadingProps = {
  label: string
  title: string
  aside?: string
}

export function SectionHeading({ label, title, aside }: SectionHeadingProps) {
  return (
    <Reveal>
      <p className={`${eyebrow} text-accent-ink`}>{label}</p>
      <h2 className="mt-4 max-w-4xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1] font-bold tracking-[-0.04em]">
        {title} {aside && <span className="text-faint">{aside}</span>}
      </h2>
    </Reveal>
  )
}
