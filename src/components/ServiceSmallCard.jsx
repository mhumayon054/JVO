import { motion } from 'framer-motion'

function ServiceIconMvp() {
  return (
    <svg className="h-7 w-7 text-[#AFA2FF]" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M4 8.5L14 3l10 5.5v11L14 25 4 19.5v-11z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M4 8.5L14 14l10-5.5M14 14v11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function ServiceIconSaaS() {
  return (
    <svg className="h-7 w-7 text-[#AFA2FF]" viewBox="0 0 29 23" fill="none" aria-hidden>
      <path d="M2 18h25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 14l6-10 5 6 4-8 5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ServiceIconCrm() {
  return (
    <svg className="h-7 w-7 text-[#AFA2FF]" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="4" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="18" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="18" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function ServiceIconMobile() {
  return (
    <svg className="h-7 w-7 text-[#AFA2FF]" viewBox="0 0 21 32" fill="none" aria-hidden>
      <rect x="3" y="2" width="15" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 26h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const icons = {
  mvp: ServiceIconMvp,
  saas: ServiceIconSaaS,
  crm: ServiceIconCrm,
  mobile: ServiceIconMobile,
}

export function ServiceSmallCard({ variant, title, description, footerLabel, footerValue, mvpLayout = false }) {
  const Icon = icons[variant]

  return (
    <motion.article
      className={`flex h-full min-h-[320px] min-w-0 flex-col rounded-[18px] border border-white/[0.06] bg-[#131313]/80 p-6 transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#7459F7]/30 hover:shadow-[0_20px_60px_rgba(116,89,247,0.10)] sm:p-7 lg:p-8 ${
        mvpLayout ? 'lg:min-h-[452px]' : ''
      }`}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
          <Icon />
        </div>
        <h3 className="mt-7 text-[23px] font-bold leading-[1.22] tracking-[-0.025em] text-white">
          {title}
        </h3>
        <p className="mt-4 whitespace-pre-line text-[15px] font-normal leading-[1.65] text-[#ABABAB]">
          {description}
        </p>
      </div>
      <div className="mt-8 border-t border-white/[0.06] pt-6">
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold uppercase leading-[1.3333333333333333] tracking-[0.12em] text-[#AFA2FF]">
            {footerLabel}
          </p>
          <p className="text-[14px] font-medium leading-[1.45] text-white">{footerValue}</p>
        </div>
      </div>
    </motion.article>
  )
}
