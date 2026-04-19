function ServiceIconMvp() {
  return (
    <svg className="text-[#AFA2FF]" width={28} height={28} viewBox="0 0 28 28" fill="none" aria-hidden>
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
    <svg className="text-[#AFA2FF]" width={29} height={23} viewBox="0 0 29 23" fill="none" aria-hidden>
      <path d="M2 18h25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 14l6-10 5 6 4-8 5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ServiceIconCrm() {
  return (
    <svg className="text-[#AFA2FF]" width={32} height={32} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="4" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="18" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="18" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function ServiceIconMobile() {
  return (
    <svg className="text-[#AFA2FF]" width={21} height={32} viewBox="0 0 21 32" fill="none" aria-hidden>
      <rect x="3" y="2" width="15" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 26h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

import { motion } from 'framer-motion'
import { hoverCardBorderGlow } from './home/homeMotion'

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
      className={`flex h-full flex-col rounded-lg border border-[rgba(72,72,72,0.1)] bg-[#131313] p-10 ${
        mvpLayout ? 'gap-[105px]' : 'justify-between'
      }`}
      {...hoverCardBorderGlow}
    >
      <div className="relative min-h-[190px]">
        <div
          className={
            variant === 'mvp'
              ? 'absolute left-[4px] top-[6px]'
              : variant === 'saas'
                ? 'absolute left-[4px] top-[9px]'
                : variant === 'crm'
                  ? 'absolute left-[2px] top-[4px]'
                  : 'absolute left-2 top-[4px]'
          }
        >
          <Icon />
        </div>
        <h3 className="absolute left-0 top-16 max-w-[302px] text-[24px] font-bold leading-[1.3333333333333333] tracking-[-0.025em] text-white">
          {title}
        </h3>
        <p className="absolute left-0 top-[112px] max-w-[302px] whitespace-pre-line text-[16px] font-normal leading-[1.625] text-[#ABABAB]">
          {description}
        </p>
      </div>
      <div className="pt-8">
        <div className="flex flex-col gap-2 border-t border-[rgba(72,72,72,0.1)] pt-8">
          <p className="text-[12px] font-bold uppercase leading-[1.3333333333333333] tracking-[0.1em] text-[#AFA2FF]">
            {footerLabel}
          </p>
          <p className="text-[14px] font-medium leading-[1.4285714285714286] text-white">{footerValue}</p>
        </div>
      </div>
    </motion.article>
  )
}
