import { Link } from 'react-router-dom'

export function PartnershipFooter() {
  const handleNewsletterSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <footer className="bg-[#131313]">
      <div className="mx-auto w-full max-w-[1280px] px-4 pb-10 pt-16 sm:px-8 sm:pt-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr_0.85fr_1.35fr] lg:gap-10">
          <div className="border-b border-[rgba(255,255,255,0.05)] pb-6 sm:border-0 sm:pb-0">
            <Link
              to="/"
              className="text-[20px] font-bold leading-[1.4] tracking-[0.0175em] text-white transition-colors duration-300 hover:text-[#AFA2FF]"
            >
              JVO Labs
            </Link>

            <p className="mt-[15px] max-w-[300px] text-[14px] leading-[1.625] tracking-[0.025em] text-[#ABABAB]">
              Precision engineering for the AI era. Building the foundations of next-gen digital infrastructure.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase leading-[2em] tracking-[0.1em] text-white">
              Navigation
            </p>

            <ul className="mt-4 space-y-4 text-[14px] leading-[1.43] tracking-[0.025em] text-[#ABABAB]">
              <li>
                <Link to="/services" className="transition-colors duration-300 hover:text-white">
                  Services
                </Link>
              </li>

              <li>
                <Link to="/case-studies" className="transition-colors duration-300 hover:text-white">
                  Case Studies
                </Link>
              </li>

              <li>
                <Link to="/partnership" className="transition-colors duration-300 hover:text-white">
                  Partnership
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase leading-[2em] tracking-[0.1em] text-white">
              Company
            </p>

            <ul className="mt-4 space-y-4 text-[14px] leading-[1.43] tracking-[0.025em] text-[#ABABAB]">
              <li>
                <Link to="/contact" className="transition-colors duration-300 hover:text-white">
                  Contact
                </Link>
              </li>

              <li>
                <Link to="/about-us" className="transition-colors duration-300 hover:text-white">
                  About Us
                </Link>
              </li>

              <li>
                <a href="#" className="transition-colors duration-300 hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase leading-[2em] tracking-[0.1em] text-white">
              Stay Updated
            </p>

            <p className="mt-4 max-w-[360px] text-[14px] leading-[1.625] tracking-[0.025em] text-[#ABABAB]">
              Get engineering notes, AI infrastructure insights, and product updates from JVO Labs.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-6 flex max-w-[380px] overflow-hidden rounded-[8px] border border-[rgba(255,255,255,0.12)] bg-[rgba(19,19,19,0.7)] transition-colors duration-300 focus-within:border-[rgba(175,162,255,0.55)]"
            >
              <input
                type="email"
                name="email"
                placeholder="Work email"
                aria-label="Work email"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[14px] leading-[1.4] tracking-[0.025em] text-white placeholder:text-[#8F8F8F] focus:outline-none"
              />

              <button
                type="submit"
                className="shrink-0 border-l border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)] px-5 py-3 text-[14px] font-semibold leading-[1.4] text-white transition-colors duration-300 hover:bg-[rgba(255,255,255,0.1)]"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-4 text-[12px] leading-[1.5] tracking-[0.025em] text-[#8F8F8F]">
              No spam. Only useful updates.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-[rgba(255,255,255,0.05)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[16px] leading-[1.5] text-[#ABABAB]">
            © 2024 JVO Labs. Precision Engineering for the AI Era.
          </p>

          <div className="flex items-center gap-6 text-[#ABABAB]">
            <a
              href="https://www.linkedin.com/company/jvolabs/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-300 hover:text-white"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            <a
              href="https://github.com/SufyanIftekhar"
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-300 hover:text-white"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}