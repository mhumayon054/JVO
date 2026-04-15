import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const SPRING = { stiffness: 88, damping: 28, mass: 0.48 }

const SCROLL_RANGE = 560

const VIDEO_SRC = '/videos/hero-ai.mp4'
const POSTER_SRC = '/images/hero-ai-poster.jpg'
const FALLBACK_IMG = '/figma/hero-chip.png'

/** Reverse scrub speed vs real-time (1 ≈ same pace as 1× forward). */
const REVERSE_SPEED = 1

export function HomeHeroVisual() {
  const { scrollY } = useScroll()
  const [isMobile, setIsMobile] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const videoRef = useRef(null)
  const isReversingRef = useRef(false)
  const rafRef = useRef(0)
  const lastFrameRef = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v || videoFailed) return

    const cancelReverseRaf = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }

    const reverseTick = (now) => {
      const video = videoRef.current
      if (!video || !isReversingRef.current) return

      const last = lastFrameRef.current || now
      const dt = Math.min(0.064, (now - last) / 1000)
      lastFrameRef.current = now

      let step = dt * REVERSE_SPEED
      const t = video.currentTime
      if (t < 0.14) {
        step *= Math.max(0.22, t / 0.14)
      }

      const next = Math.max(0, t - step)
      video.currentTime = next

      if (next <= 0.0008) {
        isReversingRef.current = false
        video.currentTime = 0
        lastFrameRef.current = 0
        rafRef.current = 0
        video.play().catch(() => {})
        return
      }

      rafRef.current = requestAnimationFrame(reverseTick)
    }

    const beginReverse = () => {
      cancelReverseRaf()
      v.pause()
      const dur = v.duration
      if (Number.isFinite(dur) && dur > 0 && v.currentTime < dur - 0.02) {
        v.currentTime = dur
      }
      isReversingRef.current = true
      lastFrameRef.current = performance.now()
      rafRef.current = requestAnimationFrame(reverseTick)
    }

    const onEnded = () => {
      if (!isReversingRef.current) {
        beginReverse()
      }
    }

    const onLoadedData = () => {
      v.play().catch(() => {})
    }

    v.addEventListener('ended', onEnded)
    v.addEventListener('loadeddata', onLoadedData)
    if (v.readyState >= 2) {
      v.play().catch(() => {})
    }

    return () => {
      cancelReverseRaf()
      v.removeEventListener('ended', onEnded)
      v.removeEventListener('loadeddata', onLoadedData)
      isReversingRef.current = false
      lastFrameRef.current = 0
    }
  }, [videoFailed])

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
          {!videoFailed ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-label="AI product visual"
              onError={() => setVideoFailed(true)}
            />
          ) : (
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={FALLBACK_IMG}
              alt="AI product visual"
              loading="lazy"
            />
          )}

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/40 via-transparent to-[#0E0E0E]/15"
            aria-hidden
          />
        </div>
      </motion.div>
    </div>
  )
}
