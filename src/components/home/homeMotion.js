import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/** Premium ease — cubic-bezier similar to existing Tailwind tokens */
export const EASE = [0.22, 1, 0.36, 1]

export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -72px 0px',
}

export const viewportOnceLoose = {
  once: true,
  amount: 0.12,
  margin: '0px 0px -48px 0px',
}

export const transitionBase = { duration: 0.5, ease: EASE }

export const transitionSlow = { duration: 0.62, ease: EASE }

export function fadeUpHidden(y = 22) {
  return { opacity: 0, y }
}

export function fadeUpVisible(overrides = {}) {
  return {
    opacity: 1,
    y: 0,
    transition: { ...transitionBase, ...overrides },
  }
}

export function fadeUp(y = 22) {
  return {
    hidden: fadeUpHidden(y),
    visible: fadeUpVisible(),
  }
}

export function fadeFromX(x) {
  return {
    hidden: { opacity: 0, x },
    visible: {
      opacity: 1,
      x: 0,
      transition: transitionBase,
    },
  }
}

export function staggerContainer(delayChildren = 0.06, staggerChildren = 0.1) {
  return {
    hidden: {},
    visible: {
      transition: { delayChildren, staggerChildren },
    },
  }
}

/** Parent-only: staggers direct motion children (fade/slide). */
export const sectionStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.07 },
  },
}

export const MotionLink = motion(Link)
