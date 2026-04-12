import { useRef } from 'react'
import { useViewportCountersOnce } from '../../hooks/useViewportCountersOnce'
import { OmniProjectLockVisual } from './OmniProjectLockVisual'

const STACK = ['Next.js 14', 'OpenAI GPT-4o', 'Pinecone DB', 'Kubernetes', 'Python / FastAPI']

const CASE_STATS = [
  {
    target: 1.2,
    prefix: '',
    suffix: 'M+',
    decimals: '1',
    label: 'DAILY ACTIVE USERS SCALED',
    initial: '0.0M+',
  },
  {
    target: 4.8,
    prefix: '',
    suffix: '/5',
    decimals: '1',
    label: 'USER SENTIMENT SCORE (POST-LAUNCH)',
    initial: '0.0/5',
  },
  {
    target: 60,
    prefix: '',
    suffix: '%',
    decimals: '0',
    label: 'FASTER CONTENT GENERATION',
    initial: '0%',
  },
]

export function CaseStudyFeaturedSection() {
  const sectionRef = useRef(null)
  useViewportCountersOnce(sectionRef, { threshold: 0.2, duration: 1800 })

  return (
    <div ref={sectionRef} className="grid w-full max-w-[1216px] grid-cols-1 gap-[32px] lg:grid-cols-[416px_minmax(0,1fr)] lg:items-stretch">
      <div className="relative min-h-0 overflow-hidden rounded-[16px] border border-[rgba(72,72,72,0.15)] bg-[#131313]">
        <div
          className="pointer-events-none absolute right-0 top-0 z-[1] h-full w-[4px]"
          style={{
            background: 'linear-gradient(180deg, #7459F7 0%, #AFA2FF 100%)',
          }}
          aria-hidden
        />
        <div className="relative box-border flex flex-col justify-center py-[40px] pl-[32px] pr-[44px] lg:min-h-[520px]">
          <div className="flex flex-col gap-[36px]">
            {CASE_STATS.map((s) => (
              <div key={s.label} className="text-right">
                <p className="text-[40px] font-bold leading-[1em] tracking-[-0.03em] text-white tabular-nums lg:text-[44px]">
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
                <p className="mt-[12px] ml-auto max-w-[320px] text-[10px] font-bold uppercase leading-[1.5em] tracking-[0.12em] text-[#ABABAB]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="relative flex min-h-[320px] min-w-0 flex-col items-center justify-center overflow-hidden rounded-[16px] border border-[rgba(72,72,72,0.15)] px-8 py-12 sm:min-h-[420px] lg:min-h-[520px] lg:px-12 lg:py-16"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 38%, rgba(116, 89, 247, 0.14) 0%, rgba(14, 14, 14, 0) 55%), linear-gradient(180deg, #1A1A1A 0%, #131313 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(175, 162, 255, 0.06) 0%, transparent 50%)',
          }}
          aria-hidden
        />
        <div className="relative z-[1] flex w-full max-w-[560px] flex-col items-center text-center">
          <OmniProjectLockVisual />
          <h3 className="text-[32px] font-bold leading-[1.1em] tracking-[-0.02em] text-white sm:text-[36px] lg:text-[40px]">
            Project: Omni-Commerce AI
          </h3>
          <p className="mt-[10px] text-[16px] font-normal leading-[1.5em] text-[#ABABAB] sm:text-[18px] sm:leading-[1.55em]">
            Personalized Recommendation Engine at Scale
          </p>
        </div>
      </div>

      <div className="col-span-1 mt-[8px] grid grid-cols-1 gap-[32px] sm:gap-x-[48px] lg:col-span-2 lg:mt-[40px] lg:grid-cols-3 lg:gap-[48px]">
        <div className="min-w-0">
          <p className="text-left text-[11px] font-bold uppercase leading-[1.45em] tracking-[0.12em] text-white">
            TECHNOLOGY STACK
          </p>
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
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase leading-[1.45em] tracking-[0.14em] text-[#AFA2FF]">THE PROBLEM</p>
          <p className="mt-[16px] text-left text-[15px] font-normal leading-[1.625em] text-[#ABABAB] sm:text-[16px]">
            A global e-commerce platform faced stagnating conversion rates. Static recommendation blocks failed to capture evolving
            user intent, leaving high-value sessions under-monetized across regions and device types.
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase leading-[1.45em] tracking-[0.14em] text-[#AFA2FF]">THE SOLUTION</p>
          <p className="mt-[16px] text-left text-[15px] font-normal leading-[1.625em] text-[#ABABAB] sm:text-[16px]">
            We deployed a behavioral embedding model that updates user personas per session, powering hyper-personalized ranking and
            real-time content assembly—without compromising latency or governance.
          </p>
        </div>
      </div>
    </div>
  )
}
