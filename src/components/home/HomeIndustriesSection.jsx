import fintech from '../../assets/icons/fintech.svg'
import healthtech from '../../assets/icons/healthtech.svg'
import enterpriseai from '../../assets/icons/aisaas.svg'
import logistics from '../../assets/icons/logistics.svg'
import ecommerce from '../../assets/icons/e-commerce.svg'

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
      <div className="mx-auto w-full max-w-[1216px] px-4 sm:px-8">
        <h2 className="text-center text-[40px] font-bold leading-[1.1] tracking-[-0.025em] text-white max-md:text-[32px] md:text-[48px]">
          Industries We Serve
        </h2>
        <p className="mx-auto mt-5 max-w-[720px] text-center text-[17px] leading-[1.55] text-[#ABABAB] md:mt-6 md:text-[18px] md:leading-[1.56]">
          Specialized intelligence engineering for mission-critical sectors.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-5 xl:gap-5">
          {INDUSTRIES.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-2xl border border-[rgba(72,72,72,0.15)] bg-[rgba(72,72,72,0.2)] p-6 backdrop-blur-[20px]"
            >
              <div className="">
                <img src={item.icon} alt={item.name} className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-[20px] font-bold leading-[1.25] tracking-[-0.02em] text-white">{item.name}</h3>
              <p className="mt-3 text-[14px] leading-[1.5] text-[#ABABAB]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
