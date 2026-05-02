import { useEffect, useRef, useState } from 'react'

const VIDEO_SRC = '/videos/hero-ai-pingpong.mp4'
const POSTER_SRC = '/images/hero-ai-poster.jpg'
const FALLBACK_IMG = '/figma/hero-chip.png'

/** Reverse scrub speed vs real-time (1 ≈ same pace as 1× forward). */
const REVERSE_SPEED = 1

export function HomeHeroVisual() {
  const [videoFailed, setVideoFailed] = useState(false)
  const videoRef = useRef(null)
  const isReversingRef = useRef(false)
  const rafRef = useRef(0)
  const lastFrameRef = useRef(0)

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

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-8 top-8 h-[360px] w-[360px] rounded-full bg-[#7459F7] opacity-20 blur-[120px]" />

      <div className="relative h-[460px] w-full max-md:h-[320px]">
        <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-[#08080B] shadow-[0_35px_110px_rgba(175,162,255,0.12)]">
          {!videoFailed ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-screen"
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              autoPlay
              muted
              playsInline
              preload="metadata"
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
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(175,162,255,0.16),transparent_56%)]"
            aria-hidden
          />

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#AFA2FF]/10 via-transparent to-black/55"
            aria-hidden
          />

          <div
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.88)]"
            aria-hidden
          />
        </div>
      </div>
    </div>
  )
}