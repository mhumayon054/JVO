import { useState } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import {
  EASE,
  fadeUp,
  hoverCardBorderGlow,
  hoverMediaKen,
  hoverPrimaryCta,
  staggerContainer,
} from '../components/home/homeMotion'
import { SiteHeader } from '../components/SiteHeader'
import { PartnershipFooter } from '../components/PartnershipFooter'

function IconBolt() {
  return (
    <svg className="h-5 w-[18px] shrink-0 text-[#AFA2FF]" viewBox="0 0 18 20" fill="currentColor" aria-hidden>
      <path d="M11.5 0H6.5L4 11h4l-2 9 9-12H9l2.5-8z" />
    </svg>
  )
}

function IconCalendar() {
  return (
    <svg className="h-10 w-9 shrink-0 text-[#757575]" viewBox="0 0 36 40" fill="none" aria-hidden>
      <rect x="4" y="8" width="28" height="28" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M4 16h28M12 4v6M24 4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconArrowUpRight() {
  return (
    <svg className="h-2.5 w-2.5 shrink-0 text-black" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M1 9 9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconPin() {
  return (
    <svg className="h-[18px] w-5 shrink-0 text-[#AFA2FF]" viewBox="0 0 20 18" fill="none" aria-hidden>
      <path
        d="M10 17s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="7" r="2" fill="currentColor" />
    </svg>
  )
}

const budgetOptions = [
  { value: '10k-25k', label: '10k - 25k' },
  { value: '25k-100k', label: '25k - 100k' },
  { value: '100k-500k', label: '100k - 500k' },
  { value: '500k+', label: '500k+' },
]

const inputBase =
  'w-full border-0 border-b-2 border-[rgba(72,72,72,0.3)] bg-[#131313] px-[12px] text-[16px] text-white outline-none transition-colors placeholder:text-[#757575] focus-visible:border-[#AFA2FF]'

export default function ContactPage() {
  const [budget, setBudget] = useState('10k-25k')

  return (
    <>
      <main className="mx-auto w-full max-w-[1280px] bg-[#0E0E0E] text-white">
        <SiteHeader />

        <MotionConfig reducedMotion="user">
          <div className="px-4 pb-16 pt-8 sm:px-8">
            <motion.div
              className="mx-auto flex max-w-[1216px] flex-col gap-12 lg:flex-row lg:gap-[56px]"
              variants={staggerContainer(0.1, 0.14)}
              initial="hidden"
              animate="visible"
            >
              {/* Lead form — width 576px Figma */}
              <motion.div className="w-full shrink-0 lg:max-w-[576px]" variants={fadeUp(18)}>
                <motion.div className="flex flex-col gap-6" variants={staggerContainer(0.05, 0.1)}>
                  <motion.h1
                    variants={fadeUp(22)}
                    className="whitespace-pre-line text-[48px] font-bold leading-none tracking-[-0.05em] sm:text-[64px] lg:text-[72px]"
                  >
                    Scale your{'\n'}ambition.
                  </motion.h1>
                  <motion.p variants={fadeUp(16)} className="text-[18px] font-normal leading-[1.625] text-[#ABABAB]">
                    We don&apos;t just build software; we engineer competitive advantages. Tell us about your project to see if we&apos;re the
                    right precision partner for your vision.
                  </motion.p>
                </motion.div>

              <motion.form
                variants={fadeUp(16)}
                className="mt-12 flex w-full flex-col gap-8 lg:mt-[48px]"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-[12px] font-bold uppercase leading-[1.33] tracking-[0.1em] text-[#757575]">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Alex Sterling"
                    className={`${inputBase} py-[18px] leading-[1.21]`}
                    autoComplete="name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-startup" className="text-[12px] font-bold uppercase leading-[1.33] tracking-[0.1em] text-[#757575]">
                    Startup Name
                  </label>
                  <input
                    id="contact-startup"
                    name="startup"
                    type="text"
                    placeholder="Vertex Intelligence"
                    className={`${inputBase} py-[18px] leading-[1.21]`}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-desc" className="text-[12px] font-bold uppercase leading-[1.33] tracking-[0.1em] text-[#757575]">
                    Project Description
                  </label>
                  <textarea
                    id="contact-desc"
                    name="description"
                    rows={4}
                    placeholder="What technical challenge are we solving?"
                    className={`${inputBase} min-h-[152px] resize-y py-4 pb-[88px] leading-[1.5] placeholder:leading-[1.5]`}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[12px] font-bold uppercase leading-[1.33] tracking-[0.1em] text-[#757575]">Budget Range (USD)</span>
                  <div
                    className="grid grid-cols-2 gap-px overflow-hidden rounded-[2px] bg-[rgba(72,72,72,0.3)] sm:grid-cols-4"
                    role="radiogroup"
                    aria-label="Budget range"
                  >
                    {budgetOptions.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex cursor-pointer items-center justify-center bg-[#131313] py-3 text-center text-[12px] font-normal uppercase leading-[1.33] tracking-[-0.05em] text-white"
                      >
                        <input
                          type="radio"
                          name="budget"
                          value={opt.value}
                          checked={budget === opt.value}
                          onChange={() => setBudget(opt.value)}
                          className="sr-only"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                <motion.div variants={fadeUp(12)}>
                  <motion.button
                    type="submit"
                    className="relative rounded-[6px] px-12 py-4 text-[16px] font-bold leading-[1.5] text-black shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.1),0px_20px_25px_-5px_rgba(0,0,0,0.1)]"
                    style={{ background: 'linear-gradient(174deg, #7459F7 0%, #AFA2FF 100%)' }}
                    {...hoverPrimaryCta}
                  >
                    Send Brief
                  </motion.button>
                </motion.div>
              </motion.form>
              </motion.div>

              {/* Aside — gap 48px between blocks */}
              <motion.aside
                className="flex min-w-0 flex-1 flex-col gap-12 lg:gap-[48px]"
                variants={staggerContainer(0.08, 0.12)}
              >
              <motion.div
                variants={fadeUp(18)}
                className="relative overflow-hidden rounded-lg border border-[rgba(72,72,72,0.1)] bg-[rgba(38,38,38,0.4)] p-8 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[20px] sm:p-[32px]"
                {...hoverCardBorderGlow}
              >
                <div
                  className="pointer-events-none absolute right-[-33px] top-[-95px] h-64 w-64 rounded-full bg-[rgba(175,162,255,0.1)] blur-[100px]"
                  aria-hidden
                />
                <div className="relative flex min-h-0 flex-col">
                  <div className="flex items-center gap-3">
                    <IconBolt />
                    <span className="text-[12px] font-bold uppercase leading-[1.33] tracking-[0.2em] text-[#ABABAB]">Instant Access</span>
                  </div>
                  <h2 className="mt-6 text-[30px] font-bold leading-[1.2] tracking-[-0.025em]">Book Strategy Call</h2>
                  <p className="mt-6 max-w-[500px] text-[14px] font-normal leading-[1.625] text-[#ABABAB]">
                    Prefer a direct conversation? Select a time that works for your team and our lead engineer will join you for a
                    technical deep-dive.
                  </p>
                  <div className="mt-10 flex flex-col items-center justify-center rounded border border-[rgba(72,72,72,0.2)] bg-black px-8 py-[92px] sm:py-[92.69px]">
                    <div className="flex flex-col items-center gap-4 text-center">
                      <IconCalendar />
                      <p className="text-[14px] font-normal leading-[1.43] text-[#757575]">
                        Calendly Integration Interface
                        <br />
                        Available slots sync in real-time
                      </p>
                    </div>
                  </div>
                  <motion.button
                    type="button"
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-white py-4 text-[16px] font-bold leading-[1.5] text-black"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    Schedule Session
                    <IconArrowUpRight />
                  </motion.button>
                </div>
              </motion.div>

              <motion.div variants={fadeUp(16)} className="grid grid-cols-1 gap-10 px-0 sm:grid-cols-2 sm:gap-8 sm:px-4 md:gap-x-16">
                <div className="flex flex-col gap-[16.5px] pb-[17.5px]">
                  <span className="text-[12px] font-bold uppercase leading-[1.33] tracking-[0.1em] text-[#AFA2FF]">Email</span>
                  <a href="mailto:hello@jvolabs.ai" className="text-[20px] font-medium leading-[1.4] tracking-[-0.025em] text-white hover:text-[#AFA2FF]">
                    hello@jvolabs.ai
                  </a>
                </div>
                <div className="flex flex-col gap-[15.375px]">
                  <span className="text-[12px] font-bold uppercase leading-[1.33] tracking-[0.1em] text-[#AFA2FF]">Studio</span>
                  <p className="text-[14px] font-normal leading-[1.625] text-[#ABABAB]">
                    799 Broadway, 11th Floor
                    <br />
                    Greenwich Village, NY 10003
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp(18)}
                className="relative overflow-hidden rounded-lg border border-[rgba(72,72,72,0.1)] bg-[rgba(38,38,38,0.4)] p-8 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[20px] sm:p-[32px]"
                {...hoverCardBorderGlow}
              >
                <div
                  className="pointer-events-none absolute right-[-33px] top-[-95px] h-64 w-64 rounded-full bg-[rgba(175,162,255,0.1)] blur-[100px]"
                  aria-hidden
                />
                <div className="relative flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <IconPin />
                    <span className="text-[12px] font-bold uppercase leading-[1.33] tracking-[0.2em] text-[#ABABAB]">Our Studio</span>
                  </div>
                  <div className="overflow-hidden rounded border border-[rgba(72,72,72,0.2)] bg-black">
                    <div className="h-[289.38px] w-full overflow-hidden">
                      <motion.img
                        src="/figma/contact/office-broadway-7bfe37.png"
                        alt="JVO Labs office at 799 Broadway"
                        className="h-full w-full object-cover opacity-80"
                        {...hoverMediaKen}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp(14)} className="h-[192px] w-full overflow-hidden rounded-lg opacity-40">
                <motion.img src="/figma/contact/map-texture-299a83.png" alt="" className="h-full w-full object-cover" {...hoverMediaKen} />
              </motion.div>
              </motion.aside>
            </motion.div>
          </div>
        </MotionConfig>
      </main>

      <PartnershipFooter />
    </>
  )
}
