import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const FAVICON_SRC = '/favicon.svg'
const MIN_VISIBLE_MS = 480
const FADE_OUT_MS = 320

export function RouteTransitionLoader() {
  const { pathname } = useLocation()
  const [mounted, setMounted] = useState(false)
  const [exiting, setExiting] = useState(false)
  const skipFirst = useRef(true)
  const timersRef = useRef([])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  useLayoutEffect(() => {
    if (skipFirst.current) {
      skipFirst.current = false
      return undefined
    }

    clearTimers()
    setMounted(true)
    setExiting(false)

    const t1 = window.setTimeout(() => setExiting(true), MIN_VISIBLE_MS)
    const t2 = window.setTimeout(() => {
      setMounted(false)
      setExiting(false)
    }, MIN_VISIBLE_MS + FADE_OUT_MS)
    timersRef.current = [t1, t2]

    return clearTimers
  }, [pathname])

  if (!mounted) return null

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[100] flex items-center justify-center transition-opacity ease-out ${
        exiting ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ transitionDuration: `${FADE_OUT_MS}ms` }}
      role="status"
      aria-live="polite"
      aria-label="Page transition"
    >
      <div
        className="absolute inset-0 bg-[#0E0E0E]/96 backdrop-blur-md supports-[backdrop-filter]:bg-[#0E0E0E]/92"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 45%, rgba(116, 89, 247, 0.5) 0%, transparent 65%)',
        }}
        aria-hidden
      />
      <div className="relative flex flex-col items-center gap-5">
        <div className="relative flex h-[72px] w-[72px] items-center justify-center">
          <div
            className="jvo-route-loader__glow absolute h-[52px] w-[52px] rounded-full bg-[#7459F7]/35 blur-2xl"
            aria-hidden
          />
          <img
            src={FAVICON_SRC}
            alt=""
            width={48}
            height={46}
            decoding="async"
            fetchPriority="low"
            className="jvo-route-loader__mark relative z-[1] h-[46px] w-[48px] select-none object-contain drop-shadow-[0_0_28px_rgba(175,162,255,0.35)]"
          />
        </div>
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-[rgba(175,162,255,0.5)] to-transparent" aria-hidden />
      </div>
    </div>
  )
}
