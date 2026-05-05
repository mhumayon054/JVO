import { motion } from 'framer-motion'

function ServiceIconAI() {
  return (
    <svg className="h-7 w-7 text-[#AFA2FF]" viewBox="0 0 26 26" fill="none" aria-hidden>
      <rect x="4" y="4" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 10h8M9 13h5M9 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ListBullet() {
  return <span className="mt-[0.42em] h-2 w-2 shrink-0 rounded-full bg-[#AFA2FF]" aria-hidden />
}

function ArrowIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 15 15" fill="none" aria-hidden>
      <path
        d="M3 7.5h9m0 0L8.5 3M12 7.5L8.5 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#AFA2FF]"
      />
    </svg>
  )
}

const defaultBullets = [
  'Custom LLM Fine-tuning & Integration',
  'Autonomous Agent Workflows',
  'Vector Database Architecture',
]

export function AISaaSServiceCard({ title = 'AI SaaS Development', description, bullets = defaultBullets }) {
  const summary =
    description ||
    'Transform your business logic into intelligent automation. We specialize in custom LLM orchestrations, agentic workflows, and production-grade RAG pipelines.'
  return (
    <motion.article
      className="relative flex h-full min-h-[420px] min-w-0 flex-col overflow-hidden rounded-[18px] border border-white/[0.06] bg-[#131313]/80 p-6 transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#7459F7]/30 hover:shadow-[0_20px_60px_rgba(116,89,247,0.10)] sm:p-7 lg:min-h-[452px] lg:p-8"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full bg-[rgba(175,162,255,0.08)] blur-[100px]"
        aria-hidden
      />
      <div className="relative z-[1] flex h-full min-h-0 flex-col">
        <div className="flex flex-1 flex-col">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
            <ServiceIconAI />
          </div>
          <h3 className="mt-7 max-w-[720px] text-[30px] font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-[34px] lg:text-[36px]">
            {title}
          </h3>
          <p className="mt-5 max-w-[620px] text-[16px] font-normal leading-[1.65] text-[#ABABAB] sm:text-[17px]">
            {summary}
          </p>
          <ul className="mt-7 grid max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {bullets.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[14px] font-medium leading-[1.5] text-white/90">
                <ListBullet />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="relative z-[1] mt-9 flex w-fit items-center gap-2 bg-transparent text-left text-[15px] font-bold leading-[1.5] text-[#AFA2FF] transition-opacity hover:opacity-90"
        >
          Explore AI Capabilities
          <ArrowIcon />
        </button>
      </div>
    </motion.article>
  )
}
