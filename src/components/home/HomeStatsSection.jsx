import { useEffect, useRef } from 'react'
import { animateCounter } from '../../utils/animateCounter'

const STATS = [
  { target: 50, prefix: '', suffix: '+', label: 'Startups Scaled' },
  { target: 500, prefix: '$', suffix: 'M+', label: 'Funding Raised' },
  { target: 100, prefix: '', suffix: '+', label: 'Projects Delivered' },
]

export function HomeStatsSection() {
  const sectionRef = useRef(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting || hasAnimatedRef.current) return

        hasAnimatedRef.current = true
        observer.disconnect()

        const nodes = section.querySelectorAll('[data-counter]')
        nodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return
          const raw = node.getAttribute('data-target')
          const target = raw != null ? Number(raw) : NaN
          if (Number.isNaN(target)) return

          const prefix = node.getAttribute('data-prefix') ?? ''
          const suffix = node.getAttribute('data-suffix') ?? ''

          animateCounter(node, target, {
            duration: 1800,
            prefix,
            suffix,
          })
        })
      },
      { threshold: 0.2, rootMargin: '0px' }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="mt-12 bg-[#131313] py-12 px-12"
      aria-label="Company statistics"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="text-[36px] font-bold leading-[1.11] text-[#AFA2FF]">
              <span
                className="counter tabular-nums"
                data-counter
                data-target={String(s.target)}
                data-prefix={s.prefix}
                data-suffix={s.suffix}
              >
                {`${s.prefix}0${s.suffix}`}
              </span>
            </p>
            <p className="mt-2 text-[14px] font-normal uppercase tracking-[0.1em] text-[#ABABAB]">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
