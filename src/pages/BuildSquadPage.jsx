import { useCallback, useMemo, useState } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import { FORECAST_LABELS, SQUAD_MEMBERS } from '../data/buildSquadMembers'
import { BuildSquadTopBar } from '../components/buildSquad/BuildSquadTopBar'
import { BuildSquadFilters } from '../components/buildSquad/BuildSquadFilters'
import { SquadMemberCard } from '../components/buildSquad/SquadMemberCard'
import { CapabilityForecast } from '../components/buildSquad/CapabilityForecast'
import { BuildSquadSummary } from '../components/buildSquad/BuildSquadSummary'
import { BuildSquadBottomBar } from '../components/buildSquad/BuildSquadBottomBar'
import { fadeUp, staggerContainer, viewportOnce } from '../components/home/homeMotion'

function toggleIn(setter, id) {
  setter((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
}

export default function BuildSquadPage() {
  const [selectedRoles, setSelectedRoles] = useState([])
  const [selectedSeniority, setSelectedSeniority] = useState([])
  const [selectedIds, setSelectedIds] = useState([])

  const onToggleRole = useCallback((id) => toggleIn(setSelectedRoles, id), [])
  const onToggleSeniority = useCallback((id) => toggleIn(setSelectedSeniority, id), [])

  const onToggleMember = useCallback((id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const visibleMembers = useMemo(() => {
    return SQUAD_MEMBERS.filter((m) => {
      if (selectedRoles.length > 0 && !m.roles.some((r) => selectedRoles.includes(r))) return false
      if (selectedSeniority.length > 0 && !selectedSeniority.includes(m.seniority)) return false
      return true
    })
  }, [selectedRoles, selectedSeniority])

  const selectedMembers = useMemo(
    () => SQUAD_MEMBERS.filter((m) => selectedIds.includes(m.id)),
    [selectedIds],
  )

  const monthlyBurn = useMemo(
    () => selectedMembers.reduce((acc, m) => acc + m.monthlyRate, 0),
    [selectedMembers],
  )
  const projectTotal = monthlyBurn * 3

  const averages = useMemo(() => {
    const out = {}
    if (selectedMembers.length === 0) {
      FORECAST_LABELS.forEach(({ key }) => {
        out[key] = 0
      })
      return out
    }
    FORECAST_LABELS.forEach(({ key }) => {
      const sum = selectedMembers.reduce((acc, m) => acc + (m.skills[key] ?? 0), 0)
      out[key] = sum / selectedMembers.length
    })
    return out
  }, [selectedMembers])

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0E0E0E] pb-32 text-white">
        <BuildSquadTopBar />

        <div className="lg:grid lg:min-h-0 lg:grid-cols-[300px_1fr]">
          <BuildSquadFilters
            selectedRoles={selectedRoles}
            selectedSeniority={selectedSeniority}
            onToggleRole={onToggleRole}
            onToggleSeniority={onToggleSeniority}
          />

          <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-10 xl:px-0">
            <div className="px-4 py-10 sm:px-8 lg:px-10">
              <motion.div variants={staggerContainer(0.06, 0.12)} initial="hidden" animate="visible">
                <motion.h1 variants={fadeUp(20)} className="text-[40px] font-bold leading-none tracking-[-0.05em] sm:text-[44px] lg:text-[48px]">
                  Build your squad
                </motion.h1>
                <motion.p variants={fadeUp(16)} className="mt-4 max-w-[640px] text-[18px] font-normal leading-[1.625] text-[#ABABAB]">
                  Select specialists to preview monthly burn, 90-day project totals, and a live capability forecast. Export a brief or
                  deploy your squad to kick off onboarding with our team.
                </motion.p>
              </motion.div>

              {visibleMembers.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-12 rounded-lg border border-dashed border-[rgba(72,72,72,0.35)] bg-[#131313] p-10 text-center text-[15px] leading-[1.5] text-[#ABABAB]"
                >
                  No profiles match these filters. Clear a filter to see more specialists.
                </motion.p>
              ) : (
                <motion.div
                  className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                  variants={staggerContainer(0.05, 0.09)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {visibleMembers.map((m) => (
                    <SquadMemberCard key={m.id} member={m} selected={selectedIds.includes(m.id)} onToggle={onToggleMember} />
                  ))}
                </motion.div>
              )}

              <CapabilityForecast averages={averages} />
            </div>

            <div className="border-t border-[rgba(72,72,72,0.15)] px-4 py-8 sm:px-8 lg:px-10 xl:border-t-0 xl:px-8 xl:pt-10">
              <BuildSquadSummary monthlyBurn={monthlyBurn} projectTotal={projectTotal} selectedCount={selectedMembers.length} />
            </div>
          </div>
        </div>

        <BuildSquadBottomBar selectedCount={selectedMembers.length} />
      </div>
    </MotionConfig>
  )
}
