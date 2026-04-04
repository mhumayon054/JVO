import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { PartnershipFooter } from '../components/PartnershipFooter'
import { InsightArticleCard } from '../components/InsightArticleCard'

function IconArrowMd() {
  return (
    <svg className="h-3 w-3 shrink-0 text-[#AFA2FF]" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M1 12 12 1M12 1H5M12 1v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconChevronNext() {
  return (
    <svg className="h-[7px] w-[15px] rotate-[-90deg] text-white" viewBox="0 0 15 7" fill="none" aria-hidden>
      <path d="M1 1 7.5 6 14 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const articles = [
  {
    image: '/figma/insights/article-1-5f259e.png',
    category: 'AI Strategy',
    title: "The RAG Fallacy: Why Your LLM\nKnowledge Base is Failing.",
    description:
      'Vector databases are only 20% of the battle. Here is how we build context engines that actually perform at scale.',
  },
  {
    image: '/figma/insights/article-2-5f259e.png',
    category: 'Startup Scaling',
    title: 'Engineering Velocity vs. Technical\nDebt: The $100M Balancing Act.',
    description:
      'When to move fast and break things, and when breaking things will break your series B expansion.',
  },
  {
    image: '/figma/insights/article-3-5f259e.png',
    category: 'Product Engineering',
    title: 'Rust in the Browser: The Future of\nHigh-Performance Web Apps.',
    description:
      'WebAssembly is no longer a niche. How we used it to 10x the performance of real-time design tools.',
  },
  {
    image: '/figma/insights/article-4-5f259e.png',
    category: 'Founder Focus',
    title: 'The Solo Architect: Building to $1M\nARR with Zero Hires.',
    description:
      'Automation and AI-leveraged development are redefining the "lean startup" playbook for 2024.',
  },
]

const taxonomy = ['AI & ML', 'Cloud Native', 'Engineering Leadership', 'Product Growth', 'Deep Tech', 'DevOps']

const trending = [
  { n: '01.', title: 'Scaling Postgres to 10 Billion Rows\nwithout Sharding.' },
  { n: '02.', title: 'Why We Moved Away from Kubernetes\nin Early Stage.' },
  { n: '03.', title: 'The 3 Pillars of AI Defensibility for SaaS\nFounders.' },
]

export default function InsightsPage() {
  const [page, setPage] = useState(1)

  return (
    <>
      <main className="mx-auto w-full max-w-[1280px] bg-[#0E0E0E] text-white">
        <SiteHeader />

        <div className="flex flex-col gap-16 px-4 pb-20 pt-8 sm:px-8 lg:gap-[128px] lg:pb-20 lg:pt-[128px]">
          {/* Featured */}
          <section className="mx-auto w-full max-w-[1216px]">
            <div className="overflow-hidden rounded-lg border border-[rgba(72,72,72,0.15)] bg-[#131313] lg:flex lg:min-h-[637px]">
              <div className="relative h-[320px] w-full shrink-0 lg:h-auto lg:min-h-[637px] lg:w-[708px] lg:max-w-[58.24%]">
                <img
                  src="/figma/insights/featured-hero-49fd9d.png"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    background: 'linear-gradient(90deg, #0E0E0E 0%, rgba(14, 14, 14, 0) 50%, rgba(14, 14, 14, 0) 100%)',
                  }}
                />
              </div>
              <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 sm:py-16 lg:p-[80px]">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[12px] font-bold uppercase leading-[1.33] tracking-[0.2em] text-[#AFA2FF]">Architecture</span>
                    <div className="h-px w-8 bg-[rgba(72,72,72,0.3)]" />
                    <span className="text-[12px] font-medium leading-[1.33] text-[#ABABAB]">12 Min Read</span>
                  </div>
                  <h1 className="whitespace-pre-line text-[48px] font-bold leading-none tracking-[-0.05em] sm:text-[64px] lg:text-[72px]">
                    The Post-{'\n'}SaaS{'\n'}Architecture.
                  </h1>
                </div>
                <p className="mt-10 max-w-[560px] text-[18px] font-normal leading-[1.625] text-[#ABABAB]">
                  Why the next generation of decacorns won&apos;t be built on multi-tenant monoliths, but on sovereign AI agents and
                  decentralized compute clusters.
                </p>
                <a
                  href="#"
                  className="mt-10 inline-flex items-center gap-4 text-[16px] font-bold leading-[1.5] tracking-[-0.025em] text-[#AFA2FF]"
                >
                  Read the Full Thesis
                  <IconArrowMd />
                </a>
              </div>
            </div>
          </section>

          {/* Newsletter strip */}
          <section className="bg-[#131313] py-16">
            <div className="mx-auto flex max-w-[1216px] flex-col gap-8 px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-[251px]">
              <div className="flex max-w-[560px] flex-col gap-2">
                <h2 className="text-[24px] font-bold leading-[1.3333333333333333em] tracking-[-0.025em] text-white">
                  Technical Alpha for Founders.
                </h2>
                <p className="text-[16px] font-normal leading-[1.5] text-[#ABABAB]">
                  Weekly notes on scaling engineering teams and AI-first product strategy.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-4">
                <label className="sr-only" htmlFor="insights-newsletter-email">
                  Email
                </label>
                <input
                  id="insights-newsletter-email"
                  type="email"
                  placeholder="founder@company.com"
                  className="min-h-[52px] min-w-0 flex-1 border-0 border-b-2 border-[rgba(72,72,72,0.3)] bg-[#0E0E0E] px-4 py-[14px] text-[16px] leading-[1.21] text-white placeholder:text-[#6B7280] outline-none focus-visible:border-[#AFA2FF] sm:min-w-[240px]"
                />
                <button
                  type="button"
                  className="shrink-0 bg-[#262626] px-8 py-[13px] text-[16px] font-bold leading-[1.5] text-white"
                >
                  Join
                </button>
              </div>
            </div>
          </section>

          {/* Grid + sidebar */}
          <section className="mx-auto w-full max-w-[1216px]">
            <div className="flex flex-col gap-16 xl:flex-row xl:gap-[64px]">
              <div className="min-w-0 flex-1">
                <div className="grid grid-cols-1 gap-x-[32px] gap-y-[80px] sm:grid-cols-2 sm:justify-items-start">
                  {articles.map((a) => (
                    <InsightArticleCard
                      key={a.title}
                      image={a.image}
                      imageAlt=""
                      category={a.category}
                      title={a.title}
                      description={a.description}
                    />
                  ))}
                </div>
                <div className="mt-20 flex justify-center gap-4">
                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPage(n)}
                      className={`flex h-10 w-10 items-center justify-center text-[16px] font-normal leading-[1.5] ${
                        n === 1 ? 'border border-[rgba(72,72,72,0.15)]' : ''
                      } ${page === n ? 'text-[#AFA2FF]' : 'text-white'}`}
                    >
                      {String(n).padStart(2, '0')}
                    </button>
                  ))}
                  <button type="button" className="flex h-10 w-10 items-center justify-center text-white" aria-label="Next page">
                    <IconChevronNext />
                  </button>
                </div>
              </div>

              <aside className="w-full shrink-0 xl:w-[320px]">
                <div className="flex flex-col gap-16">
                  <div className="flex flex-col gap-8">
                    <div className="border-b border-[rgba(72,72,72,0.1)] pb-4">
                      <h3 className="text-[12px] font-bold uppercase leading-[1.33] tracking-[0.2em] text-white">Taxonomy</h3>
                    </div>
                    <div className="relative min-h-[94px]">
                      <div className="flex flex-wrap gap-2">
                        {taxonomy.map((t) => (
                          <a
                            key={t}
                            href="#"
                            className="inline-flex items-center rounded-sm border border-[rgba(72,72,72,0.1)] bg-[#131313] px-3 py-1 text-[12px] font-normal leading-[1.33] text-white transition-colors hover:border-[rgba(175,162,255,0.4)]"
                          >
                            {t}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-8">
                    <div className="border-b border-[rgba(72,72,72,0.1)] pb-4">
                      <h3 className="text-[12px] font-bold uppercase leading-[1.33] tracking-[0.2em] text-white">Popular Now</h3>
                    </div>
                    <div className="flex flex-col gap-8">
                      {trending.map((item) => (
                        <a key={item.n} href="#" className="flex flex-col gap-2">
                          <span className="text-[12px] font-normal leading-[1.33] text-[#ABABAB]">{item.n}</span>
                          <span className="whitespace-pre-line text-[16px] font-bold leading-[1.25] text-white">{item.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 border-l-4 border-[#AFA2FF] bg-[#191919] p-[32px]">
                    <h3 className="whitespace-pre-line text-[20px] font-bold leading-[1.25] text-white">
                      Need a custom technical{'\n'}roadmap?
                    </h3>
                    <p className="pb-2 text-[14px] font-normal leading-[1.4285714285714286em] text-[#ABABAB]">
                      We partner with venture-backed{'\n'}teams to build the future.
                    </p>
                    <Link
                      to="/partnership"
                      className="flex w-full items-center justify-center bg-[#AFA2FF] py-3 text-[14px] font-bold leading-[1.4285714285714286em] tracking-[-0.025em] text-black"
                    >
                      Partner With Us
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </main>

      <PartnershipFooter />
    </>
  )
}
