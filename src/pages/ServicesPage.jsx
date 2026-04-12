import { Link } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { PartnershipFooter } from '../components/PartnershipFooter'
import { PageContent } from '../components/PageContent'
import { ServiceSmallCard } from '../components/ServiceSmallCard'
import { AISaaSServiceCard } from '../components/AISaaSServiceCard'

export default function ServicesPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-[1280px] bg-[#0E0E0E] text-white">
        <SiteHeader />

        <PageContent>
          {/* Hero */}
          <section>
            <div className="mx-auto flex max-w-[1216px] flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
              <div className="flex min-w-0 max-w-full flex-col gap-6 lg:max-w-[672px]">
                <p className="text-[16px] font-semibold uppercase leading-[1.5] tracking-[0.2em] text-[#AFA2FF]">OUR EXPERTISE</p>
                <h1 className="whitespace-pre-line text-[56px] font-bold leading-none tracking-[-0.05em] sm:text-[72px] lg:text-[96px]">
                  {`Precision\nEngineering\nFor High-Growth\nLabs.`}
                </h1>
                <div className="max-w-[672px] pt-2">
                  <p className="max-w-[609px] text-[24px] font-normal leading-[1.3333333333333333] text-[#ABABAB]">
                    We partner with ambitious founders to build technical foundations that scale. From initial prototype to global
                    infrastructure.
                  </p>
                </div>
              </div>
              <div className="relative mx-auto flex h-[373.33px] w-full max-w-[373.33px] shrink-0 justify-end lg:mx-0">
                <div className="relative h-full w-full overflow-hidden rounded-lg bg-[rgba(38,38,38,0.4)] backdrop-blur-[20px]">
                  <img
                    src="/figma/services/hero-glass-56586a.png"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(116, 89, 247, 1) 0%, rgba(175, 162, 255, 1) 100%)',
                      opacity: 0.1,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Bento grid */}
          <section>
            <div className="mx-auto flex w-full max-w-[1216px] flex-col gap-8 lg:gap-0">
              <div className="flex flex-col lg:flex-row lg:items-stretch">
                <div className="w-full shrink-0 overflow-hidden rounded-lg border border-[rgba(72,72,72,0.1)] lg:w-[832px] lg:rounded-r-none lg:border-r-0">
                  <AISaaSServiceCard />
                </div>
                <div className="w-full shrink-0 overflow-hidden rounded-lg border border-[rgba(72,72,72,0.1)] lg:w-[384px] lg:rounded-l-none lg:border-l-0">
                  <ServiceSmallCard
                    mvpLayout
                    variant="mvp"
                    title="MVP Development"
                    description={
                      'Zero to One in weeks, not months. We\nbuild battle-tested prototypes designed\nfor rapid market feedback.'
                    }
                    footerLabel="Ideal for"
                    footerValue="Pre-seed & Seed Stage Startups"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-8 lg:flex-row lg:gap-8">
                <div className="w-full lg:w-[384px] lg:shrink-0">
                  <ServiceSmallCard
                    variant="saas"
                    title="SaaS Scaling"
                    description={
                      'Optimization for the next 100k users.\nInfrastructure audits, performance\ntuning, and feature expansion.'
                    }
                    footerLabel="Capabilities"
                    footerValue="AWS/GCP, Kubernetes, Auto-scaling"
                  />
                </div>
                <div className="w-full lg:w-[384px] lg:shrink-0">
                  <ServiceSmallCard
                    variant="crm"
                    title="CRM/ERP Systems"
                    description={
                      'Custom internal tools designed for\noperational excellence. No generic\nplugins, just precision code.'
                    }
                    footerLabel="Focus"
                    footerValue="Workflow Automation & Data Intelligence"
                  />
                </div>
                <div className="w-full lg:w-[384px] lg:shrink-0">
                  <ServiceSmallCard
                    variant="mobile"
                    title="Mobile Apps"
                    description={
                      'High-performance iOS and Android\napplications with native-feel\nexperiences and smooth interactions.'
                    }
                    footerLabel="Tech Stack"
                    footerValue="React Native, Flutter, Swift"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Consultative */}
          <section>
            <div className="mx-auto w-full max-w-[1216px] overflow-hidden rounded-lg bg-[rgba(38,38,38,0.4)] backdrop-blur-[20px]">
              <div className="relative flex flex-col gap-10 px-6 py-16 sm:px-12 lg:flex-row lg:items-center lg:gap-16 lg:px-20 lg:pb-20 lg:pt-[112px]">
                <div
                  className="pointer-events-none absolute h-[320px] w-[320px] rounded-full bg-[rgba(116,89,247,0.2)] blur-[120px] max-lg:left-1/2 max-lg:top-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 lg:-left-20 lg:top-[284px]"
                  aria-hidden
                />
                <div className="relative z-[1] flex flex-1 flex-col gap-6">
                  <h2 className="whitespace-pre-line text-[40px] font-bold leading-none tracking-[-0.05em] sm:text-[44px] lg:text-[48px]">
                    {`Built for the\nStartup Lifecycle.`}
                  </h2>
                  <p className="max-w-[560px] text-[18px] font-normal leading-[1.625] text-[#ABABAB]">
                    We don&apos;t just ship code; we consult on product-market fit, technical debt mitigation, and scalable
                    architecture. We are your fractional CTO and engineering team.
                  </p>
                  <div className="relative min-h-0 w-full lg:h-[100px]">
                    <div className="flex flex-wrap gap-3 lg:absolute lg:inset-0 lg:block">
                      <span className="inline-flex h-[34px] items-center rounded-[12px] border border-[rgba(72,72,72,0.2)] bg-[#262626] px-4 py-2 text-[12px] font-bold uppercase leading-[1.3333333333333333] tracking-[0.1em] text-white lg:absolute lg:left-0 lg:top-0">
                        Strategy First
                      </span>
                      <span className="inline-flex h-[34px] items-center rounded-[12px] border border-[rgba(72,72,72,0.2)] bg-[#262626] px-4 py-2 text-[12px] font-bold uppercase leading-[1.3333333333333333] tracking-[0.1em] text-white lg:absolute lg:left-[168px] lg:top-0">
                        Rapid Execution
                      </span>
                      <span className="inline-flex h-[34px] items-center rounded-[12px] border border-[rgba(72,72,72,0.2)] bg-[#262626] px-4 py-2 text-[12px] font-bold uppercase leading-[1.3333333333333333] tracking-[0.1em] text-white lg:absolute lg:left-0 lg:top-[50px]">
                        Long-term Partnership
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative z-[1] flex w-full flex-1 flex-col lg:max-w-none">
                  <div className="mt-4 aspect-square w-full overflow-hidden rounded">
                    <img
                      src="/figma/services/consult-1-56586a.png"
                      alt=""
                      className="h-[240px] w-full object-cover sm:h-full sm:min-h-[240px]"
                    />
                  </div>
                  {/* <div className="pt-8">
                    <div className="overflow-hidden rounded">
                      <img src="/figma/services/consult-2-56586a.png" alt="" className="w-full object-cover" />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section>
            <div className="mx-auto flex w-full max-w-[1216px] flex-col items-center gap-8 rounded-lg border border-[rgba(72,72,72,0.1)] bg-[#131313] px-8 py-16 sm:px-16 sm:pb-16 sm:pt-24">
              <h2 className="w-full text-center text-[40px] font-bold leading-none tracking-[-0.05em] sm:text-[44px] lg:text-[48px]">
                Ready to build the future?
              </h2>
              <p className="max-w-[672px] text-center text-[20px] font-normal leading-[1.4] text-[#ABABAB]">
                Let&apos;s discuss your project roadmap. Whether you&apos;re starting from scratch or scaling to millions.
              </p>
              <div className="flex w-full flex-col items-center justify-center gap-6 pt-4 sm:flex-row sm:gap-6">
                <Link
                  to="/contact"
                  className="rounded-[6px] px-10 py-[17px] text-[16px] font-bold leading-[1.5] text-black"
                  style={{
                    background: 'linear-gradient(169deg, rgba(116, 89, 247, 1) 0%, rgba(175, 162, 255, 1) 100%)',
                  }}
                >
                  Book Your Strategy Session
                </Link>
                <Link
                  to="/case-studies"
                  className="rounded-[6px] border border-[rgba(72,72,72,0.15)] px-10 py-4 text-[16px] font-bold leading-[1.5] text-[#AFA2FF]"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </section>
        </PageContent>

        <PartnershipFooter />
      </main>
    </>
  )
}
