import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navClass =
  'text-[12px] uppercase tracking-[0.1em] text-[#ABABAB] transition-colors duration-200 ease-out hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7459F7]'

const items = [
  { to: '/services', label: 'Services', match: (p) => p === '/services' },
  { to: '/case-studies', label: 'Case Studies', match: (p) => p === '/case-studies' },
  { to: '/partnership', label: 'Partnership', match: (p) => p === '/partnership' },
  { to: '/about-us', label: 'About', match: (p) => p === '/about-us' },
  { to: '/insights', label: 'Insights', match: (p) => p === '/insights' },
  { to: '/contact', label: 'Contact', match: (p) => p === '/contact' },
]

function linkClass(active) {
  return `text-[12px] uppercase tracking-[0.1em] transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7459F7] ${
    active ? 'border-b-2 border-[#7459F7] pb-0.5 text-[#AFA2FF]' : navClass
  }`
}

function MenuGlyph({ open }) {
  return (
    <span className="relative block h-5 w-5 text-white" aria-hidden>
      <span
        className={`absolute left-0 top-1/2 block h-[2px] w-5 origin-center rounded-full bg-current transition-[transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open ? 'translate-y-0 rotate-45' : '-translate-y-[6px] rotate-0'
        }`}
      />
      <span
        className={`absolute left-0 top-1/2 block h-[2px] w-5 rounded-full bg-current transition-opacity duration-200 ease-out ${
          open ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`absolute left-0 top-1/2 block h-[2px] w-5 origin-center rounded-full bg-current transition-[transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open ? 'translate-y-0 -rotate-45' : 'translate-y-[6px] rotate-0'
        }`}
      />
    </span>
  )
}

export function SiteHeader() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [barHeight, setBarHeight] = useState(64)
  const menuId = useId()
  const headerBarRef = useRef(null)
  const menuButtonRef = useRef(null)
  const firstLinkRef = useRef(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useLayoutEffect(() => {
    const el = headerBarRef.current
    if (!el) return undefined
    const measure = () => setBarHeight(el.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    closeMenu()
  }, [pathname, closeMenu])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (mq.matches) closeMenu()
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [closeMenu])

  useEffect(() => {
    if (!menuOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, closeMenu])

  useEffect(() => {
    if (!menuOpen) return
    const t = window.setTimeout(() => firstLinkRef.current?.focus({ preventScroll: true }), 40)
    return () => window.clearTimeout(t)
  }, [menuOpen])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[rgba(72,72,72,0.15)] bg-[#0E0E0E]/92 backdrop-blur-md supports-[backdrop-filter]:bg-[#0E0E0E]/88">
        <div ref={headerBarRef} className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-8 sm:py-5">
          <Link
            to="/"
            className="shrink-0 text-[13px] font-bold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:text-[#AFA2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7459F7]"
          >
            JVO LABS
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex lg:gap-8 xl:gap-10" aria-label="Primary">
            {items.map(({ to, label, match }) => (
              <Link key={to} to={to} className={linkClass(match(pathname))}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              to="/contact"
              className="hidden rounded-[6px] border border-[rgba(72,72,72,0.15)] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#AFA2FF] transition-[border-color,background-color,color] duration-200 ease-out hover:border-[rgba(116,89,247,0.4)] hover:bg-[rgba(116,89,247,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7459F7] sm:px-4 sm:text-[12px] md:inline-flex"
            >
              Book Call
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[rgba(72,72,72,0.2)] bg-[rgba(38,38,38,0.35)] text-white transition-[border-color,background-color] duration-200 ease-out hover:border-[rgba(116,89,247,0.35)] hover:bg-[rgba(116,89,247,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7459F7] lg:hidden"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <MenuGlyph open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      <div
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        {...(!menuOpen ? { inert: '' } : {})}
        className={`fixed inset-x-0 z-[60] overflow-y-auto transition-[opacity,visibility] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'
        }`}
        style={{ top: barHeight, bottom: 0 }}
      >
        <div
          role="presentation"
          className={`flex min-h-full flex-col px-4 pb-10 pt-3 transition-opacity duration-300 ease-out sm:px-8 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(180deg, rgba(14,14,14,0.92) 0%, rgba(14,14,14,0.85) 50%, rgba(14,14,14,0.95) 100%)',
          }}
          onPointerDown={closeMenu}
        >
          <div
            className={`mx-auto w-full max-w-[1280px] transform transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            }`}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-2xl border border-[rgba(72,72,72,0.15)] bg-[#131313]/95 shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-[rgba(116,89,247,0.06)] backdrop-blur-[12px]">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  background: 'linear-gradient(150deg, rgba(116, 89, 247, 1) 0%, rgba(175, 162, 255, 1) 100%)',
                }}
                aria-hidden
              />
              <nav className="relative flex flex-col px-1 py-2 sm:px-2" aria-label="Mobile primary">
                {items.map(({ to, label, match }, i) => {
                  const active = match(pathname)
                  return (
                    <Link
                      key={to}
                      ref={i === 0 ? firstLinkRef : undefined}
                      to={to}
                      onClick={closeMenu}
                      className={`mx-1 rounded-xl px-4 py-[18px] text-left text-[13px] font-bold uppercase tracking-[0.1em] transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#7459F7] sm:py-5 ${
                        active
                          ? 'bg-[rgba(116,89,247,0.14)] text-[#AFA2FF] ring-1 ring-inset ring-[rgba(116,89,247,0.25)]'
                          : 'text-[#ABABAB] hover:bg-[rgba(72,72,72,0.28)] hover:text-white'
                      }`}
                    >
                      {label}
                    </Link>
                  )
                })}
              </nav>
              <div className="relative border-t border-[rgba(72,72,72,0.12)] p-4 sm:p-5">
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center rounded-[6px] py-[14px] text-[13px] font-bold uppercase tracking-[0.08em] text-black transition-[filter] duration-200 ease-out hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AFA2FF] sm:text-[14px]"
                  style={{
                    background: 'linear-gradient(169deg, rgba(116, 89, 247, 1) 0%, rgba(175, 162, 255, 1) 100%)',
                  }}
                >
                  Book Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
