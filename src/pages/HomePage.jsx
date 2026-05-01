import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
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
import { HomeHeroVisual } from '../components/home/HomeHeroVisual'
import { MotionLink, fadeUp, staggerContainer, viewportOnce, EASE } from '../components/home/homeMotion'


const FOUNDER_VIDEO = {
  thumbnail: '/figma/founder_thumbnail.png',
  videoSrc: '/videos/founder-message.mp4',
  title: 'A Message from Our Founders',
  label: "Founder’s Message",
}

function FounderVideoModal({ video, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-xl sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: EASE }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <motion.div
        className="relative w-full max-w-[1120px] overflow-hidden rounded-[28px] border border-white/10 bg-[#101010] shadow-[0_35px_90px_rgba(0,0,0,0.7)]"
        initial={{ y: 28, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 18, scale: 0.97, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute right-4 top-4 z-30 flex items-center gap-2">
          <span className="hidden rounded-full border border-white/10 bg-black/35 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#AFA2FF] backdrop-blur-md sm:inline-flex">
            {video.label}
          </span>
          <button
            type="button"
            aria-label="Close founder video"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/45 text-xl leading-none text-white backdrop-blur-md transition hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/25"
          >
            ×
          </button>
        </div>

        <div className="relative flex max-h-[82vh] min-h-[280px] w-full items-center justify-center bg-[#070707] p-2 sm:min-h-[420px] sm:p-4">
          <video
            src={video.videoSrc}
            poster={video.thumbnail}
            className="max-h-[78vh] w-full rounded-2xl object-contain"
            controls
            autoPlay
            playsInline
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function HomePage() {
  const [founderVideoOpen, setFounderVideoOpen] = useState(false)

  return (
    <main className="mx-auto w-full max-w-[1280px] bg-[#0E0E0E] text-white">
      <SiteHeader />

      <MotionConfig reducedMotion="user">
        <PageContent gapClass="gap-0">
          <section>
            <motion.div
              className="grid grid-cols-1 gap-8 lg:grid-cols-2"
              variants={staggerContainer(0.1, 0.17)}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="pt-4" variants={staggerContainer(0.04, 0.1)}>
                <motion.h1
                  variants={fadeUp(22)}
                  className="whitespace-pre-line text-[96px] leading-[1] font-bold tracking-[-0.04em] max-lg:text-[56px] max-md:text-[42px]"
                >
                  Build Your{'\n'}AI SaaS
                </motion.h1>
                <motion.p
                  variants={fadeUp(18)}
                  className="mt-6 max-w-[575px] text-[24px] leading-[1.333] text-[#ABABAB] max-md:text-[18px]"
                >
                  Precision engineering for the AI era. We partner with founders to architect, build, and scale
                  high-performance intelligence platforms.
                </motion.p>
                <motion.div className="mt-8 flex flex-wrap gap-4" variants={staggerContainer(0, 0.08)}>
                  <MotionLink
                    variants={fadeUp(14)}
                    to="/build-squad"
                    className="rounded-[6px] bg-gradient-to-r from-[#7459F7] to-[#AFA2FF] px-8 py-5 text-[18px] font-bold text-black"
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.16, ease: EASE }}
                  >
                    Build Your Squad
                  </MotionLink>
                  <MotionLink
                    variants={fadeUp(14)}
                    to="/case-studies"
                    className="rounded-[6px] border border-[rgba(72,72,72,0.15)] px-8 py-5 text-[18px] font-bold text-[#AFA2FF]"
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.16, ease: EASE }}
                  >
                    View Our Work
                  </MotionLink>
                </motion.div>
              </motion.div>
              <motion.div variants={fadeUp(28)} className="relative">
                <HomeHeroVisual />
              </motion.div>
            </motion.div>
          </section>

          <HomeStatsSection />

          <motion.section
            className="py-16"
            variants={staggerContainer(0.08, 0.11)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p
              variants={fadeUp(14)}
              className="inline-block rounded-xl border border-[rgba(72,72,72,0.15)] px-4 py-1 text-[12px] font-bold uppercase tracking-[0.1em] text-[#AFA2FF]"
            >
              AI-Powered
            </motion.p>
            <motion.h2
              variants={fadeUp(18)}
              className="mt-4 text-[48px] font-bold tracking-[-0.025em] max-md:text-[32px]"
            >
              AI Strategy Builder
            </motion.h2>
            <motion.div
              variants={fadeUp(22)}
              className="mt-4 grid grid-cols-1 rounded-2xl border border-[rgba(72,72,72,0.15)] bg-[rgba(72,72,72,0.2)] lg:grid-cols-2"
            >
              <div className="bg-[#131313] p-12 max-md:p-8">
                <p className="text-[16px] leading-[1.5] text-[#ABABAB]">
                  Describe your vision to receive a technical roadmap and high-level architecture proposal instantly.
                </p>
                <div className="mt-8 space-y-6">
                  <div>
                    <p className="mb-2 text-[14px] uppercase tracking-[0.1em] text-[#AFA2FF]">
                      What are you trying to build?
                    </p>
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
            </motion.div>
          </motion.section>

          <CoreCapabilitiesCards />

          <HomeMethodologySection />

          <HomePrecisionBench />

          <HomeIndustriesSection />

          <motion.section
            className="py-16"
            variants={staggerContainer(0.1, 0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h2
              variants={fadeUp(18)}
              className="text-center text-[48px] font-bold tracking-[-0.025em] max-md:text-[32px]"
            >
              A Message from Our Founders
            </motion.h2>
            <motion.p
              variants={fadeUp(16)}
              className="mx-auto mt-4 max-w-[820px] text-center text-[18px] leading-[1.55] text-[#ABABAB]"
            >
              Our commitment to engineering excellence is what drives every project we touch. Hear directly from our team
              about the JVO Labs philosophy.
            </motion.p>
            <motion.button
              type="button"
              variants={fadeUp(26)}
              className="group relative mx-auto mt-10 block w-full max-w-[1022px] overflow-hidden rounded-3xl border border-[rgba(72,72,72,0.15)] text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7459F7]"
              whileHover={{ borderColor: 'rgba(116, 89, 247, 0.26)', transition: { duration: 0.35, ease: EASE } }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setFounderVideoOpen(true)}
              aria-label="Open founder message video"
            >
              <motion.img
                src={FOUNDER_VIDEO.thumbnail}
                className="h-[574px] w-full object-cover opacity-75 transition duration-500 group-hover:opacity-90 max-md:h-[320px]"
                alt="Founder message thumbnail"
                whileHover={{ scale: 1.025 }}
                transition={{ duration: 0.55, ease: EASE }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/78 via-[#0E0E0E]/18 to-transparent" aria-hidden />
              <div className="absolute inset-0 bg-[#7459F7]/0 transition duration-500 group-hover:bg-[#7459F7]/8" aria-hidden />
              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[rgba(19,19,19,0.72)] text-[#AFA2FF] shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-md transition duration-300 group-hover:scale-105 group-hover:border-[#8B5CF6]/45 group-hover:bg-[#8B5CF6]/20 max-sm:h-14 max-sm:w-14">
                <span className="ml-1 text-[26px] leading-none" aria-hidden>
                  ▶
                </span>
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#AFA2FF]">{FOUNDER_VIDEO.label}</p>
                <p className="mt-2 max-w-[560px] text-[20px] font-bold leading-[1.25] tracking-[-0.02em] text-white md:text-[24px]">
                  Watch the founder message
                </p>
              </div>
            </motion.button>
          </motion.section>

          <HomeSuccessStoriesSection />

          <HomeFaqSection />

          <motion.section
            className="pb-24 pt-16 text-center"
            variants={staggerContainer(0.12, 0.14)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h2
              variants={fadeUp(22)}
              className="mx-auto max-w-[900px] whitespace-pre-line text-[72px] leading-[1] font-bold tracking-[-0.025em] max-md:text-[40px]"
            >
              Build Your Engineering{'\n'}Team Without Hiring{'\n'}Stress.
            </motion.h2>
            <motion.p
              variants={fadeUp(16)}
              className="mx-auto mt-6 max-w-[760px] text-[18px] leading-[1.55] text-[#ABABAB]"
            >
              Stop the endless search for senior talent. Access a battle-tested studio that delivers from day one.
            </motion.p>
            <motion.div variants={fadeUp(14)} className="mt-8">
              <MotionLink
                to="/contact"
                className="inline-block rounded-[6px] bg-gradient-to-r from-[#7459F7] to-[#AFA2FF] px-10 py-5 text-[18px] font-bold text-black"
                whileHover={{ y: -2, boxShadow: '0 18px 40px -16px rgba(116, 89, 247, 0.35)' }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                Book Discovery Call
              </MotionLink>
            </motion.div>
          </motion.section>
        </PageContent>
      </MotionConfig>

      <AnimatePresence>
        {founderVideoOpen && <FounderVideoModal video={FOUNDER_VIDEO} onClose={() => setFounderVideoOpen(false)} />}
      </AnimatePresence>

      <PartnershipFooter />
    </main>
  )
}
