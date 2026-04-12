import { useEffect, useRef } from 'react'
import { animateCounter } from '../utils/animateCounter'

/**
 * When `containerRef` intersects the viewport once, finds `[data-counter]` descendants
 * and runs `animateCounter` using data-target, data-prefix, data-suffix, data-decimals.
 */
export function useViewportCountersOnce(containerRef, { threshold = 0.2, duration = 1800 } = {}) {
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting || hasAnimatedRef.current) return

        hasAnimatedRef.current = true
        observer.disconnect()

        container.querySelectorAll('[data-counter]').forEach((node) => {
          if (!(node instanceof HTMLElement)) return
          const raw = node.getAttribute('data-target')
          if (raw == null) return
          const target = parseFloat(raw)
          if (Number.isNaN(target)) return

          const prefix = node.getAttribute('data-prefix') ?? ''
          const suffix = node.getAttribute('data-suffix') ?? ''
          const decAttr = node.getAttribute('data-decimals')
          let decimals = 'auto'
          if (decAttr === '0') decimals = 0
          else if (decAttr === '1') decimals = 1
          else if (decAttr === '2') decimals = 2

          animateCounter(node, target, {
            duration,
            prefix,
            suffix,
            decimals,
          })
        })
      },
      { threshold, rootMargin: '0px' }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [containerRef, threshold, duration])
}
