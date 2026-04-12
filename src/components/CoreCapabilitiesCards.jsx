import { useCallback, useEffect, useId, useState } from 'react'
import proddev from '../assets/icons/proddev.svg'
import dediteam from '../assets/icons/dediteam.svg'
import mvplaunch from '../assets/icons/mvplaunch.svg'

const easePremium = 'ease-[cubic-bezier(0.22,1,0.36,1)]'

const CAPABILITY_CARDS = [
  {
    title: 'Product Development',
    icon: proddev,
    summary:
      'End-to-end engineering from ideation to production-grade deployments.',
    bullets: ['Web Apps', 'Cloud Systems', 'AI Products'],
    extra:
      'We embed with your stack and rituals: thin vertical slices, explicit contracts between services, and observability so incidents are rare and recoverable.',
    extraList: ['Design systems & component libraries', 'Performance budgets and load testing gates'],
  },
  {
    title: 'Dedicated Teams',
    icon: dediteam,
    summary:
      'Fractional or full-time elite engineering units embedded in your workflow.',
    bullets: ['Embedded Engineers', 'Project Squads', 'Tech Leadership'],
    extra:
      'Squads flex with your phase: ramp for a major release, steady-state for maintenance, or fractional leadership when you need senior judgment without headcount overhead.',
    extraList: ['Timezone-friendly overlap', 'Code review, pairing, and onboarding playbooks'],
  },
  {
    title: 'MVP Launch',
    icon: mvplaunch,
    summary:
      'Rapid 6-8 week development cycles to get your AI idea to market.',
    bullets: ['Rapid Builds', 'Validated Scope', 'Production Ready'],
    extra:
      'We prioritize the riskiest assumptions first, instrument early, and document the path to scale so your next raise or hire isn’t a rewrite.',
    extraList: ['Launch readiness & handoff docs', 'Post-launch hardening and iteration cadence'],
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

  return (
    <section className="py-16">
      <h2 className="text-center text-[48px] font-bold tracking-[-0.025em] max-md:text-[32px]">Core Capabilities</h2>
      <div className="mt-10 grid grid-cols-1 items-start gap-6 overflow-visible md:grid-cols-2 lg:grid-cols-3">
        {CAPABILITY_CARDS.map((card, index) => {
          const expanded = isExpanded(card.title)
          const dimmed = prefersHover && hoveredTitle !== null && hoveredTitle !== card.title
          const panelId = `${sectionId}-panel-${index}`

          return (
            <article
              key={card.title}
              className={[
                'relative flex w-full max-w-full flex-col self-start rounded-2xl border border-[rgba(72,72,72,0.15)] bg-[rgba(72,72,72,0.2)] p-8',
                `transition-[box-shadow,opacity,border-color] duration-[400ms] ${easePremium}`,
                expanded
                  ? 'z-20 border-[rgba(116,89,247,0.22)] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.55)]'
                  : 'z-0 border-[rgba(72,72,72,0.15)] shadow-none',
                dimmed ? 'opacity-55' : 'opacity-100',
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
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#7459F7]">
                <img src={card.icon} alt="" className="h-5 w-5 object-contain" aria-hidden />
              </div>
              <h3 className="mt-6 text-[24px] font-bold">{card.title}</h3>
              <p className="mt-4 text-[14px] leading-[1.5] text-[#ABABAB]">{card.summary}</p>
              <ul className="mt-6 space-y-2 text-[14px] text-[#ABABAB]">
                {card.bullets.map((point) => (
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
                  `transition-[max-height] duration-[500ms] ${easePremium}`,
                  expanded ? 'max-h-[480px] delay-0' : 'max-h-0 delay-[110ms]',
                ].join(' ')}
                aria-hidden={!expanded}
              >
                <div
                  className={[
                    'border-t border-[rgba(72,72,72,0.18)] pt-5',
                    `transition-[opacity,transform] duration-[300ms] ${easePremium}`,
                    expanded
                      ? 'translate-y-0 opacity-100 delay-[100ms]'
                      : 'translate-y-[6px] opacity-0 delay-0 duration-[260ms]',
                  ].join(' ')}
                >
                  <p className="text-[14px] leading-[1.55] text-[#ABABAB]">{card.extra}</p>
                  <ul className="mt-4 space-y-2 text-[14px] text-[#ABABAB]">
                    {card.extraList.map((point) => (
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
