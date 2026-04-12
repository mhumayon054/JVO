const STEPS = [
  {
    n: '01',
    title: 'Discovery Call',
    body: 'Deep dive into your business goals and technical constraints.',
  },
  {
    n: '02',
    title: 'Architecture Match',
    body: 'Aligning the right tech stack and engineering talent to your vision.',
  },
  {
    n: '03',
    title: 'Build & Iterate',
    body: 'Continuous delivery with weekly sprints and transparent tracking.',
  },
  {
    n: '04',
    title: 'Scale',
    body: 'Hardening systems for scale and preparing for internal hand-off.',
  },
]

export function HomeMethodologySection() {
  return (
    <section className="py-16 md:py-[88px]">
      <div className="mx-auto w-full max-w-[1216px] px-4 sm:px-8">
        <h2 className="text-center text-[36px] font-bold leading-[1.1] tracking-[-0.025em] text-white md:text-[40px]">
          Engineering Methodology
        </h2>

        <div className="relative mt-14 sm:mt-16 md:mt-[72px]">
          {/* Vertical spine — desktop only */}
          <div
            className="pointer-events-none absolute bottom-16 left-1/2 top-10 hidden w-px -translate-x-1/2 lg:block"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(175, 162, 255, 0.22) 10%, rgba(72, 72, 72, 0.35) 50%, rgba(175, 162, 255, 0.18) 90%, transparent 100%)',
            }}
            aria-hidden
          />

          <div className="relative mx-auto max-w-[920px]">
            <div className="flex flex-col gap-8 lg:gap-0">
              {STEPS.map((step, i) => {
                const isLeft = i % 2 === 0
                return (
                  <div
                    key={step.n}
                    className={`relative flex w-full items-start ${i > 0 ? 'lg:mt-12' : ''}`}
                  >
                    {/* Timeline node — desktop */}
                    <div
                      className="absolute left-1/2 top-[2.35rem] z-[1] hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-[rgba(175,162,255,0.35)] bg-[#0E0E0E] shadow-[0_0_12px_rgba(116,89,247,0.22)] lg:block"
                      aria-hidden
                    />

                    <div
                      className={`flex w-full max-lg:justify-center ${isLeft ? 'lg:justify-start lg:pr-[calc(50%+28px)]' : 'lg:justify-end lg:pl-[calc(50%+28px)]'}`}
                    >
                      <div className="w-full max-w-[420px]">
                        <MethodologyCard step={step} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MethodologyCard({ step }) {
  return (
    <article className="flex min-h-0 w-full flex-col rounded-xl border border-[rgba(72,72,72,0.18)] bg-[rgba(19,19,19,0.65)] px-6 pb-10 pt-9 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm md:min-h-[320px] md:px-7 md:pb-11 md:pt-10 lg:text-left">
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
    </article>
  )
}
