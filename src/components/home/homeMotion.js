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

/** Primary gradient CTA — matches HomePage “Book Discovery Call” */
export const hoverPrimaryCta = {
  whileHover: { y: -2, boxShadow: '0 18px 40px -16px rgba(116, 89, 247, 0.35)' },
  whileTap: { scale: 0.985 },
  transition: { duration: 0.28, ease: EASE },
}

/** Compact press feedback for links / ghost buttons */
export const hoverTapSoft = {
  whileTap: { scale: 0.985 },
  transition: { duration: 0.16, ease: EASE },
}

/** Bordered surface — matches HomeSuccessStoriesSection cards */
export const hoverCardBorderGlow = {
  whileHover: {
    borderColor: 'rgba(116, 89, 247, 0.2)',
    transition: { duration: 0.35, ease: EASE },
  },
}

/** Media inside a framed card */
export const hoverMediaKen = {
  whileHover: { scale: 1.03, opacity: 0.82 },
  transition: { duration: 0.55, ease: EASE },
}

/** Founders-style framed media block */
export const hoverFramedMedia = {
  container: {
    whileHover: { borderColor: 'rgba(116, 89, 247, 0.2)', transition: { duration: 0.35, ease: EASE } },
  },
  image: hoverMediaKen,
}

