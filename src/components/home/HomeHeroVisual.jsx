import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const SPRING = { stiffness: 88, damping: 28, mass: 0.48 }

const SCROLL_RANGE = 560

export function HomeHeroVisual() {
  const { scrollY } = useScroll()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const m = isMobile ? 0.45 : 1

  const yRaw = useTransform(scrollY, [0, SCROLL_RANGE], [0, -44 * m])
  const scaleRaw = useTransform(scrollY, [0, SCROLL_RANGE], [1, 1 + 0.045 * m])
  const rotateZRaw = useTransform(scrollY, [0, SCROLL_RANGE], [0, -1.1 * m])
  const rotateXRaw = useTransform(scrollY, [0, SCROLL_RANGE], [0, 1.4 * m])
  const rotateYRaw = useTransform(scrollY, [0, SCROLL_RANGE], [0, 0.85 * m])

  const y = useSpring(yRaw, SPRING)
  const scale = useSpring(scaleRaw, SPRING)
  const rotateZ = useSpring(rotateZRaw, SPRING)
  const rotateX = useSpring(rotateXRaw, SPRING)
  const rotateY = useSpring(rotateYRaw, SPRING)

  return (
    <div className="relative [perspective:1100px]">
      <div className="pointer-events-none absolute left-8 top-8 h-[360px] w-[360px] rounded-full bg-[#7459F7] opacity-20 blur-[120px]" />

      <motion.div
        className="relative h-[460px] w-full max-md:h-[320px] will-change-transform"
        style={{
          y,
          scale,
          rotateX,
          rotateY,
          rotateZ,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[rgba(72,72,72,0.15)] bg-[#0a0a0a] shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
          <img
            className="relative h-full w-full object-cover"
            src="/figma/hero-chip.png"
            alt="AI processor visual"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </motion.div>
    </div>
  )
}
