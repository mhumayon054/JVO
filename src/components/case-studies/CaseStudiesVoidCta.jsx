import { motion } from 'framer-motion'
import {
  MotionLink,
  fadeUp,
  hoverPrimaryCta,
  hoverTapSoft,
  staggerContainer,
  viewportOnce,
} from '../home/homeMotion'

export function CaseStudiesVoidCta() {
  return (
    <section className="w-full max-w-[1280px]" aria-labelledby="case-studies-void-cta-heading">
      <motion.div
        className="mx-auto w-full max-w-[1216px] rounded-[32px] border border-[rgba(72,72,72,0.15)] px-6 py-14 text-center sm:px-10 sm:py-16 lg:px-[72px] lg:py-[96px]"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(116, 89, 247, 0.08) 0%, transparent 55%), #131313',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
        }}
        variants={staggerContainer(0.12, 0.14)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.h2
          id="case-studies-void-cta-heading"
          variants={fadeUp(22)}
          className="mx-auto max-w-[900px] text-[36px] font-bold leading-[1.05em] tracking-[-0.025em] text-white sm:text-[48px] lg:text-[56px]"
        >
          Ready to <span className="text-[#AFA2FF]">Engineer</span> the Future?
        </motion.h2>
        <motion.p
          variants={fadeUp(16)}
          className="mx-auto mt-6 max-w-[640px] text-[17px] font-normal leading-[1.5em] text-[#ABABAB] sm:text-[18px] sm:leading-[1.55em]"
        >
          Our team of elite engineers is ready to bridge the gap between AI hype and production-grade reality.
        </motion.p>
        <motion.div variants={fadeUp(14)} className="mt-10 flex flex-col items-center justify-center gap-4 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-5">
          <MotionLink
            to="/contact"
            className="inline-flex min-h-[56px] w-full max-w-[360px] items-center justify-center rounded-[8px] px-8 text-[17px] font-bold leading-[1.35] text-[#0E0E0E] sm:w-auto sm:max-w-none sm:min-h-0 sm:py-5 sm:text-[18px]"
            style={{
              background: 'linear-gradient(168deg, rgba(116, 89, 247, 1) 0%, rgba(175, 162, 255, 1) 100%)',
              paddingLeft: '32px',
              paddingRight: '32px',
            }}
            {...hoverPrimaryCta}
          >
            Schedule an Engineering Audit
          </MotionLink>
          <MotionLink
            to="/services"
            className="inline-flex min-h-[56px] w-full max-w-[360px] items-center justify-center rounded-[8px] border border-[rgba(255,255,255,0.22)] bg-transparent px-8 text-[17px] font-bold leading-[1.35] text-white sm:w-auto sm:max-w-none sm:min-h-0 sm:py-5 sm:text-[18px]"
            style={{ paddingLeft: '32px', paddingRight: '32px' }}
            whileHover={{ borderColor: 'rgba(255,255,255,0.45)', backgroundColor: 'rgba(255,255,255,0.04)' }}
            {...hoverTapSoft}
          >
            View Our Tech Stack
          </MotionLink>
        </motion.div>
      </motion.div>
    </section>
  )
}
