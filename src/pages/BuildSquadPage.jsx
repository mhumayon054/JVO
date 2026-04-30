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
import { BuildSquadBriefForm } from '../components/buildSquad/BuildSquadBriefForm'
import { fadeUp, staggerContainer, viewportOnce } from '../components/home/homeMotion'
import { getSquadMembers, getStrapiMediaUrl, submitSquadBrief } from '../lib/strapi'
import { blobToDataUri, createSquadBriefPdfBlob, downloadPdfBlob } from '../utils/squadBriefPdf'

function toggleIn(setter, id) {
  setter((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
}

const INITIAL_BRIEF_CONTACT = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectSummary: '',
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function BuildSquadPage() {
  const [members, setMembers] = useState(SQUAD_MEMBERS)
  const [selectedRoles, setSelectedRoles] = useState([])
  const [selectedSeniority, setSelectedSeniority] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [briefContact, setBriefContact] = useState(INITIAL_BRIEF_CONTACT)
  const [briefState, setBriefState] = useState('idle')
  const [exportState, setExportState] = useState('idle')
  const [briefMessage, setBriefMessage] = useState('')
  const [formError, setFormError] = useState('')
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

  function validateBrief() {
    const name = briefContact.name.trim()
    const email = briefContact.email.trim()
    const phone = briefContact.phone.trim()
    const projectSummary = briefContact.projectSummary.trim()

    if (selectedMembers.length === 0) return 'Select at least one squad member before generating the brief.'
    if (!name) return 'Full name is required.'
    if (!email || !isValidEmail(email)) return 'A valid email address is required.'
    if (!phone) return 'Phone / WhatsApp number is required.'
    if (projectSummary.length < 30) return 'Project summary is too short. Add at least 30 characters.'

    return ''
  }

  function buildBriefPayload(pdfDataUri = '', pdfFileName = '') {
    return {
      name: briefContact.name.trim(),
      email: briefContact.email.trim(),
      phone: briefContact.phone.trim(),
      company: briefContact.company.trim(),
      projectSummary: briefContact.projectSummary.trim(),
      selectedMembers,
      selectedMemberIds: selectedMembers.map((m) => m.id),
      monthlyBurn,
      projectTotal,
      sourcePage: 'build-squad',
      status: 'new',
      pdfDataUri,
      pdfFileName,
    }
  }

  function createPdf() {
    return createSquadBriefPdfBlob({
      contact: briefContact,
      selectedMembers,
      monthlyBurn,
      projectTotal,
    })
  }

  async function onExportBrief() {
    const validationError = validateBrief()
    if (validationError) {
      setFormError(validationError)
      setBriefState('error')
      setBriefMessage(validationError)
      return
    }

    setFormError('')
    setExportState('loading')
    setBriefMessage('')

    try {
      const { blob, fileName } = createPdf()
      downloadPdfBlob(blob, fileName)
      setBriefState('success')
      setBriefMessage('PDF brief downloaded successfully.')
    } catch (error) {
      setBriefState('error')
      setBriefMessage(error.message || 'Unable to generate PDF brief.')
    } finally {
      setExportState('idle')
    }
  }

  async function onDeployBrief() {
    const validationError = validateBrief()
    if (validationError) {
      setFormError(validationError)
      setBriefState('error')
      setBriefMessage(validationError)
      return
    }

    setFormError('')
    setBriefState('loading')
    setBriefMessage('')

    try {
      const { blob, fileName } = createPdf()
      downloadPdfBlob(blob, fileName)

      const pdfDataUri = await blobToDataUri(blob)
      const response = await submitSquadBrief(buildBriefPayload(pdfDataUri, fileName))

      const emailSent = response?.data?.emailSent

      setBriefState('success')
      setBriefMessage(
        emailSent
          ? 'PDF downloaded and squad brief sent to JVO Labs.'
          : 'PDF downloaded and brief saved. Email was not sent because SMTP is not configured.',
      )

      setBriefContact(INITIAL_BRIEF_CONTACT)
      setSelectedIds([])
    } catch (error) {
      setBriefState('error')
      setBriefMessage(
        error.message ||
          'PDF was generated, but the backend submission failed. Check Strapi and SMTP configuration.',
      )
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-[#0E0E0E] pb-40 text-white">
        <BuildSquadTopBar />

        <div className="min-w-0 lg:grid lg:min-h-0 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
          <BuildSquadFilters
            selectedRoles={selectedRoles}
            selectedSeniority={selectedSeniority}
            onToggleRole={onToggleRole}
            onToggleSeniority={onToggleSeniority}
          />

<div className="min-w-0 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] xl:gap-8 xl:px-0 2xl:gap-10">
<div className="min-w-0 px-4 py-10 sm:px-8 lg:px-10">
              <motion.div variants={staggerContainer(0.06, 0.12)} initial="hidden" animate="visible">
                <motion.h1 variants={fadeUp(20)} className="text-[40px] font-bold leading-none tracking-[-0.05em] sm:text-[44px] lg:text-[48px]">
                  Build your squad
                </motion.h1>
                <motion.p variants={fadeUp(16)} className="mt-4 max-w-[640px] text-[18px] font-normal leading-[1.625] text-[#ABABAB]">
                  Select specialists to preview monthly burn, 90-day project totals, and a live capability forecast. Generate a
                  polished PDF brief and send your squad request directly to our team.
                </motion.p>
              </motion.div>

              <BuildSquadBriefForm value={briefContact} onChange={setBriefContact} error={formError} />

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
                  className="mt-10 grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3"
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

            <div className="min-w-0 border-t border-[rgba(72,72,72,0.15)] px-4 py-8 sm:px-8 lg:px-10 xl:border-t-0 xl:px-6 xl:pt-10 2xl:px-8">
              <BuildSquadSummary monthlyBurn={monthlyBurn} projectTotal={projectTotal} selectedCount={selectedMembers.length} />
            </div>
          </div>
        </div>

        <BuildSquadBottomBar
          selectedCount={selectedMembers.length}
          onDeploy={onDeployBrief}
          onExport={onExportBrief}
          deployState={briefState}
          exportState={exportState}
        />

        {briefMessage ? (
          <div className="fixed bottom-24 left-1/2 z-[70] max-w-[calc(100vw-32px)] -translate-x-1/2 rounded-md border border-[rgba(72,72,72,0.2)] bg-[#131313] px-4 py-2 text-center text-sm text-[#ABABAB] shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
            <span className={briefState === 'success' ? 'text-[#AFA2FF]' : briefState === 'error' ? 'text-[#ff8c8c]' : 'text-[#ABABAB]'}>
              {briefMessage}
            </span>
          </div>
        ) : null}
      </div>
    </MotionConfig>
  )
}