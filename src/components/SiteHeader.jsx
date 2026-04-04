import { Link, useLocation } from 'react-router-dom'

const navClass = 'text-[12px] uppercase tracking-[0.1em] text-[#ABABAB] transition-colors hover:text-white'

export function SiteHeader() {
  const { pathname } = useLocation()
  const partnershipActive = pathname === '/partnership'
  const aboutActive = pathname === '/about-us'
  const contactActive = pathname === '/contact'
  const insightsActive = pathname === '/insights'

  const linkClass = (active) =>
    `text-[12px] uppercase tracking-[0.1em] ${
      active ? 'border-b-2 border-[#7459F7] pb-0.5 text-[#AFA2FF]' : navClass
    }`

  return (
    <header className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <Link to="/" className="text-[13px] font-bold uppercase tracking-[0.18em] text-white">
        JVO LABS
      </Link>
      <nav className="flex flex-wrap items-center gap-4 sm:gap-8">
        <a className={navClass} href="#">
          Services
        </a>
        <a className={navClass} href="#">
          Process
        </a>
        <a className={navClass} href="#">
          Industries
        </a>
        <a className={navClass} href="#">
          Work
        </a>
        <a className={navClass} href="#">
          Team
        </a>
        <Link to="/partnership" className={linkClass(partnershipActive)}>
          Partnership
        </Link>
        <Link to="/about-us" className={linkClass(aboutActive)}>
          About
        </Link>
        <Link to="/insights" className={linkClass(insightsActive)}>
          Insights
        </Link>
        <Link to="/contact" className={linkClass(contactActive)}>
          Contact
        </Link>
      </nav>
      <button
        type="button"
        className="w-fit rounded-[6px] border border-[rgba(72,72,72,0.15)] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[#AFA2FF]"
      >
        Book Call
      </button>
    </header>
  )
}
