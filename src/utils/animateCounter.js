/**
 * Smooth ease-out: fast start, slow end (cubic ease-out).
 * @param {number} t 0..1
 */
function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

/**
 * @param {number} targetValue
 * @param {number|'auto'} decimalsOption
 * @returns {number}
 */
function resolveDecimals(targetValue, decimalsOption) {
  if (decimalsOption === 0 || decimalsOption === 1 || decimalsOption === 2) {
    return decimalsOption
  }
  const rounded = Math.round(targetValue)
  if (Math.abs(targetValue - rounded) < 1e-9) return 0
  const parts = String(targetValue).split('.')
  if (parts.length < 2) return 1
  return Math.min(parts[1].length, 2)
}

/**
 * Animates a numeric counter on a DOM element using requestAnimationFrame.
 *
 * @param {HTMLElement} element
 * @param {number} targetValue
 * @param {object} [options]
 * @param {number} [options.duration=1800] - ms
 * @param {string} [options.prefix='']
 * @param {string} [options.suffix='']
 * @param {number|'auto'} [options.decimals='auto']
 * @param {(n: number) => string} [options.format]
 */
export function animateCounter(element, targetValue, options = {}) {
  const {
    duration = 1800,
    prefix = '',
    suffix = '',
    format: customFormat,
    decimals: decimalsOption = 'auto',
  } = options

  const decimals = resolveDecimals(targetValue, decimalsOption)

  function formatNumberPart(n) {
    if (customFormat) return customFormat(n)
    if (decimals === 0) return String(Math.round(n))
    if (decimals === 2) return n.toFixed(2)
    return n.toFixed(decimals)
  }

  const from = 0
  const start = performance.now()

  function setText(current) {
    element.textContent = `${prefix}${formatNumberPart(current)}${suffix}`
  }

  function frame(now) {
    const elapsed = now - start
    const t = Math.min(1, elapsed / duration)
    const eased = easeOutCubic(t)
    const current = from + (targetValue - from) * eased
    setText(current)
    if (t < 1) {
      requestAnimationFrame(frame)
    } else {
      element.textContent = `${prefix}${formatNumberPart(targetValue)}${suffix}`
    }
  }

  requestAnimationFrame(frame)
}
