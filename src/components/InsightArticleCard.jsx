import { motion } from 'framer-motion'
import { EASE, fadeUp, hoverMediaKen } from './home/homeMotion'

function IconArrowSm() {
  return (
    <svg className="h-[9.33px] w-[9.33px] shrink-0 text-[#AFA2FF]" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M1 9 9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function InsightArticleCard({ image, imageAlt, category, title, description }) {
  return (
    <motion.article variants={fadeUp(22)} className="w-full max-w-[400px]">
      <div className="overflow-hidden bg-[#131313]">
        <div className="aspect-[400/250] w-full max-w-[400px] overflow-hidden">
          <motion.img src={image} alt={imageAlt} className="h-full w-full object-cover opacity-60" {...hoverMediaKen} />
        </div>
      </div>
      <p className="mt-6 text-[10px] font-bold uppercase leading-[1.5] tracking-[0.2em] text-[#AFA2FF]">{category}</p>
      <h3 className="mt-4 whitespace-pre-line text-[24px] font-bold leading-[1.3333333333333333em] tracking-[-0.025em] text-white">
        {title}
      </h3>
      <p className="mt-4 max-w-[400px] text-[14px] font-normal leading-[1.625em] text-[#ABABAB]">{description}</p>
      <motion.a
        href="#"
        className="mt-6 inline-flex items-center gap-2 text-[14px] font-bold leading-[1.4285714285714286em] text-[#AFA2FF]"
        whileHover={{ x: 2 }}
        transition={{ duration: 0.28, ease: EASE }}
      >
        Read Article
        <IconArrowSm />
      </motion.a>
    </motion.article>
  )
}
