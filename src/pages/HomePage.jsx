import { Link } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { PageContent } from '../components/PageContent'
import { PartnershipFooter } from '../components/PartnershipFooter'
import { CoreCapabilitiesCards } from '../components/CoreCapabilitiesCards'
import { HomeMethodologySection } from '../components/home/HomeMethodologySection'
import { HomePrecisionBench } from '../components/home/HomePrecisionBench'
import { HomeIndustriesSection } from '../components/home/HomeIndustriesSection'
import { HomeSuccessStoriesSection } from '../components/home/HomeSuccessStoriesSection'
import { HomeFaqSection } from '../components/home/HomeFaqSection'
import { HomeStatsSection } from '../components/home/HomeStatsSection'

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

      <HomeStatsSection />

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

      <CoreCapabilitiesCards />

      <HomeMethodologySection />

      <HomePrecisionBench />

      <HomeIndustriesSection />

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

      <HomeSuccessStoriesSection />

      <HomeFaqSection />

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
