import { motion } from 'framer-motion'
import fintech from '../../assets/icons/fintech.svg'
import healthtech from '../../assets/icons/healthtech.svg'
import enterpriseai from '../../assets/icons/aisaas.svg'
import logistics from '../../assets/icons/logistics.svg'
import ecommerce from '../../assets/icons/e-commerce.svg'
import { EASE, fadeUp, staggerContainer, viewportOnce } from './homeMotion'

const INDUSTRIES = [
  {
    icon: fintech,
    name: 'FinTech',
    description: 'Securing transactions and automating risk assessment with predictive AI models.',
  },
  {
    icon: healthtech,
    name: 'HealthTech',
    description: 'Accelerating diagnostics and patient care through HIPAA-compliant AI pipelines.',
  },
  {
    icon: enterpriseai,
    name: 'Enterprise AI',
    description: 'Building the core intelligence layer for the next generation of software products.',
  },
  {
    icon: logistics,
    name: 'Cybersecurity',
    description: 'Optimizing supply chains and route efficiency with real-time neural processing.',
  },
  {
    icon: ecommerce,
    name: 'E-commerce',
    description: 'Personalizing customer journeys with hyper-accurate recommendation engines.',
  },
]

export function HomeIndustriesSection() {
  return (
    <section className="bg-[#131313] py-16 md:py-20">
      <motion.div
        className="mx-auto w-full max-w-[1216px] px-4 sm:px-8"
        variants={staggerContainer(0.08, 0.13)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.h2
          variants={fadeUp(16)}
          className="text-center text-[40px] font-bold leading-[1.1] tracking-[-0.025em] text-white max-md:text-[32px] md:text-[48px]"
        >
          Industries We Serve
        </motion.h2>
        <motion.p
          variants={fadeUp(14)}
          className="mx-auto mt-5 max-w-[720px] text-center text-[17px] leading-[1.55] text-[#ABABAB] md:mt-6 md:text-[18px] md:leading-[1.56]"
        >
          Specialized intelligence engineering for mission-critical sectors.
        </motion.p>
        <motion.div
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-5 xl:gap-5"
          variants={staggerContainer(0.05, 0.09)}
        >
          {INDUSTRIES.map((item) => (
            <motion.article
              key={item.name}
              variants={fadeUp(18)}
              className="flex flex-col rounded-2xl border border-[rgba(72,72,72,0.15)] bg-[rgba(72,72,72,0.2)] p-6 backdrop-blur-[20px]"
              whileHover={{
                y: -2,
                borderColor: 'rgba(116, 89, 247, 0.2)',
                boxShadow: '0 20px 44px -30px rgba(0, 0, 0, 0.55)',
                transition: { duration: 0.3, ease: EASE },
              }}
            >
              <div className="">
                <img src={item.icon} alt={item.name} className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-[20px] font-bold leading-[1.25] tracking-[-0.02em] text-white">{item.name}</h3>
              <p className="mt-3 text-[14px] leading-[1.5] text-[#ABABAB]">{item.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
