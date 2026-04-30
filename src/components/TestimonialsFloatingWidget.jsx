import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

const TESTIMONIALS = [
  {
    quote:
      'JVO Labs helped us move from rough AI concept to a production-ready SaaS platform without the usual engineering chaos.',
    name: 'Marcus Vale',
    role: 'Founder, Quantive AI',
    metric: 'MVP shipped in 6 weeks',
  },
  {
    quote:
      'Their biggest strength is not just writing code. They think through architecture, scale, and product risk before building.',
    name: 'Elena Brooks',
    role: 'CEO, SignalForge',
    metric: 'Architecture-first delivery',
  },
  {
    quote:
      'We needed senior execution without hiring a full in-house team. JVO gave us exactly that: fast, technical, and accountable.',
    name: 'Daniel Hart',
    role: 'Co-Founder, NeuralDock',
    metric: 'Senior squad on demand',
  },
  {
    quote:
      'The platform was clean, fast, and built with long-term maintainability in mind. No messy prototype code.',
    name: 'Avery Collins',
    role: 'Product Lead, StackPilot',
    metric: 'Production-grade build',
  },
  {
    quote:
      'They understood the business case and turned it into a technical roadmap we could actually execute.',
    name: 'Noah Sterling',
    role: 'Managing Partner, VentureGrid',
    metric: 'Roadmap to launch',
  },
]

const EASE = [0.22, 1, 0.36, 1]
const DRAG_THRESHOLD = 55
const VELOCITY_THRESHOLD = 450

