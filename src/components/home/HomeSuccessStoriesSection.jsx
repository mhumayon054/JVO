import { motion } from 'framer-motion'
import { EASE, fadeFromX, fadeUp, staggerContainer, viewportOnce } from './homeMotion'

const STORIES = [
  {
    image: '/figma/story-1.png',
    title: '3x User Growth',
    subtitle: 'Real-time risk scoring for a global trading desk.',
    alt: 'FinTech AI Advisor case study',
  },
  {
    image: '/figma/story-2.png',
    title: 'Logistics Neural Hub',
    subtitle: 'Routing and ETA intelligence across multi-hub networks.',
    alt: 'Logistics Neural Hub case study',
  },
]

export function HomeSuccessStoriesSection() {
  return (
    <section className="py-16 md:py-20">
      <motion.div
        className="mx-auto w-full max-w-[1216px] px-4 sm:px-8"
        variants={staggerContainer(0.1, 0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.h2
          variants={fadeFromX(-18)}
          className="text-[36px] font-bold leading-[1.1] tracking-[-0.025em] text-white md:text-[40px]"
        >
          Success Stories
        </motion.h2>
        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
          variants={staggerContainer(0.08, 0.14)}
        >
          {STORIES.map((s) => (
            <motion.article
              key={s.title}
              variants={fadeUp(22)}
              className="group relative overflow-hidden rounded-2xl border border-[rgba(72,72,72,0.15)]"
              whileHover={{
                borderColor: 'rgba(116, 89, 247, 0.2)',
                transition: { duration: 0.35, ease: EASE },
              }}
            >
              <div className="relative aspect-[16/10] w-full md:aspect-[1.55/1] md:min-h-[320px]">
                <motion.img
                  src={s.image}
                  alt={s.alt}
                  className="absolute inset-0 h-full w-full object-cover opacity-70"
                  whileHover={{ scale: 1.03, opacity: 0.82 }}
                  transition={{ duration: 0.55, ease: EASE }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/55 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3 className="mt-2 text-[24px] font-bold leading-[1.2] tracking-[-0.02em] text-white md:text-[28px]">
                    {s.title}
                  </h3>

                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#AFA2FF]">FinTech AI Advisor</p>
                  <p className="mt-2 max-w-[480px] text-[15px] leading-[1.45] text-[#ABABAB] md:text-[16px] md:leading-[1.5]">
                    {s.subtitle}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
