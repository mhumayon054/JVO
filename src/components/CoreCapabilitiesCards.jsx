import { useCallback, useEffect, useId, useState } from 'react'

const CAPABILITY_CARDS = [
  {
    title: 'Product Development',
    points: ['Web Apps', 'Cloud Systems', 'AI Products'],
    detail:
      'We embed with your team to ship production-grade products (APIs, dashboards, and AI surfaces) with clear ownership and a steady release cadence.',
    extraPoints: ['Design systems', 'Production observability'],
  },
  {
    title: 'Dedicated Teams',
    points: ['Embedded Engineers', 'Project Squads', 'Tech Leadership'],
    detail:
      'Augment your org with senior engineers and leads who own outcomes, not tickets. Squads align to your stack, rituals, and delivery bar.',
    extraPoints: ['Fractional tech leadership', 'Timezone-friendly overlap'],
  },
  {
    title: 'MVP Launch',
    points: ['Rapid Builds', 'Validated Scope', 'Production Ready'],
    detail:
      'From zero to validated product in weeks: tight scope, opinionated architecture, and a path to scale once you find traction.',
    extraPoints: ['User-ready quality', 'Handoff documentation'],
  },
]

function usePrefersHover() {
  const [prefersHover, setPrefersHover] = useState(true)

  useEffect(() => {
    const mqHover = window.matchMedia('(hover: hover)')
    const mqFine = window.matchMedia('(pointer: fine)')
    const mqCoarse = window.matchMedia('(pointer: coarse)')
    const apply = () => setPrefersHover(mqHover.matches && mqFine.matches && !mqCoarse.matches)
    apply()
    mqHover.addEventListener('change', apply)
    mqFine.addEventListener('change', apply)
    mqCoarse.addEventListener('change', apply)
    return () => {
      mqHover.removeEventListener('change', apply)
      mqFine.removeEventListener('change', apply)
      mqCoarse.removeEventListener('change', apply)
    }
  }, [])

  return prefersHover
}

export function CoreCapabilitiesCards() {
  const prefersHover = usePrefersHover()
  const [hoveredTitle, setHoveredTitle] = useState(null)
  const [expandedTitle, setExpandedTitle] = useState(null)
  const sectionId = useId()

  const isExpanded = useCallback(
    (title) => {
      if (prefersHover) return hoveredTitle === title
      return expandedTitle === title
    },
    [prefersHover, hoveredTitle, expandedTitle],
  )

  const onCardClick = useCallback(
    (title) => {
      if (prefersHover) return
      setExpandedTitle((prev) => (prev === title ? null : title))
    },
    [prefersHover],
  )

  const onKeyDown = useCallback(
    (e, title) => {
      if (prefersHover) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onCardClick(title)
      }
    },
    [prefersHover, onCardClick],
  )

  const easePremium = 'ease-[cubic-bezier(0.22,1,0.36,1)]'

  return (
    <section className="py-16">
      <h2 className="text-center text-[48px] font-bold tracking-[-0.025em] max-md:text-[32px]">Core Capabilities</h2>
      <div className="mt-10 grid grid-cols-1 gap-6 overflow-visible md:grid-cols-2 lg:grid-cols-3 lg:items-start">
        {CAPABILITY_CARDS.map((card, index) => {
          const expanded = isExpanded(card.title)
          const dimmed = prefersHover && hoveredTitle !== null && hoveredTitle !== card.title
          const panelId = `${sectionId}-panel-${index}`

          return (
            <article
              key={card.title}
              className={[
                'relative rounded-2xl border border-[rgba(72,72,72,0.15)] bg-[rgba(72,72,72,0.2)] p-8',
                expanded ? 'will-change-transform' : '',
                `transition-[transform,box-shadow,opacity] duration-[340ms] ${easePremium}`,
                expanded
                  ? 'z-20 delay-[50ms] scale-[1.04] -translate-y-[12px] shadow-[0_32px_64px_-18px_rgba(0,0,0,0.5)]'
                  : 'z-0 delay-0 scale-100 translate-y-0 shadow-none',
                dimmed ? 'opacity-60' : 'opacity-100',
                !prefersHover ? 'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#7459F7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E0E]' : '',
              ].join(' ')}
              onMouseEnter={prefersHover ? () => setHoveredTitle(card.title) : undefined}
              onMouseLeave={prefersHover ? () => setHoveredTitle(null) : undefined}
              onClick={!prefersHover ? () => onCardClick(card.title) : undefined}
              onKeyDown={!prefersHover ? (e) => onKeyDown(e, card.title) : undefined}
              tabIndex={!prefersHover ? 0 : undefined}
              role={!prefersHover ? 'button' : undefined}
              aria-expanded={!prefersHover ? expanded : undefined}
              aria-controls={panelId}
            >
              <div className="h-8 w-8 rounded bg-[#7459F7]" />
              <h3 className="mt-6 text-[24px] font-bold">{card.title}</h3>
              <ul className="mt-6 space-y-2 text-[14px] text-[#ABABAB]">
                {card.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#AFA2FF]" />
                    {point}
                  </li>
                ))}
              </ul>

              <div
                id={panelId}
                className={[
                  'overflow-hidden',
                  `transition-[max-height,margin-top] duration-[500ms] ${easePremium}`,
                  expanded ? 'mt-6 max-h-[520px] delay-[50ms]' : 'mt-0 max-h-0 delay-[120ms]',
                ].join(' ')}
                aria-hidden={!expanded}
              >
                <div
                  className={[
                    `transition-[opacity,transform] ${easePremium}`,
                    expanded
                      ? 'translate-y-0 opacity-100 delay-[160ms] duration-[300ms]'
                      : 'translate-y-2 opacity-0 delay-0 duration-[280ms]',
                  ].join(' ')}
                >
                  <p className="text-[14px] leading-[1.5] text-[#ABABAB]">{card.detail}</p>
                  <ul className="mt-4 space-y-2 text-[14px] text-[#ABABAB]">
                    {card.extraPoints.map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#AFA2FF]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
