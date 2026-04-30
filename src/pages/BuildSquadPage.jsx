import { useCallback, useMemo, useState } from 'react'
import { useEffect } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import { FORECAST_LABELS, SQUAD_MEMBERS } from '../data/buildSquadMembers'
import { BuildSquadTopBar } from '../components/buildSquad/BuildSquadTopBar'
import { BuildSquadFilters } from '../components/buildSquad/BuildSquadFilters'
import { SquadMemberCard } from '../components/buildSquad/SquadMemberCard'
import { CapabilityForecast } from '../components/buildSquad/CapabilityForecast'
import { BuildSquadSummary } from '../components/buildSquad/BuildSquadSummary'
import { BuildSquadBottomBar } from '../components/buildSquad/BuildSquadBottomBar'
import { fadeUp, staggerContainer, viewportOnce } from '../components/home/homeMotion'
import { getSquadMembers, getStrapiMediaUrl, submitSquadBrief } from '../lib/strapi'

function toggleIn(setter, id) {
  setter((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
}

export default function BuildSquadPage() {
  const [members, setMembers] = useState(SQUAD_MEMBERS)
  const [selectedRoles, setSelectedRoles] = useState([])
  const [selectedSeniority, setSelectedSeniority] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [briefContact, setBriefContact] = useState({ name: '', email: '', company: '', notes: '' })
  const [briefState, setBriefState] = useState('idle')
  const [briefMessage, setBriefMessage] = useState('')
  const [membersError, setMembersError] = useState('')

  useEffect(() => {
    let mounted = true
    async function loadSquadMembers() {
      try {
        const data = await getSquadMembers()
        if (!mounted || !Array.isArray(data) || data.length === 0) return
        const mapped = data.map((item, idx) => {
          const attrs = item.attributes || item
          const roles = Array.isArray(attrs.roles)
            ? attrs.roles
            : attrs.role
              ? [String(attrs.role).toLowerCase()]
              : ['engineering']
          return {
            id: attrs.slug || attrs.documentId || String(item.id || idx),
            name: attrs.name || 'Squad Member',
            title: attrs.title || '',
            avatar: getStrapiMediaUrl(attrs.image) || '/figma/engineer-1.png',
            monthlyRate: Number(attrs.monthlyRate || 0),
            roles,
            seniority: attrs.seniority || 'mid',
            skills: attrs.skills || { velocity: 0.7, security: 0.7, ai: 0.7, scale: 0.7 },
          }
        })
        setMembers(mapped)
      } catch (error) {
        if (mounted) setMembersError(error.message || 'Failed to load squad members.')
      }
    }
    loadSquadMembers()
    return () => {
      mounted = false
    }
  }, [])

  const onToggleRole = useCallback((id) => toggleIn(setSelectedRoles, id), [])
  const onToggleSeniority = useCallback((id) => toggleIn(setSelectedSeniority, id), [])

  const onToggleMember = useCallback((id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const visibleMembers = useMemo(() => {
    return members.filter((m) => {
      if (selectedRoles.length > 0 && !m.roles.some((r) => selectedRoles.includes(r))) return false
      if (selectedSeniority.length > 0 && !selectedSeniority.includes(m.seniority)) return false
      return true
    })
  }, [members, selectedRoles, selectedSeniority])

  const selectedMembers = useMemo(
    () => members.filter((m) => selectedIds.includes(m.id)),
    [members, selectedIds],
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

  async function onDeployBrief() {
    if (selectedMembers.length === 0) {
      setBriefState('error')
      setBriefMessage('Select at least one squad member before deploying.')
      return
    }
    setBriefState('loading')
    setBriefMessage('')
    try {
      await submitSquadBrief({
        name: briefContact.name.trim(),
        email: briefContact.email.trim(),
        company: briefContact.company.trim(),
        selectedMembers,
        selectedMemberIds: selectedMembers.map((m) => m.id),
        monthlyBurn,
        projectTotal,
        notes: briefContact.notes.trim(),
        sourcePage: 'build-squad',
        status: 'new',
      })
      setBriefState('success')
      setBriefMessage('Squad brief submitted successfully.')
      setBriefContact({ name: '', email: '', company: '', notes: '' })
    } catch (error) {
      setBriefState('error')
      setBriefMessage(error.message || 'Unable to submit squad brief.')
    }
  }

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
              {membersError ? <p className="mt-4 text-sm text-[#ff8c8c]">Using fallback squad members: {membersError}</p> : null}
            </div>

            <div className="border-t border-[rgba(72,72,72,0.15)] px-4 py-8 sm:px-8 lg:px-10 xl:border-t-0 xl:px-8 xl:pt-10">
              <BuildSquadSummary monthlyBurn={monthlyBurn} projectTotal={projectTotal} selectedCount={selectedMembers.length} />
            </div>
          </div>
        </div>

        <BuildSquadBottomBar selectedCount={selectedMembers.length} onDeploy={onDeployBrief} deployState={briefState} />
        {briefMessage ? (
          <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-md border border-[rgba(72,72,72,0.2)] bg-[#131313] px-4 py-2 text-sm text-[#ABABAB]">
            <span className={briefState === 'success' ? 'text-[#AFA2FF]' : briefState === 'error' ? 'text-[#ff8c8c]' : 'text-[#ABABAB]'}>
              {briefMessage}
            </span>
          </div>
        ) : null}
      </div>
    </MotionConfig>
  )
}
