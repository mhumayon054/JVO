import { SiteHeader } from '../components/SiteHeader'
import { PartnershipFooter } from '../components/PartnershipFooter'

function StoryIconRoots() {
  return (
    <svg className="h-[22px] w-[14px] shrink-0 text-[#AFA2FF]" viewBox="0 0 14 22" fill="none" aria-hidden>
      <path d="M7 2v18M2 8h10M2 14h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function StoryIconPivot() {
  return (
    <svg className="h-6 w-[22px] shrink-0 text-[#AFA2FF]" viewBox="0 0 22 24" fill="none" aria-hidden>
      <path
        d="M4 20 18 6M18 6H8M18 6v10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const philosophy = [
  {
    n: '01',
    title: 'Product-first',
    body: 'We start with the "Why." Technology is a lever for business value. If the AI doesn\'t solve a core user friction, it\'s just noise.',
  },
  {
    n: '02',
    title: 'Engineering-led',
    body: 'Clean code is non-negotiable. We build modular, scalable, and observable systems that won\'t crumble under production loads.',
  },
  {
    n: '03',
    title: 'Data-driven',
    body: 'We iterate based on metrics, not gut feeling. Every model deployment is backed by rigorous evaluation and feedback loops.',
  },
]

const leaders = [
  {
    name: 'Julian Voss',
    role: 'Founder & CTO',
    bio: 'Former Lead Architect at high-growth fintech platforms. Julian specializes in distributed systems and LLM orchestration.',
    img: '/figma/about/leader-julian-543c57.png',
  },
  {
    name: 'Elena Moretti',
    role: 'Head of AI Engineering',
    bio: 'Machine Learning researcher with a focus on RAG architectures and multi-agent system optimization.',
    img: '/figma/about/leader-elena-543c57.png',
  },
  {
    name: 'Marcus Thorne',
    role: 'Head of Product Strategy',
    bio: 'Expert in product-led growth and translating complex technical capabilities into intuitive user experiences.',
    img: '/figma/about/leader-marcus-543c57.png',
  },
]

export default function AboutUsPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-[1280px] bg-[#0E0E0E] text-white">
        <SiteHeader />

        <div className="flex flex-col gap-24 pb-16 pt-8 lg:gap-[160px]">
          {/* Hero / Our Mission */}
          <section className="px-4 sm:px-8">
            <div className="mx-auto grid max-w-[1216px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="flex min-w-0 flex-col gap-6">
                <p className="text-[12px] font-normal uppercase leading-[1.33] tracking-[0.2em] text-[#AFA2FF]">Our Mission</p>
                <h1 className="whitespace-pre-line text-[56px] font-bold leading-none tracking-[-0.04em] sm:text-[72px] lg:text-[96px]">
                  Empowering{'\n'}founders with{'\n'}world-class AI{'\n'}engineering.
                </h1>
                <p className="max-w-[672px] text-[20px] font-normal leading-[1.33] text-[#ABABAB] sm:text-[24px] sm:leading-[1.33]">
                  We bridge the gap between ambitious vision and technical reality, building the intelligent infrastructure that defines the
                  next era of software.
                </p>
              </div>
              <div className="relative mx-auto aspect-square w-full max-w-[479px] overflow-hidden rounded-lg bg-[#131313] lg:mx-0 lg:max-w-none lg:justify-self-end">
                <img
                  src="/figma/about/hero-mission-56586a.png"
                  alt="JVO Labs mission"
                  className="h-full w-full object-cover opacity-60"
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg"
                  style={{
                    background: 'linear-gradient(0deg, #0E0E0E 0%, rgba(14, 14, 14, 0) 100%)',
                  }}
                />
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="bg-[#131313] px-4 py-16 sm:px-8 lg:py-32">
            <div className="mx-auto flex max-w-[1216px] flex-col gap-12 lg:flex-row lg:gap-20">
              <div className="shrink-0 lg:max-w-[280px]">
                <h2 className="text-[28px] font-bold leading-[1.11] tracking-[-0.025em] sm:text-[36px]">Our Story</h2>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-12">
                <p className="text-[20px] font-light leading-[1.375] text-white sm:text-[24px]">
                  JVO Labs began at the intersection of product intuition and rigorous engineering. We didn&apos;t start as an AI agency;
                  we started as builders.
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  <div className="flex flex-col gap-4 rounded-md border border-[rgba(72,72,72,0.15)] p-8">
                    <StoryIconRoots />
                    <h3 className="text-[20px] font-bold leading-[1.4]">The Roots</h3>
                    <p className="text-[16px] leading-[1.625] text-[#ABABAB]">
                      Deeply embedded in product engineering, we helped early-stage startups navigate the complexities of scaling
                      distributed systems long before the AI surge.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 rounded-md border border-[rgba(72,72,72,0.15)] p-8">
                    <StoryIconPivot />
                    <h3 className="text-[20px] font-bold leading-[1.4]">The Pivot</h3>
                    <p className="text-[16px] leading-[1.625] text-[#ABABAB]">
                      As LLMs reached a tipping point, we realized the greatest challenge wasn&apos;t the models themselves, but the engineering
                      required to make them production-ready.
                    </p>
                  </div>
                </div>
                <p className="text-[18px] leading-[1.625] text-[#ABABAB]">
                  Today, JVO Labs operates as an elite AI studio. We don&apos;t just &quot;implement&quot; AI; we architect systems that learn, adapt,
                  and provide genuine competitive moats for the founders we partner with.
                </p>
              </div>
            </div>
          </section>

          {/* Development Philosophy */}
          <section className="px-4 sm:px-8">
            <div className="mx-auto flex max-w-[1216px] flex-col gap-12 lg:gap-20">
              <div className="flex flex-col items-center gap-6 text-center">
                <h2 className="max-w-[620px] text-[36px] font-bold leading-none tracking-[-0.05em] sm:text-[48px]">
                  Our Development Philosophy
                </h2>
                <div className="h-1 w-24 bg-[#7459F7]" />
              </div>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-10">
                {philosophy.map((item) => (
                  <div key={item.n} className="flex flex-col">
                    <span className="text-[56px] font-bold leading-none text-[rgba(255,255,255,0.08)] sm:text-[72px]">{item.n}</span>
                    <h3 className="pt-6 text-[24px] font-bold leading-[1.2] sm:text-[30px]">{item.title}</h3>
                    <p className="max-w-[370px] pt-6 text-[16px] leading-[1.625] text-[#ABABAB]">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Leadership */}
          <section className="px-4 sm:px-8">
            <div className="mx-auto flex max-w-[1216px] flex-col gap-12 lg:gap-16">
              <h2 className="text-[28px] font-bold leading-[1.11] tracking-[-0.025em] sm:text-[36px]">Leadership Team</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {leaders.map((l) => (
                  <article
                    key={l.name}
                    className="flex flex-col overflow-hidden rounded border border-[rgba(72,72,72,0.1)] bg-[#131313] px-8 pb-8 pt-8 sm:px-[33px]"
                  >
                    <div className="overflow-hidden rounded bg-[#262626]">
                      <div className="aspect-[318/397.5] w-full">
                        <img src={l.img} alt={l.name} className="h-full w-full object-cover" />
                      </div>
                    </div>
                    <h3 className="mt-8 text-[24px] font-bold leading-[1.33]">{l.name}</h3>
                    <p className="mt-2 text-[12px] font-normal uppercase leading-[1.33] tracking-[0.1em] text-[#AFA2FF]">{l.role}</p>
                    <p className="mt-4 text-[14px] leading-[1.625] text-[#ABABAB]">{l.bio}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-4 sm:px-8">
            <div className="relative mx-auto max-w-[1216px] overflow-hidden rounded-lg border border-[rgba(72,72,72,0.15)] bg-[rgba(38,38,38,0.4)] px-8 py-16 backdrop-blur-[20px] sm:px-12 sm:py-20 lg:px-24 lg:py-24">
              <div
                className="pointer-events-none absolute -right-4 -top-24 h-64 w-64 rounded-full bg-[rgba(175,162,255,0.1)] blur-[100px] sm:right-8"
                aria-hidden
              />
              <div className="relative flex flex-col items-center gap-8 text-center">
                <h2 className="max-w-[680px] text-[40px] font-bold leading-none tracking-[-0.05em] sm:text-[52px] lg:text-[60px]">
                  Ready to build the future?
                </h2>
                <p className="max-w-[672px] text-[18px] leading-[1.4] text-[#ABABAB] sm:text-[20px] sm:leading-[1.4]">
                  Let&apos;s discuss how our precision engineering can accelerate your AI roadmap.
                </p>
                <button
                  type="button"
                  className="rounded-md px-10 py-4 text-[18px] font-bold leading-[1.56] text-black"
                  style={{ background: 'linear-gradient(174deg, #7459F7 0%, #AFA2FF 100%)' }}
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <PartnershipFooter />
    </>
  )
}
