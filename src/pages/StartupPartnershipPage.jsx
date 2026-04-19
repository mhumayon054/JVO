import { MotionConfig, motion } from 'framer-motion'
import {
  EASE,
  fadeUp,
  hoverCardBorderGlow,
  hoverMediaKen,
  staggerContainer,
  viewportOnce,
} from '../components/home/homeMotion'
import { SiteHeader } from '../components/SiteHeader'
import { PartnershipFooter } from '../components/PartnershipFooter'

function ListDot() {
  return <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#AFA2FF]" />
}

const testimonials = [
  {
    quote:
      "JVO Labs didn't just write code; they transformed our entire AI strategy. Their team feels like a core part of our mission.",
    name: 'David Chen',
    role: 'Founder, NeuralStream',
  },
  {
    quote: 'The speed of execution is unmatched. We launched our MVP three weeks ahead of schedule with zero technical debt.',
    name: 'Sarah Jenkins',
    role: 'CTO, FinFlow',
  },
  {
    quote: 'Finding senior talent is hard. JVO provided a dedicated team of specialists who were operational from day one.',
    name: 'Marc Aubert',
    role: 'VP Engineering, Zenith AI',
  },
]

export default function StartupPartnershipPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-[1280px] bg-[#0E0E0E] text-white">
        <SiteHeader />

        <MotionConfig reducedMotion="user">
          <div className="flex flex-col gap-24 pb-16 pt-[24px] lg:gap-[160px]">
            {/* Hero */}
            <section className="px-4 sm:px-8">
              <motion.div
                className="mx-auto grid max-w-[1216px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12"
                variants={staggerContainer(0.08, 0.14)}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="flex min-w-0 flex-col gap-6" variants={staggerContainer(0.04, 0.1)}>
                  <motion.div variants={fadeUp(14)} className="w-fit rounded-sm bg-[#262626] px-3 py-1">
                    <span className="text-[10px] font-bold uppercase leading-[1.5] tracking-[0.2em] text-[#AFA2FF]">
                      Engineering Alpha
                    </span>
                  </motion.div>
                  <motion.h1
                    variants={fadeUp(22)}
                    className="whitespace-pre-line text-[56px] font-bold leading-none tracking-[-0.04em] sm:text-[72px] lg:text-[96px]"
                  >
                    FORGE YOUR{'\n'}FUTURE.
                  </motion.h1>
                  <motion.p
                    variants={fadeUp(18)}
                    className="max-w-[672px] text-[18px] font-light leading-[1.625] text-[#ABABAB] sm:text-[20px]"
                  >
                    We don&apos;t just build features; we build companies. JVO Labs partners with visionary founders to engineer the
                    high-performance AI infrastructure of tomorrow.
                  </motion.p>
                </motion.div>
                <motion.div
                  variants={fadeUp(26)}
                  className="relative mx-auto aspect-square max-w-[373px] overflow-hidden rounded-lg border border-[rgba(72,72,72,0.15)] bg-[#131313] lg:mx-0 lg:max-w-none lg:justify-self-end"
                  {...hoverCardBorderGlow}
                >
                  <motion.img
                    src="/figma/partnership/hero-photo-56586a.png"
                    alt=""
                    className="h-full w-full object-cover opacity-60"
                    {...hoverMediaKen}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(0deg, #0E0E0E 0%, rgba(14, 14, 14, 0) 50%, rgba(14, 14, 14, 0) 100%)',
                    }}
                  />
                </motion.div>
              </motion.div>
            </section>

            {/* Partnership models */}
            <section className="px-4 sm:px-8">
              <motion.div
                className="mx-auto flex max-w-[1216px] flex-col gap-20 lg:gap-[80px]"
                variants={staggerContainer(0.1, 0.14)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <motion.div variants={fadeUp(18)}>
                  <h2 className="text-[28px] font-bold leading-[1.11] tracking-[-0.025em] sm:text-[36px]">Partnership Models</h2>
                  <div className="mt-4 h-1 w-24 bg-[#7459F7]" />
                </motion.div>

                {/* Model 01 */}
                <motion.article variants={fadeUp(22)} className="overflow-hidden rounded-lg bg-[#131313]">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col gap-6 p-8 sm:p-12">
                      <p className="text-[48px] font-bold leading-none text-[#7459F7]/20 sm:text-[60px]">01</p>
                      <h3 className="text-[28px] font-bold leading-[1.11] tracking-[-0.025em] sm:text-[36px]">
                        Product Development
                        <br />
                        Partnership
                      </h3>
                      <p className="text-[18px] leading-[1.625] text-[#ABABAB]">
                        End-to-end product engineering from ideation to global scale. We function as your technical co-founding team,
                        owning the roadmap and delivery.
                      </p>
                      <ul className="flex flex-col gap-4 pt-2">
                        {['Full-stack AI integration & model training', 'Rapid MVP development (4-8 weeks)', 'Scalable cloud architecture (AWS/GCP)'].map(
                          (t) => (
                            <li key={t} className="flex gap-3 text-[16px] leading-[1.5] text-white">
                              <ListDot />
                              {t}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div className="relative flex min-h-[200px] items-stretch overflow-hidden bg-[#262626] lg:min-h-[301px]">
                      <motion.img
                        src="/figma/partnership/model-product-176857.png"
                        alt=""
                        className="h-full w-full object-cover opacity-40"
                        {...hoverMediaKen}
                      />
                    </div>
                  </div>
                </motion.article>

                {/* Model 02 */}
                <motion.article variants={fadeUp(22)} className="overflow-hidden rounded-lg bg-[#131313]">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative order-2 flex min-h-[200px] items-stretch overflow-hidden bg-[#262626] lg:order-1 lg:min-h-[301px]">
                      <motion.img
                        src="/figma/partnership/model-teams-176857.png"
                        alt=""
                        className="h-full w-full object-cover opacity-40"
                        {...hoverMediaKen}
                      />
                    </div>
                    <div className="order-1 flex flex-col gap-6 p-8 sm:p-12 lg:order-2">
                      <p className="text-[48px] font-bold leading-none text-[#7459F7]/20 sm:text-[60px]">02</p>
                      <h3 className="text-[36px] font-bold leading-[1.11] tracking-[-0.025em]">Dedicated Teams</h3>
                      <p className="text-[18px] leading-[1.625] text-[#ABABAB]">
                        Augment your existing engineering force with senior AI engineers and product managers who integrate seamlessly into
                        your culture.
                      </p>
                      <ul className="flex flex-col gap-4 pt-2">
                        {[
                          'Vetted Senior Full-stack & ML Engineers',
                          'Zero-friction onboarding & Agile sync',
                          'Continuous performance optimization',
                        ].map((t) => (
                          <li key={t} className="flex gap-3 text-[16px] leading-[1.5] text-white">
                            <ListDot />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>

                {/* Model 03 */}
                <motion.article variants={fadeUp(22)} className="overflow-hidden rounded-lg bg-[#131313]">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col gap-6 p-8 sm:p-12">
                      <p className="text-[48px] font-bold leading-none text-[#7459F7]/20 sm:text-[60px]">03</p>
                      <h3 className="text-[36px] font-bold leading-[1.11] tracking-[-0.025em]">CTO-as-a-Service</h3>
                      <p className="text-[18px] leading-[1.625] text-[#ABABAB]">
                        High-level technical strategy for startups that need architectural guidance without the full-time executive overhead.
                      </p>
                      <div className="grid max-w-xl grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                        <div className="rounded-sm border border-[rgba(255,255,255,0.05)] bg-[#262626] p-4">
                          <p className="text-[12px] font-bold uppercase leading-[1.33] tracking-[0.1em] text-[#AFA2FF]">Strategy</p>
                          <p className="mt-1 text-[14px] leading-[1.43] text-white">Tech Stack Audit</p>
                        </div>
                        <div className="rounded-sm border border-[rgba(255,255,255,0.05)] bg-[#262626] p-4">
                          <p className="text-[12px] font-bold uppercase leading-[1.33] tracking-[0.1em] text-[#AFA2FF]">Growth</p>
                          <p className="mt-1 text-[14px] leading-[1.43] text-white">Scale Readiness</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex min-h-[200px] items-stretch overflow-hidden bg-[#262626] lg:min-h-[301px]">
                      <motion.img
                        src="/figma/partnership/model-advisory-176857.png"
                        alt=""
                        className="h-full w-full object-cover opacity-40"
                        {...hoverMediaKen}
                      />
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            </section>

            {/* Testimonials */}
            <section className="bg-[#131313] py-16 lg:py-32">
              <motion.div
                className="mx-auto flex max-w-[1216px] flex-col gap-12 px-4 sm:px-8 lg:gap-24"
                variants={staggerContainer(0.1, 0.14)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <motion.div className="flex flex-col gap-4 text-center" variants={fadeUp(18)}>
                  <h2 className="text-[36px] font-bold uppercase leading-none tracking-[-0.025em] text-white sm:text-[48px]">
                    Trusted by the best.
                  </h2>
                  <p className="text-[18px] leading-[1.56] text-[#ABABAB]">Real feedback from our scaling partners.</p>
                </motion.div>
                <motion.div
                  className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                  variants={staggerContainer(0.06, 0.1)}
                >
                  {testimonials.map((t) => (
                    <motion.article
                      key={t.name}
                      variants={fadeUp(20)}
                      className="flex min-h-[280px] flex-col justify-between rounded-lg border border-[rgba(72,72,72,0.1)] bg-[rgba(38,38,38,0.4)] p-8 backdrop-blur-[20px] sm:p-10"
                      {...hoverCardBorderGlow}
                    >
                      <p className="text-[18px] leading-[1.625] text-[#ABABAB]">{t.quote}</p>
                      <div className="mt-8 border-t border-transparent pt-2">
                        <p className="text-[16px] font-bold leading-[1.5] text-white">{t.name}</p>
                        <p className="mt-1 text-[12px] font-bold uppercase leading-[1.33] tracking-[0.1em] text-[#AFA2FF]">{t.role}</p>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </motion.div>
            </section>

            {/* CTA */}
            <section className="px-4 sm:px-8">
              <motion.div
                className="relative mx-auto max-w-[1216px] overflow-hidden rounded-2xl bg-[#7459F7] p-10 sm:p-16 lg:p-20"
                variants={staggerContainer(0.12, 0.14)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[45%] bg-white/[0.05] lg:block" />
                <div className="relative flex max-w-[672px] flex-col gap-8">
                  <motion.h2
                    variants={fadeUp(22)}
                    className="whitespace-pre-line text-[40px] font-bold leading-[1.25] tracking-[-0.05em] text-black sm:text-[52px] lg:text-[60px]"
                  >
                    READY TO{'\n'}ENGINEER YOUR EDGE?
                  </motion.h2>
                  <motion.p
                    variants={fadeUp(16)}
                    className="text-[18px] leading-[1.55] text-black/80 sm:text-[20px] sm:leading-[1.4]"
                  >
                    Schedule a 30-minute consultation with our engineering directors to discuss your partnership model.
                  </motion.p>
                  <motion.div variants={fadeUp(14)} className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-stretch">
                    <motion.button
                      type="button"
                      className="rounded-sm bg-black px-10 py-[18px] text-[16px] font-bold leading-[1.5] text-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.985 }}
                      transition={{ duration: 0.28, ease: EASE }}
                    >
                      Book Strategy Call
                    </motion.button>
                    <motion.button
                      type="button"
                      className="rounded-sm border-2 border-black px-10 py-4 text-[16px] font-bold leading-[1.5] text-black"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.985 }}
                      transition={{ duration: 0.28, ease: EASE }}
                    >
                      Download Partnership Deck
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </section>
          </div>
        </MotionConfig>
      </main>

      <PartnershipFooter />
    </>
  )
}
