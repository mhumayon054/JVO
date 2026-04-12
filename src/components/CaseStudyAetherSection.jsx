import { useRef } from 'react'
import { useViewportCountersOnce } from '../hooks/useViewportCountersOnce'

const STATS = [
  {
    target: 88,
    prefix: '',
    suffix: '%',
    decimals: '0',
    initial: '0%',
    label: 'REDUCTION IN MANUAL AUDIT TIME',
  },
  {
    target: 0.02,
    prefix: '',
    suffix: '%',
    decimals: '2',
    initial: '0.00%',
    label: 'DOCUMENT HALLUCINATION RATE',
  },
  {
    target: 2.4,
    prefix: '$',
    suffix: 'M',
    decimals: '1',
    initial: '$0.0M',
    label: 'ANNUAL OPEX RECLAIMED',
  },
]

const STACK = ['Next.js 14', 'OpenAI GPT-4o', 'Pinecone DB', 'Kubernetes', 'Python / FastAPI']

export function CaseStudyAetherSection() {
  const rootRef = useRef(null)
  useViewportCountersOnce(rootRef, { threshold: 0.2, duration: 1800 })

  return (
    <div ref={rootRef} className="grid w-full max-w-[1216px] grid-cols-1 gap-[48px] lg:grid-cols-[752px_416px] lg:items-start">
      <div className="flex min-w-0 flex-col">
        <div className="relative w-full overflow-hidden bg-[#131313]">
          <img
            src="/figma/case-studies/AI Visualization.png"
            alt=""
            className="min-h-[320px] w-full object-cover object-[center_20%] grayscale sm:min-h-[420px] lg:min-h-[520px]"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(14, 14, 14, 0) 35%, rgba(14, 14, 14, 0.55) 70%, rgba(14, 14, 14, 0.92) 100%)',
            }}
          />
          <div className="absolute bottom-0 left-0 w-full p-[32px] pb-[28px] pt-[80px]">
            <h3 className="text-left text-[32px] font-bold leading-[1.1em] tracking-[-0.02em] text-white sm:text-[36px] lg:text-[40px]">
              Project: Aether Neural Engine
            </h3>
            <p className="mt-[10px] max-w-[560px] text-left text-[16px] font-normal leading-[1.5em] text-[#ABABAB] lg:text-[18px] lg:leading-[1.55em]">
              Enterprise-Grade Financial LLM Implementation
            </p>
          </div>
        </div>

        <div className="mt-[40px] grid grid-cols-1 gap-[32px] sm:grid-cols-2 sm:gap-x-[48px] sm:gap-y-0">
          <div>
            <p className="text-[11px] font-bold uppercase leading-[1.45em] tracking-[0.14em] text-[#AFA2FF]">THE PROBLEM</p>
            <p className="mt-[16px] text-left text-[15px] font-normal leading-[1.625em] text-[#ABABAB] sm:text-[16px]">
              A Tier-1 financial institution struggled with 40,000+ manual compliance reviews per month. Latency and hallucination
              risks prevented automation.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase leading-[1.45em] tracking-[0.14em] text-[#AFA2FF]">THE SOLUTION</p>
            <p className="mt-[16px] text-left text-[15px] font-normal leading-[1.625em] text-[#ABABAB] sm:text-[16px]">
              JVO Labs engineered a custom RAG architecture with sub-200ms latency, utilizing specialized embeddings for financial
              taxonomy and multi-agent verification.
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-[24px]">
        <div className="box-border rounded-[16px] border-y-[1px] border-r-[1px] border-[rgba(72,72,72,0.15)] border-l-[4px] border-l-[#AFA2FF] bg-[#131313] py-[40px] pl-[32px] pr-[40px]">
          <div className="flex flex-col gap-[36px]">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-left text-[40px] font-bold leading-[1em] tracking-[-0.03em] text-white tabular-nums lg:text-[44px]">
                  <span
                    className="counter"
                    data-counter
                    data-target={String(s.target)}
                    data-prefix={s.prefix}
                    data-suffix={s.suffix}
                    data-decimals={s.decimals}
                  >
                    {s.initial}
                  </span>
                </p>
                <p className="mt-[12px] max-w-[320px] text-left text-[10px] font-bold uppercase leading-[1.5em] tracking-[0.12em] text-[#ABABAB]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="box-border rounded-[16px] border-[1px] border-[rgba(72,72,72,0.15)] bg-[#131313] p-[40px]">
          <p className="text-left text-[11px] font-bold uppercase leading-[1.45em] tracking-[0.12em] text-white">TECHNOLOGY STACK</p>
          <div className="mt-[24px] flex flex-wrap gap-[10px]">
            {STACK.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-[6px] bg-[#262626] px-[14px] py-[9px] text-left text-[13px] font-medium leading-[1.3em] text-[#E8E8E8]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
