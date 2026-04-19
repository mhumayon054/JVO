import { motion } from 'framer-motion'
import { FORECAST_LABELS } from '../../data/buildSquadMembers'
import { fadeUp, staggerContainer, viewportOnce } from '../home/homeMotion'

export function CapabilityForecast({ averages }) {
  return (
    <motion.section
      className="mt-12 rounded-lg border border-[rgba(72,72,72,0.15)] bg-[#131313] p-8"
      variants={staggerContainer(0.08, 0.11)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.h3 variants={fadeUp(16)} className="text-[20px] font-bold leading-[1.2] tracking-[-0.025em] text-white">
        Capability forecast
      </motion.h3>
      <motion.p variants={fadeUp(14)} className="mt-2 max-w-[520px] text-[14px] leading-[1.5] text-[#ABABAB]">
        Projected squad strength across key dimensions based on your current selection.
      </motion.p>
      <motion.ul className="mt-8 space-y-5" variants={staggerContainer(0.04, 0.07)}>
        {FORECAST_LABELS.map(({ key, label }) => {
          const v = averages[key] ?? 0
          return (
            <motion.li key={key} variants={fadeUp(10)}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#ABABAB]">{label}</span>
                <span className="text-[12px] font-medium tabular-nums text-[#AFA2FF]">{Math.round(v * 100)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#262626]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${v * 100}%`,
                    background: 'linear-gradient(90deg, rgba(116, 89, 247, 1) 0%, rgba(175, 162, 255, 1) 100%)',
                  }}
                />
              </div>
            </motion.li>
          )
        })}
      </motion.ul>
    </motion.section>
  )
}
