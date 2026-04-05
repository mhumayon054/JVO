import { Link } from 'react-router-dom'

export function BuildSquadTopBar() {
  return (
    <header className="flex flex-col gap-4 border-b border-[rgba(72,72,72,0.15)] bg-[#0E0E0E] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-[14px]">
      <div className="flex flex-wrap items-center gap-4">
        <Link to="/" className="text-[13px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:text-[#AFA2FF]">
          JVO LABS
        </Link>
        <span className="hidden h-3 w-px bg-[rgba(72,72,72,0.35)] sm:block" aria-hidden />
        <nav className="flex items-center gap-2 text-[12px] leading-[1.33] text-[#ABABAB]" aria-label="Breadcrumb">
          <Link to="/" className="transition-colors hover:text-white">
            JVO Labs
          </Link>
          <span className="text-[#484848]">/</span>
          <span className="font-medium text-[#AFA2FF]">Build Squad</span>
        </nav>
      </div>
      <Link
        to="/"
        className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#ABABAB] transition-colors hover:text-white"
      >
        ← Previous Step
      </Link>
    </header>
  )
}
