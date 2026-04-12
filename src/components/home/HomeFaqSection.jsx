import { useState } from 'react'

const FAQS = [
  {
    q: 'How long is an average MVP build?',
    a: 'Most MVPs land in roughly eight to fourteen weeks, depending on integrations, compliance needs, and how much of the stack is greenfield versus existing.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'Yes. We offer retainers for incident response, roadmap delivery, and performance tuning so launches stay stable as usage grows.',
  },
  {
    q: 'Can you integrate with our existing team?',
    a: 'We routinely embed with in-house engineers—shared rituals, code review, and clear interfaces between your org and ours.',
  },
  {
    q: 'What does engagement pricing look like?',
    a: 'Pricing follows scope and squad composition: time-and-materials, milestone-based phases, or monthly squad retainers after a short discovery.',
  },
]

function Chevron({ open }) {
  return (
    <span
      className={`ml-3 inline-flex shrink-0 text-[#AFA2FF] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? 'rotate-180' : 'rotate-0'
      }`}
      aria-hidden
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1216px] px-4 sm:px-8">
        <p className="mx-auto block w-fit rounded-xl border border-[rgba(72,72,72,0.15)] px-4 py-1 text-center text-[12px] font-bold uppercase tracking-[0.1em] text-[#AFA2FF]">
          Inquiry
        </p>
        <h2 className="mt-4 text-center text-[36px] font-bold leading-[1.1] tracking-[-0.025em] text-white md:text-[40px]">
          Common Questions
        </h2>
        <div className="mx-auto mt-10 max-w-[1216px] space-y-3">
          {FAQS.map((item, i) => {
            const open = openIndex === i
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-[rgba(72,72,72,0.15)] bg-[#0E0E0E] transition-[border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[rgba(72,72,72,0.28)]"
              >
                <button
                  type="button"
                  id={`faq-btn-${i}`}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[18px] font-bold leading-[1.35] text-white md:text-[20px]">{item.q}</span>
                  <Chevron open={open} />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      className={`border-t border-[rgba(72,72,72,0.12)] px-6 pb-5 pt-1 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        open ? 'translate-y-0 opacity-100 delay-75' : '-translate-y-1 opacity-0'
                      }`}
                    >
                      <p className="pt-3 text-[15px] leading-[1.6] text-[#ABABAB] md:text-[16px]">{item.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
