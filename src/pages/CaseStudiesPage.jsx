import { Link } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { PartnershipFooter } from '../components/PartnershipFooter'
import { PageContent } from '../components/PageContent'
import { CaseStudyAetherSection } from '../components/CaseStudyAetherSection'

export default function CaseStudiesPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-[1280px] bg-[#0E0E0E] text-white">
        <SiteHeader />

        <PageContent>
          <section className="w-full max-w-[1280px]">
            <div className="mx-auto w-full max-w-[1216px]">
              <div className="flex max-w-[672px] flex-col gap-[24px]">
                <p
                  className="text-left font-semibold uppercase text-[#AFA2FF]"
                  style={{ fontSize: '16px', lineHeight: '1.5em', letterSpacing: '0.2em', fontWeight: 600 }}
                >
                  CASE STUDIES
                </p>
                <h1 className="whitespace-pre-line text-left text-[56px] font-bold leading-[1em] tracking-[-0.05em] text-white sm:text-[72px] lg:text-[96px]">
                  {`Case\nStudies.`}
                </h1>
                <div className="max-w-[672px] pt-[8px]">
                  <p className="text-left text-[24px] font-normal leading-[1.3333333333333333em] text-[#ABABAB]">
                    Real outcomes from partnerships where precision engineering, AI systems, and product velocity had to land
                    together.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full max-w-[1280px]">
            <div className="mx-auto flex w-full max-w-[1216px] flex-col gap-[64px]">
              <h2
                className="text-left text-white"
                style={{ fontSize: '36px', lineHeight: '1.1111111111111112em', fontWeight: 700, letterSpacing: '-0.025em' }}
              >
                Success Stories
              </h2>
              <CaseStudyAetherSection />
            </div>
          </section>

          <section className="relative w-full max-w-[1280px] overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                background: 'linear-gradient(150deg, rgba(116, 89, 247, 1) 0%, rgba(175, 162, 255, 1) 100%)',
              }}
              aria-hidden
            />
            <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center gap-[32px] py-[64px] sm:py-[96px] lg:px-[192px] lg:py-[160px]">
              <h2 className="max-w-[758px] whitespace-pre-line text-center text-[40px] font-bold leading-[1em] tracking-[-0.025em] text-white sm:text-[56px] lg:text-[72px]">
                {`Build Your Engineering\nTeam Without Hiring\nStress.`}
              </h2>
              <div className="pb-[16px]">
                <p className="max-w-[882px] text-center text-[20px] font-normal leading-[1.4em] text-[#ABABAB]">
                  Stop the endless search for senior talent. Access a battle-tested studio that delivers from day one.
                </p>
              </div>
              <Link
                to="/contact"
                className="rounded-[6px] text-center text-[20px] font-bold leading-[1.4em]"
                style={{
                  padding: '20px 48px',
                  background: 'linear-gradient(168deg, rgba(116, 89, 247, 1) 0%, rgba(175, 162, 255, 1) 100%)',
                  color: '#000000',
                }}
              >
                Start Your Project Now
              </Link>
            </div>
          </section>
        </PageContent>

        <PartnershipFooter />
      </main>
    </>
  )
}