export function TestimonialsFloatingWidget() {
  const [isOpen, setIsOpen] = useState(true)
  const [[activeIndex, direction], setSlide] = useState([0, 1])
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const paginate = useCallback((nextDirection) => {
    setSlide(([currentIndex]) => {
      const nextIndex =
        (currentIndex + nextDirection + TESTIMONIALS.length) % TESTIMONIALS.length

      return [nextIndex, nextDirection]
    })
  }, [])

  const goToIndex = useCallback((nextIndex) => {
    setSlide(([currentIndex]) => {
      if (nextIndex === currentIndex) return [currentIndex, 0]

      return [nextIndex, nextIndex > currentIndex ? 1 : -1]
    })
  }, [])

  useEffect(() => {
    if (!isOpen || isHovered) return undefined

    const timer = window.setInterval(() => {
      paginate(1)
    }, 3800)

    return () => window.clearInterval(timer)
  }, [isOpen, isHovered, paginate])

  const handleDragEnd = (_, info) => {
    const swipeOffset = info.offset.x
    const swipeVelocity = info.velocity.x

    if (swipeOffset < -DRAG_THRESHOLD || swipeVelocity < -VELOCITY_THRESHOLD) {
      paginate(1)
      return
    }

    if (swipeOffset > DRAG_THRESHOLD || swipeVelocity > VELOCITY_THRESHOLD) {
      paginate(-1)
    }
  }

  const activeTestimonial = TESTIMONIALS[activeIndex]

  return (
    <div className="fixed bottom-7 right-4 z-[90] flex items-end justify-end sm:right-7">
      <AnimatePresence>
        {isOpen ? (
          <motion.aside
            key="testimonials-panel"
            aria-label="Client testimonials"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.82,
                    x: 48,
                    y: 72,
                    filter: 'blur(18px)',
                  }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                    filter: 'blur(0px)',
                  }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.18,
                    x: 208,
                    y: 136,
                    rotate: 2,
                    filter: 'blur(26px)',
                  }
            }
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.55, ease: EASE }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="absolute bottom-[76px] right-0 h-[285px] w-[calc(100vw-32px)] max-w-[640px] overflow-hidden rounded-[22px] border border-[rgba(72,72,72,0.18)] bg-[#0E0E0E]/85 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.58),0_0_60px_rgba(116,89,247,0.16)] backdrop-blur-[22px] sm:w-[640px] sm:p-5"
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#7459F7]/20 blur-[72px]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 left-10 h-44 w-44 rounded-full bg-[#AFA2FF]/10 blur-[80px]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_86%,rgba(116,89,247,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.055),transparent_42%)]"
              aria-hidden="true"
            />

            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#AFA2FF]">
                    Client Signals
                  </p>
                  <h2 className="mt-1 text-[18px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[20px]">
                    Founder feedback from high-velocity builds.
                  </h2>
                </div>

                <button
                  type="button"
                  aria-label="Minimize testimonials"
                  onClick={() => setIsOpen(false)}
                  className="group inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[rgba(72,72,72,0.22)] bg-[#131313]/80 text-[#ABABAB] transition-[border-color,background-color,color,transform] duration-200 ease-out hover:border-[rgba(116,89,247,0.42)] hover:bg-[rgba(116,89,247,0.1)] hover:text-white active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7459F7]"
                >
                  <span className="block h-[2px] w-3 rounded-full bg-current" />
                </button>
              </div>

              <div className="relative mt-4 min-h-0 flex-1 overflow-hidden rounded-2xl border border-[rgba(72,72,72,0.15)] bg-[#131313]/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] sm:p-5">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.article
                    key={activeTestimonial.name}
                    custom={direction}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            x: direction >= 0 ? 38 : -38,
                            filter: 'blur(8px)',
                          }
                    }
                    animate={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : {
                            opacity: 1,
                            x: 0,
                            filter: 'blur(0px)',
                          }
                    }
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            x: direction >= 0 ? -38 : 38,
                            filter: 'blur(8px)',
                          }
                    }
                    transition={{ duration: shouldReduceMotion ? 0.18 : 0.42, ease: EASE }}
                    drag={shouldReduceMotion ? false : 'x'}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.16}
                    onDragEnd={handleDragEnd}
                    className="flex h-full cursor-grab select-none touch-pan-y flex-col justify-between active:cursor-grabbing"
                  >
                    <div>
                      <div className="mb-3 inline-flex rounded-full border border-[rgba(116,89,247,0.24)] bg-[rgba(116,89,247,0.1)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#AFA2FF]">
                        {activeTestimonial.metric}
                      </div>

                      <p className="max-w-[540px] text-[15px] leading-[1.55] text-[#E7E7E7] sm:text-[16px]">
                        “{activeTestimonial.quote}”
                      </p>
                    </div>

                    <div className="mt-4 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[14px] font-bold text-white">
                          {activeTestimonial.name}
                        </p>
                        <p className="mt-1 text-[12px] leading-tight text-[#757575]">
                          {activeTestimonial.role}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5" aria-label="Testimonials navigation">
                        {TESTIMONIALS.map((testimonial, index) => (
                          <button
                            key={testimonial.name}
                            type="button"
                            aria-label={`Show testimonial ${index + 1}`}
                            aria-current={activeIndex === index}
                            onClick={() => goToIndex(index)}
                            className={`h-2 cursor-pointer rounded-full transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7459F7] ${
                              activeIndex === index
                                ? 'w-6 bg-[#AFA2FF]'
                                : 'w-2 bg-[#484848] hover:bg-[#7459F7]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={isOpen ? 'Testimonials are open' : 'Open testimonials'}
        onClick={() => setIsOpen(true)}
        whileHover={{ y: -2, scale: 1.025 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.22, ease: EASE }}
        className="group relative inline-flex h-[56px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[999px] border border-[rgba(175,162,255,0.32)] bg-[#0E0E0E]/90 px-4 text-[#F4F1FF] shadow-[0_18px_44px_rgba(116,89,247,0.28)] backdrop-blur-xl transition-colors duration-300 hover:border-[rgba(175,162,255,0.56)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#AFA2FF] sm:min-w-[154px]"
      >
        <span
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(175,162,255,0.26),transparent_34%),linear-gradient(135deg,rgba(116,89,247,0.24),rgba(175,162,255,0.08))]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-[3px] rounded-[999px] border border-white/10"
          aria-hidden="true"
        />

        <span className="relative z-[1] inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#AFA2FF]/15 text-[#AFA2FF] ring-1 ring-[#AFA2FF]/25">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[18px] w-[18px]"
            aria-hidden="true"
          >
            <path d="M7.5 9.5h4.8" />
            <path d="M7.5 13h7.2" />
            <path d="M8.2 18.5 5 21v-4.1A7.6 7.6 0 0 1 3.2 12C3.2 7.6 7.15 4 12 4s8.8 3.6 8.8 8-3.95 8-8.8 8a9.8 9.8 0 0 1-3.8-.75Z" />
            <path d="M16.5 8.2h.01" />
          </svg>
        </span>

        <span className="relative z-[1] hidden text-[12px] font-bold uppercase tracking-[0.14em] text-[#F4F1FF] sm:inline">
          Reviews
        </span>

        {!isOpen ? (
          <>
            <span
              className="absolute -inset-2 -z-10 rounded-full bg-[#7459F7]/35 blur-xl motion-safe:animate-pulse"
              aria-hidden="true"
            />
            <span
              className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#AFA2FF] shadow-[0_0_12px_rgba(175,162,255,0.9)]"
              aria-hidden="true"
            />
          </>
        ) : null}
      </motion.button>
    </div>
  )
}