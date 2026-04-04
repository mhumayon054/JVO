function ServiceIconAI() {
  return (
    <svg className="text-[#AFA2FF]" width={26} height={26} viewBox="0 0 26 26" fill="none" aria-hidden>
      <rect x="4" y="4" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 10h8M9 13h5M9 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ListBullet() {
  return <span className="h-[11px] w-[11px] shrink-0 rounded-full bg-[#AFA2FF]" aria-hidden />
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

const bullets = [
  'Custom LLM Fine-tuning & Integration',
  'Autonomous Agent Workflows',
  'Vector Database Architecture',
]

export function AISaaSServiceCard() {
  return (
    <article className="relative flex min-h-0 flex-col justify-center overflow-hidden rounded-lg border border-[rgba(72,72,72,0.1)] bg-[#131313] p-10 lg:min-h-[518px]">
      <div
        className="pointer-events-none absolute h-[256px] w-[256px] rounded-full bg-[rgba(175,162,255,0.1)] blur-[100px] max-lg:right-[-80px] max-lg:top-0 lg:left-[543px] lg:top-px"
        aria-hidden
      />
      <div className="relative z-[1] flex min-h-0 flex-col justify-between self-stretch">
        <div className="relative min-h-[380px]">
          <div className="absolute left-[5px] top-[7px]">
            <ServiceIconAI />
          </div>
          <h3 className="absolute left-0 top-16 max-w-[718px] text-[36px] font-bold leading-[1.1111111111111112] tracking-[-0.025em] text-white">
            AI SaaS Development
          </h3>
          <p className="absolute left-0 top-[120px] max-w-[576px] text-[18px] font-normal leading-[1.5555555555555556] text-[#ABABAB]">
            Transform your business logic into intelligent automation. We specialize in custom LLM orchestrations, agentic
            workflows, and production-grade RAG pipelines.
          </p>
          <ul className="absolute left-0 top-[236px] flex max-w-[718px] flex-col gap-3">
            {bullets.map((t) => (
              <li key={t} className="flex items-center gap-3 text-[16px] font-normal leading-[1.5] text-white">
                <ListBullet />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="relative z-[1] mt-auto flex w-fit items-center gap-2 bg-transparent pt-0 text-left text-[16px] font-bold leading-[1.5] text-[#AFA2FF] transition-opacity hover:opacity-90"
        >
          Explore AI Capabilities
          <ArrowIcon />
        </button>
      </div>
    </article>
  )
}
