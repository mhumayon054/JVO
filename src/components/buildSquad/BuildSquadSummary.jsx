import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '../home/homeMotion'

function formatUsd(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export function BuildSquadSummary({ monthlyBurn, projectTotal, selectedCount }) {
  return (
    <aside className="w-full shrink-0 lg:w-[300px]">
      <motion.div
        className="sticky top-6 rounded-lg border border-[rgba(72,72,72,0.15)] bg-[#131313] p-8"
        variants={staggerContainer(0.06, 0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.h3 variants={fadeUp(12)} className="text-[10px] font-bold uppercase leading-[1.5] tracking-[0.2em] text-[#AFA2FF]">
          Estimate
        </motion.h3>
        <motion.p variants={fadeUp(10)} className="mt-6 text-[12px] font-bold uppercase tracking-[0.1em] text-[#ABABAB]">
          Monthly burn
        </motion.p>
        <motion.p variants={fadeUp(12)} className="mt-2 text-[32px] font-bold leading-none tracking-[-0.04em] text-white">
          {formatUsd(monthlyBurn)}
        </motion.p>
        <motion.p variants={fadeUp(10)} className="mt-6 text-[12px] font-bold uppercase tracking-[0.1em] text-[#ABABAB]">
          Project total (90 days)
        </motion.p>
        <motion.p variants={fadeUp(12)} className="mt-2 text-[24px] font-bold leading-none tracking-[-0.03em] text-[#AFA2FF]">
          {formatUsd(projectTotal)}
        </motion.p>
        <motion.p variants={fadeUp(10)} className="mt-6 border-t border-[rgba(72,72,72,0.15)] pt-6 text-[13px] leading-[1.5] text-[#6B6B6B]">
          {selectedCount === 0
            ? 'Select one or more squad members to see live pricing.'
            : `${selectedCount} specialist${selectedCount === 1 ? '' : 's'} selected · indicative studio engagement.`}
        </motion.p>
      </motion.div>
    </aside>
  )
}
