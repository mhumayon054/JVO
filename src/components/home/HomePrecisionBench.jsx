import { useCallback, useState } from 'react'

const MEMBERS = [
  {
    name: 'Ari Voss',
    role: 'AI Engineer',
    img: '/figma/engineer-1.png',
    bio: 'Battle-tested specialist with production experience in high-stakes AI systems.',
  },
  {
    name: 'Mira Chen',
    role: 'Tech Lead',
    img: '/figma/engineer-2.png',
    bio: 'Battle-tested specialist with production experience in high-stakes AI systems.',
  },
  {
    name: 'Noah Kim',
    role: 'Cloud Architect',
    img: '/figma/engineer-3.png',
    bio: 'Battle-tested specialist with production experience in high-stakes AI systems.',
  },
]

function Chevron({ dir }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      {dir === 'prev' ? (
        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

function BenchCard({ member }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[rgba(72,72,72,0.15)] bg-[rgba(72,72,72,0.2)] p-7 md:p-8">
      <img src={member.img} alt="" className="h-[72px] w-[72px] rounded-xl object-cover" />
      <h3 className="mt-6 text-[24px] font-bold leading-[1.2] tracking-[-0.02em] text-white">{member.name}</h3>
      <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#AFA2FF]">{member.role}</p>
      <p className="mt-5 text-[14px] leading-[1.5] text-[#ABABAB]">{member.bio}</p>
    </div>
  )
}

export function HomePrecisionBench() {
  const [index, setIndex] = useState(0)
  const n = MEMBERS.length

  const go = useCallback(
    (delta) => {
      setIndex((i) => (i + delta + n) % n)
    },
    [n],
  )

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1216px] px-4 sm:px-8">
        <h2 className="text-center text-[36px] font-bold leading-[1.1] tracking-[-0.025em] text-white md:text-[40px]">
          The Precision Bench
        </h2>

        <div className="mt-12 md:mt-14">
          <div className="hidden grid-cols-3 gap-6 lg:grid">
            {MEMBERS.map((m) => (
              <article key={m.name}>
                <BenchCard member={m} />
              </article>
            ))}
          </div>

          <div className="lg:hidden">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {MEMBERS.map((m) => (
                  <article key={m.name} className="w-full shrink-0 px-1">
                    <BenchCard member={m} />
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Previous team member"
                onClick={() => go(-1)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(72,72,72,0.2)] bg-[rgba(19,19,19,0.85)] text-white transition-[border-color,background-color,color] duration-200 hover:border-[rgba(116,89,247,0.45)] hover:bg-[rgba(116,89,247,0.08)] hover:text-[#AFA2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7459F7]"
              >
                <Chevron dir="prev" />
              </button>
              <div className="flex gap-2" role="tablist" aria-label="Team slides">
                {MEMBERS.map((m, i) => (
                  <button
                    key={m.name}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show ${m.name}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 w-2 rounded-full transition-[background-color,transform] duration-300 ${
                      i === index ? 'scale-110 bg-[#AFA2FF]' : 'bg-[rgba(72,72,72,0.6)] hover:bg-[rgba(171,171,171,0.5)]'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next team member"
                onClick={() => go(1)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(72,72,72,0.2)] bg-[rgba(19,19,19,0.85)] text-white transition-[border-color,background-color,color] duration-200 hover:border-[rgba(116,89,247,0.45)] hover:bg-[rgba(116,89,247,0.08)] hover:text-[#AFA2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7459F7]"
              >
                <Chevron dir="next" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
