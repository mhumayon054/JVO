import { useCallback, useEffect, useId, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE, fadeFromX, fadeUp, staggerContainer, viewportOnce } from './homeMotion'

const easePremium = 'ease-[cubic-bezier(0.22,1,0.36,1)]'

const STEPS = [
  {
    n: '01',
    title: 'Discovery Call',
    body: 'Deep dive into your business goals and technical constraints.',
    extra: 'We define the real business problem, identify delivery constraints, and turn the first conversation into a clear execution map.',
    extraList: ['Requirement mapping', 'Technical feasibility review', 'Delivery risk assessment'],
  },
  {
    n: '02',
    title: 'Architecture Match',
    body: 'Aligning the right tech stack and engineering talent to your vision.',
    extra: 'We match the product direction with the right architecture, team shape, and integration strategy before heavy development begins.',
    extraList: ['Stack validation', 'Resource planning', 'Integration strategy'],
  },
  {
    n: '03',
    title: 'Build & Iterate',
    body: 'Continuous delivery with weekly sprints and transparent tracking.',
    extra: 'We ship in controlled cycles with visible progress, tight feedback loops, and quality gates that keep the build stable as it evolves.',
    extraList: ['Weekly sprint execution', 'QA and deployment flow', 'Transparent progress tracking'],
  },
  {
    n: '04',
    title: 'Scale',
    body: 'Hardening systems for scale and preparing for internal hand-off.',
    extra: 'We prepare the product for production pressure, document the system, and create a clean hand-off path for long-term ownership.',
    extraList: ['Performance hardening', 'System documentation', 'Internal team hand-off'],
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

export function HomeMethodologySection() {
  const prefersHover = usePrefersHover()
  const [hoveredStep, setHoveredStep] = useState(null)
  const [expandedStep, setExpandedStep] = useState(null)
  const sectionId = useId()

  const isExpanded = useCallback(
    (stepNumber) => {
      if (prefersHover) return hoveredStep === stepNumber
      return expandedStep === stepNumber
    },
    [prefersHover, hoveredStep, expandedStep],
  )

  const onCardClick = useCallback(
    (stepNumber) => {
      if (prefersHover) return
      setExpandedStep((prev) => (prev === stepNumber ? null : stepNumber))
    },
    [prefersHover],
  )

  const onKeyDown = useCallback(
    (event, stepNumber) => {
      if (prefersHover) return
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onCardClick(stepNumber)
      }
    },
    [prefersHover, onCardClick],
  )

  return (
    <motion.section
      className="py-16 md:py-[88px]"
      variants={staggerContainer(0.1, 0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.h2
        variants={fadeUp(16)}
        className="mx-auto max-w-[1216px] px-4 text-center text-[36px] font-bold leading-[1.1] tracking-[-0.025em] text-white sm:px-8 md:text-[40px]"
      >
        Engineering Methodology
      </motion.h2>

      <motion.div
        variants={fadeUp(22)}
        className="relative mx-auto mt-14 max-w-[1216px] px-4 sm:mt-16 sm:px-8 md:mt-[72px]"
      >
        <div
          className="pointer-events-none absolute bottom-16 left-1/2 top-10 hidden w-px -translate-x-1/2 lg:block"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(175, 162, 255, 0.22) 10%, rgba(72, 72, 72, 0.35) 50%, rgba(175, 162, 255, 0.18) 90%, transparent 100%)',
          }}
          aria-hidden
        />

        <motion.div
          className="relative mx-auto max-w-[920px]"
          variants={staggerContainer(0.12, 0.17)}
        >
          <div className="flex flex-col gap-8 lg:gap-0">
            {STEPS.map((step, i) => {
              const isLeft = i % 2 === 0
              const expanded = isExpanded(step.n)
              const panelId = `${sectionId}-methodology-panel-${i}`

              return (
                <motion.div
                  key={step.n}
                  variants={fadeFromX(isLeft ? -22 : 22)}
                  className={`relative flex w-full items-start ${i > 0 ? 'lg:mt-12' : ''}`}
                >
                  <div
                    className="absolute left-1/2 top-[2.35rem] z-[1] hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-[rgba(175,162,255,0.35)] bg-[#0E0E0E] shadow-[0_0_12px_rgba(116,89,247,0.22)] lg:block"
                    aria-hidden
                  />

                  <div
                    className={`flex w-full max-lg:justify-center ${isLeft ? 'lg:justify-start lg:pr-[calc(50%+28px)]' : 'lg:justify-end lg:pl-[calc(50%+28px)]'}`}
                  >
                    <div className="relative w-full max-w-[420px] lg:h-[320px]">
                      <MethodologyCard
                        step={step}
                        expanded={expanded}
                        panelId={panelId}
                        prefersHover={prefersHover}
                        onMouseEnter={prefersHover ? () => setHoveredStep(step.n) : undefined}
                        onMouseLeave={prefersHover ? () => setHoveredStep(null) : undefined}
                        onClick={!prefersHover ? () => onCardClick(step.n) : undefined}
                        onKeyDown={!prefersHover ? (event) => onKeyDown(event, step.n) : undefined}
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

function MethodologyCard({
  step,
  expanded,
  panelId,
  prefersHover,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onKeyDown,
}) {
  return (
    <motion.article
      className={[
        'flex min-h-0 w-full flex-col overflow-hidden rounded-xl border bg-[rgba(19,19,19,0.65)] px-6 pb-10 pt-9 text-center backdrop-blur-sm md:min-h-[320px] md:px-7 md:pb-11 md:pt-10 lg:absolute lg:left-0 lg:top-0 lg:text-left',
        `transition-[max-height,border-color,box-shadow,opacity] duration-[520ms] ${easePremium}`,
        expanded
          ? 'z-20 border-[rgba(175,162,255,0.22)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_56px_-26px_rgba(0,0,0,0.62),0_0_0_1px_rgba(116,89,247,0.08)] lg:max-h-[520px]'
          : 'z-0 border-[rgba(72,72,72,0.18)] shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_12px_40px_rgba(0,0,0,0.35)] lg:max-h-[320px]',
        !prefersHover ? 'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#7459F7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E0E]' : '',
      ].join(' ')}
      whileHover={{
        y: -2,
        borderColor: 'rgba(175, 162, 255, 0.22)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 56px -26px rgba(0,0,0,0.62), 0 0 0 1px rgba(116,89,247,0.08)',
        transition: { duration: 0.32, ease: EASE },
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={!prefersHover ? 0 : undefined}
      role={!prefersHover ? 'button' : undefined}
      aria-expanded={!prefersHover ? expanded : undefined}
      aria-controls={panelId}
    >
      <div className="flex items-center justify-center gap-3 lg:justify-start">
        <span className="inline-flex min-h-[2.75rem] min-w-[2.75rem] shrink-0 items-center justify-center rounded-lg border border-[rgba(175,162,255,0.12)] bg-gradient-to-b from-[#1C1C1C] to-[#131313] text-[13px] font-bold tabular-nums tracking-[0.12em] text-[#AFA2FF]">
          {step.n}
        </span>
        <span
          className="hidden h-px flex-1 max-w-[48px] bg-gradient-to-r from-[rgba(175,162,255,0.2)] to-transparent lg:block"
          aria-hidden
        />
      </div>
      <h3 className="mt-6 text-[20px] font-bold leading-[1.3] tracking-[-0.02em] text-white md:text-[22px]">
        {step.title}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.62] text-[#9CA3AF] md:text-[16px] md:leading-[1.6]">
        {step.body}
      </p>

      <div
        id={panelId}
        className={[
          'overflow-hidden',
          `transition-[max-height] duration-[520ms] ${easePremium}`,
          expanded ? 'max-h-[360px] delay-0' : 'max-h-0 delay-[90ms]',
        ].join(' ')}
        aria-hidden={!expanded}
      >
        <div
          className={[
            'mt-7 border-t border-[rgba(72,72,72,0.2)] pt-6 text-left',
            `transition-[opacity,transform] duration-[320ms] ${easePremium}`,
            expanded
              ? 'translate-y-0 opacity-100 delay-[110ms]'
              : 'translate-y-[8px] opacity-0 delay-0 duration-[240ms]',
          ].join(' ')}
        >
          <p className="text-[14px] leading-[1.58] text-[#ABABAB] md:text-[15px]">
            {step.extra}
          </p>
          <ul className="mt-5 space-y-2.5 text-[14px] leading-[1.5] text-[#ABABAB] md:text-[15px]">
            {step.extraList.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#AFA2FF]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  )
}
