import { motion } from 'framer-motion'
import { EASE, fadeUp, staggerContainer, viewportOnce } from './homeMotion'

const iconClass = 'h-7 w-7 text-[#8B5CF6]'

function HealthTechIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s-7-4.35-9.25-9.05C1.4 9.13 2.2 5.9 4.83 4.55 6.77 3.56 9.01 4.08 10.35 5.6L12 7.48l1.65-1.88c1.34-1.52 3.58-2.04 5.52-1.05 2.63 1.35 3.43 4.58 2.08 7.4C19 16.65 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.4 12h2.1l1-2.4 2 5.1 1.2-2.7h1.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EdTechIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.5 5.75c0-.97.78-1.75 1.75-1.75H11c1.1 0 2 .9 2 2v14c0-1.1-.9-2-2-2H6.25c-.97 0-1.75-.78-1.75-1.75V5.75Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 5.75c0-.97-.78-1.75-1.75-1.75H13c-1.1 0-2 .9-2 2v14c0-1.1.9-2 2-2h4.75c.97 0 1.75-.78 1.75-1.75V5.75Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8h2M8 11h2M16 8h-2M16 11h-2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function LogisticsIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.5 7.5h10v8h-10v-8ZM13.5 10h3.35l3.65 3.6v1.9h-7v-5.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 18a1.7 1.7 0 1 0 0-3.4A1.7 1.7 0 0 0 7 18ZM17.4 18a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function FintechIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7.25A2.25 2.25 0 0 1 6.25 5h11.5A2.25 2.25 0 0 1 20 7.25v9.5A2.25 2.25 0 0 1 17.75 19H6.25A2.25 2.25 0 0 1 4 16.75v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 9h16M7 14h3M15 14h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M12 16.25c1.25 0 2.25-.73 2.25-1.63S13.25 13 12 13s-2.25-.73-2.25-1.63S10.75 9.75 12 9.75m0 6.5v1.25m0-9v1.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function EcommerceTechIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.5 5h2.25l1.7 9.2a2 2 0 0 0 1.97 1.64h7.72a2 2 0 0 0 1.93-1.48L20.5 9H7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 20a1.4 1.4 0 1 0 0-2.8A1.4 1.4 0 0 0 10 20ZM17 20a1.4 1.4 0 1 0 0-2.8A1.4 1.4 0 0 0 17 20Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M12 11h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

const INDUSTRIES = [
  {
    icon: HealthTechIcon,
    name: 'Health Tech',
    description: 'AI-enabled diagnostics, patient workflows, and compliant healthcare platforms.',
  },
  {
    icon: EdTechIcon,
    name: 'EdTech',
    description: 'Adaptive learning systems, student platforms, and education-focused automation.',
  },
  {
    icon: LogisticsIcon,
    name: 'Logistics',
    description: 'Route optimization, fleet intelligence, and real-time operational visibility.',
  },
  {
    icon: FintechIcon,
    name: 'Fintech',
    description: 'Secure payment flows, risk automation, and intelligent financial products.',
  },
  {
    icon: EcommerceTechIcon,
    name: 'E commerce Tech',
    description: 'Conversion-focused commerce platforms, personalization, and recommendation engines.',
  },
]

export function HomeIndustriesSection() {
  return (
    <section className="bg-[#131313] py-16 md:py-20">
      <motion.div
        className="mx-auto w-full max-w-[1216px] px-4 sm:px-8"
        variants={staggerContainer(0.08, 0.13)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.h2
          variants={fadeUp(16)}
          className="text-center text-[40px] font-bold leading-[1.1] tracking-[-0.025em] text-white max-md:text-[32px] md:text-[48px]"
        >
          Industries We Serve
        </motion.h2>
        <motion.p
          variants={fadeUp(14)}
          className="mx-auto mt-5 max-w-[720px] text-center text-[17px] leading-[1.55] text-[#ABABAB] md:mt-6 md:text-[18px] md:leading-[1.56]"
        >
          Specialized intelligence engineering for mission-critical sectors.
        </motion.p>
        <motion.div
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-5 xl:gap-5"
          variants={staggerContainer(0.05, 0.09)}
        >
          {INDUSTRIES.map((item) => {
            const Icon = item.icon

            return (
              <motion.article
                key={item.name}
                variants={fadeUp(18)}
                className="flex flex-col rounded-2xl border border-[rgba(72,72,72,0.15)] bg-[rgba(72,72,72,0.2)] p-6 backdrop-blur-[20px]"
                whileHover={{
                  y: -2,
                  borderColor: 'rgba(116, 89, 247, 0.2)',
                  boxShadow: '0 20px 44px -30px rgba(0, 0, 0, 0.55)',
                  transition: { duration: 0.3, ease: EASE },
                }}
              >
                <div>
                  <Icon />
                </div>
                <h3 className="mt-5 text-[20px] font-bold leading-[1.25] tracking-[-0.02em] text-white">{item.name}</h3>
                <p className="mt-3 text-[14px] leading-[1.5] text-[#ABABAB]">{item.description}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}