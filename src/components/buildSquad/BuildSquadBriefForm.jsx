import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '../home/homeMotion'

const inputClass =
  'w-full rounded-[8px] border border-[rgba(72,72,72,0.18)] bg-[#131313] px-4 py-3 text-[14px] leading-[1.45] text-white outline-none transition-colors placeholder:text-[#5F5F5F] focus:border-[rgba(175,162,255,0.55)] focus:bg-[#161616]'

const labelClass = 'text-[11px] font-bold uppercase tracking-[0.14em] text-[#ABABAB]'

export function BuildSquadBriefForm({ value, onChange, error }) {
  function updateField(field, nextValue) {
    onChange((current) => ({
      ...current,
      [field]: nextValue,
    }))
  }

  return (
    <motion.section
      variants={staggerContainer(0.05, 0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mt-10 overflow-hidden rounded-[18px] border border-[rgba(72,72,72,0.16)] bg-[#131313]/80 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-md"
    >
      <div className="relative p-5 sm:p-6">
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#7459F7]/14 blur-[80px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(175,162,255,0.06),transparent_36%)]"
          aria-hidden="true"
        />

        <div className="relative">
          <motion.div variants={fadeUp(14)} className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#AFA2FF]">
                Project Brief
              </p>
              <h2 className="mt-2 text-[24px] font-bold leading-tight tracking-[-0.04em] text-white">
                Tell us what you need this squad to build.
              </h2>
            </div>
            <p className="max-w-[280px] text-[13px] leading-[1.5] text-[#757575]">
              This becomes part of your generated PDF brief and internal onboarding request.
            </p>
          </motion.div>

          <motion.div variants={fadeUp(14)} className="mt-6 grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className={labelClass}>Full name *</span>
              <input
                className={inputClass}
                value={value.name}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Email *</span>
              <input
                className={inputClass}
                value={value.email}
                onChange={(event) => updateField('email', event.target.value)}
                placeholder="you@company.com"
                type="email"
                autoComplete="email"
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Phone / WhatsApp *</span>
              <input
                className={inputClass}
                value={value.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                placeholder="+1 000 000 0000"
                autoComplete="tel"
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Company</span>
              <input
                className={inputClass}
                value={value.company}
                onChange={(event) => updateField('company', event.target.value)}
                placeholder="Company / startup name"
                autoComplete="organization"
              />
            </label>
          </motion.div>

          <motion.label variants={fadeUp(14)} className="mt-4 block space-y-2">
            <span className={labelClass}>Short project summary *</span>
            <textarea
              className={`${inputClass} min-h-[118px] resize-y`}
              value={value.projectSummary}
              onChange={(event) => updateField('projectSummary', event.target.value)}
              placeholder="Example: We need an AI SaaS MVP for automated document analysis, user dashboard, billing, admin panel, and scalable backend architecture."
              maxLength={900}
            />
          </motion.label>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] leading-[1.5] text-[#6B6B6B]">
              Keep it short but specific. Vague summaries create weak briefs.
            </p>
            <p className="text-[12px] text-[#6B6B6B]">{value.projectSummary.length}/900</p>
          </div>

          {error ? (
            <p className="mt-4 rounded-[8px] border border-[#ff8c8c]/20 bg-[#ff8c8c]/10 px-4 py-3 text-[13px] leading-[1.5] text-[#ffb3b3]">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </motion.section>
  )
}