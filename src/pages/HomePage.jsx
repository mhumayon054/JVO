import { Link } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { PageContent } from '../components/PageContent'
import { PartnershipFooter } from '../components/PartnershipFooter'

const stats = [
  { value: '50+', label: 'Startups Scaled' },
  { value: '$500M+', label: 'Funding Raised' },
  { value: '100+', label: 'Projects Delivered' },
]

const cards = [
  { title: 'Product Development', points: ['Web Apps', 'Cloud Systems', 'AI Products'] },
  { title: 'Dedicated Teams', points: ['Embedded Engineers', 'Project Squads', 'Tech Leadership'] },
  { title: 'MVP Launch', points: ['Rapid Builds', 'Validated Scope', 'Production Ready'] },
]

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1280px] bg-[#0E0E0E] text-white">
      <SiteHeader />

      <PageContent gapClass="gap-0">
      <section>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="pt-4">
            <h1 className="whitespace-pre-line text-[96px] leading-[1] font-bold tracking-[-0.04em] max-lg:text-[56px] max-md:text-[42px]">
              Build Your{'\n'}AI SaaS
            </h1>
            <p className="mt-6 max-w-[575px] text-[24px] leading-[1.333] text-[#ABABAB] max-md:text-[18px]">
              Precision engineering for the AI era. We partner with founders to architect, build, and scale high-performance intelligence platforms.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/build-squad"
                className="rounded-[6px] bg-gradient-to-r from-[#7459F7] to-[#AFA2FF] px-8 py-5 text-[18px] font-bold text-black"
              >
                Build Your Squad
              </Link>
              <Link
                to="/case-studies"
                className="rounded-[6px] border border-[rgba(72,72,72,0.15)] px-8 py-5 text-[18px] font-bold text-[#AFA2FF]"
              >
                View Our Work
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-8 h-[360px] w-[360px] rounded-full bg-[#7459F7] opacity-20 blur-[120px]" />
            <img
              className="relative h-[460px] w-full rounded-2xl border border-[rgba(72,72,72,0.15)] object-cover max-md:h-[320px]"
              src="/figma/hero-chip.png"
              alt="AI processor visual"
            />
          </div>
        </div>
      </section>

      <section className="mt-12 bg-[#131313] py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-[36px] font-bold leading-[1.11] text-[#AFA2FF]">{s.value}</p>
              <p className="mt-2 text-[14px] font-normal uppercase tracking-[0.1em] text-[#ABABAB]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <p className="inline-block rounded-xl border border-[rgba(72,72,72,0.15)] px-4 py-1 text-[12px] font-bold uppercase tracking-[0.1em] text-[#AFA2FF]">
          AI-Powered
        </p>
        <h2 className="mt-4 text-[48px] font-bold tracking-[-0.025em] max-md:text-[32px]">AI Strategy Builder</h2>
        <div className="mt-4 grid grid-cols-1 rounded-2xl border border-[rgba(72,72,72,0.15)] bg-[rgba(72,72,72,0.2)] lg:grid-cols-2">
          <div className="bg-[#131313] p-12 max-md:p-8">
            <p className="text-[16px] leading-[1.5] text-[#ABABAB]">
              Describe your vision to receive a technical roadmap and high-level architecture proposal instantly.
            </p>
            <div className="mt-8 space-y-6">
              <div>
                <p className="mb-2 text-[14px] uppercase tracking-[0.1em] text-[#AFA2FF]">What are you trying to build?</p>
                <div className="rounded-md border border-transparent bg-[#191919] px-4 py-4 pb-16 text-[16px] text-[#757575]">
                  e.g., A multi-tenant LLM platform for automated legal document analysis...
                </div>
              </div>
              <div>
                <p className="mb-2 text-[14px] uppercase tracking-[0.1em] text-[#AFA2FF]">Work Email</p>
                <div className="rounded-md bg-[#191919] px-4 py-[18px] text-[16px] text-[#757575]">alex@startup.io</div>
              </div>
              <button className="w-full rounded-md bg-gradient-to-r from-[#7459F7] to-[#AFA2FF] py-5 text-[18px] font-bold text-black">
                Generate Strategy
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center p-12 max-md:p-8">
            <div className="w-full rounded-xl border border-[rgba(72,72,72,0.15)] bg-[#0F0F0F] p-12 text-center text-[#757575]">
              Your AI architecture blueprint will appear here once generated.
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-center text-[48px] font-bold tracking-[-0.025em] max-md:text-[32px]">Core Capabilities</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-[rgba(72,72,72,0.15)] bg-[rgba(72,72,72,0.2)] p-8">
              <div className="h-8 w-8 rounded bg-[#7459F7]" />
              <h3 className="mt-6 text-[24px] font-bold">{card.title}</h3>
              <ul className="mt-6 space-y-2 text-[14px] text-[#ABABAB]">
                {card.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#AFA2FF]" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-center text-[36px] font-bold tracking-[-0.025em]">Engineering Methodology</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {['Discovery Call', 'Architecture Match', 'Execution Sprint', 'Scale & Evolve'].map((step, i) => (
            <div key={step} className="rounded-xl border border-[rgba(72,72,72,0.15)] bg-[rgba(72,72,72,0.2)] p-6">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-[#131313] text-[24px] font-bold text-[#AFA2FF]">
                {`0${i + 1}`}
              </div>
              <h3 className="mt-4 text-[20px] font-bold">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-center text-[36px] font-bold tracking-[-0.025em]">The Precision Bench</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[['/figma/engineer-1.png', 'AI Engineer'], ['/figma/engineer-2.png', 'Tech Lead'], ['/figma/engineer-3.png', 'Cloud Architect']].map(
            ([src, role], idx) => (
              <article key={role} className="rounded-2xl border border-[rgba(72,72,72,0.15)] bg-[rgba(72,72,72,0.2)] p-6">
                <img src={src} className="h-16 w-16 rounded-lg object-cover" alt={role} />
                <h3 className="mt-4 text-[24px] font-bold text-white">{['Ari Voss', 'Mira Chen', 'Noah Kim'][idx]}</h3>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#AFA2FF]">{role}</p>
                <p className="mt-4 text-[14px] leading-[1.42] text-[#ABABAB]">
                  Battle-tested specialist with production experience in high-stakes AI systems.
                </p>
              </article>
            ),
          )}
        </div>
      </section>

      <section className="bg-[#131313] py-16">
        <h2 className="text-center text-[48px] font-bold tracking-[-0.025em] max-md:text-[32px]">Industries We Serve</h2>
        <p className="mx-auto mt-4 max-w-[860px] text-center text-[18px] leading-[1.55] text-[#ABABAB]">
          Specialized intelligence engineering for mission-critical sectors.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {['FinTech', 'HealthTech', 'Enterprise AI', 'Cybersecurity', 'Logistics'].map((name) => (
            <article key={name} className="rounded-2xl border border-[rgba(72,72,72,0.15)] bg-[rgba(72,72,72,0.2)] p-5 backdrop-blur-[20px]">
              <div className="h-7 w-7 rounded bg-[#7459F7]" />
              <h3 className="mt-4 text-[20px] font-bold">{name}</h3>
              <p className="mt-3 text-[14px] leading-[1.42] text-[#ABABAB]">
                Tailored solutions with precision architecture and regulatory-grade engineering.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-center text-[48px] font-bold tracking-[-0.025em] max-md:text-[32px]">A Message from Our Founders</h2>
        <p className="mx-auto mt-4 max-w-[820px] text-center text-[18px] leading-[1.55] text-[#ABABAB]">
          Our commitment to engineering excellence is what drives every project we touch. Hear directly from our team about the JVO Labs philosophy.
        </p>
        <div className="relative mx-auto mt-10 max-w-[1022px] overflow-hidden rounded-3xl border border-[rgba(72,72,72,0.15)]">
          <img src="/figma/founders.png" className="h-[574px] w-full object-cover opacity-60 max-md:h-[320px]" alt="Founders message" />
          <button className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(72,72,72,0.15)] bg-[rgba(19,19,19,0.7)] text-[#AFA2FF]">
            ▶
          </button>
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-[36px] font-bold tracking-[-0.025em]">Success Stories</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-[rgba(72,72,72,0.15)]">
            <img src="/figma/story-1.png" className="h-[363px] w-full object-cover opacity-60 max-md:h-[240px]" alt="FinTech AI Advisor" />
          </article>
          <article className="overflow-hidden rounded-2xl border border-[rgba(72,72,72,0.15)]">
            <img src="/figma/story-2.png" className="h-[363px] w-full object-cover opacity-60 max-md:h-[240px]" alt="Logistics Neural Hub" />
          </article>
        </div>
      </section>

      <section className="py-16">
        <p className="mx-auto inline-block rounded-xl border border-[rgba(72,72,72,0.15)] px-4 py-1 text-[12px] font-bold uppercase tracking-[0.1em] text-[#AFA2FF]">
          Inquiry
        </p>
        <h2 className="mt-4 text-center text-[36px] font-bold tracking-[-0.025em]">Common Questions</h2>
        <div className="mx-auto mt-8 max-w-[1216px] space-y-3">
          {[
            'How long is an average MVP build?',
            'Do you provide post-launch support?',
            'Can you integrate with our existing team?',
            'What does engagement pricing look like?',
          ].map((q) => (
            <details key={q} className="rounded-lg border border-[rgba(72,72,72,0.15)] bg-[#0E0E0E] px-6 py-5">
              <summary className="cursor-pointer list-none text-[20px] font-bold text-white">{q}</summary>
            </details>
          ))}
        </div>
      </section>

      <section className="pb-24 pt-16 text-center">
        <h2 className="mx-auto max-w-[900px] whitespace-pre-line text-[72px] leading-[1] font-bold tracking-[-0.025em] max-md:text-[40px]">
          Build Your Engineering{'\n'}Team Without Hiring{'\n'}Stress.
        </h2>
        <p className="mx-auto mt-6 max-w-[760px] text-[18px] leading-[1.55] text-[#ABABAB]">
          Stop the endless search for senior talent. Access a battle-tested studio that delivers from day one.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-block rounded-[6px] bg-gradient-to-r from-[#7459F7] to-[#AFA2FF] px-10 py-5 text-[18px] font-bold text-black"
        >
          Book Discovery Call
        </Link>
      </section>
      </PageContent>

      <PartnershipFooter />
    </main>
  )
}
