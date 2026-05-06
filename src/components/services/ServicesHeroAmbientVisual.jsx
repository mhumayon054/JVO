const PARTICLES = [
  { left: '14%', top: '18%', size: '3px', delay: '0s', driftX: '9px', driftY: '-7px' },
  { left: '26%', top: '74%', size: '2px', delay: '1.4s', driftX: '-7px', driftY: '-10px' },
  { left: '39%', top: '21%', size: '2px', delay: '2.1s', driftX: '6px', driftY: '8px' },
  { left: '62%', top: '15%', size: '3px', delay: '0.7s', driftX: '-8px', driftY: '7px' },
  { left: '78%', top: '37%', size: '2px', delay: '2.8s', driftX: '7px', driftY: '-9px' },
  { left: '83%', top: '70%', size: '3px', delay: '1.1s', driftX: '-9px', driftY: '-6px' },
  { left: '53%', top: '84%', size: '2px', delay: '3.2s', driftX: '8px', driftY: '-8px' },
  { left: '18%', top: '48%', size: '2px', delay: '3.8s', driftX: '6px', driftY: '9px' },
]

const NODES = [
  { left: '23%', top: '31%', delay: '0s' },
  { left: '37%', top: '65%', delay: '1.2s' },
  { left: '63%', top: '29%', delay: '0.6s' },
  { left: '73%', top: '60%', delay: '1.9s' },
]

export function ServicesHeroAmbientVisual() {
  return (
    <div className="jvo-services-ambient relative h-full w-full overflow-hidden rounded-lg" aria-hidden="true">
      <style>{`
        .jvo-services-ambient {
          isolation: isolate;
          background:
            radial-gradient(circle at 50% 44%, rgba(175, 162, 255, 0.15) 0%, rgba(116, 89, 247, 0.08) 34%, rgba(14, 14, 14, 0) 66%),
            radial-gradient(circle at 18% 20%, rgba(73, 196, 255, 0.08) 0%, rgba(73, 196, 255, 0) 31%),
            linear-gradient(145deg, rgba(28, 28, 28, 0.96) 0%, rgba(15, 15, 15, 0.98) 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            inset 0 0 0 1px rgba(175, 162, 255, 0.08);
        }

        .jvo-services-ambient::before {
          content: '';
          position: absolute;
          inset: -22%;
          z-index: 0;
          background:
            conic-gradient(from 135deg at 50% 50%, transparent 0deg, rgba(116, 89, 247, 0.16) 64deg, transparent 126deg, rgba(73, 196, 255, 0.08) 190deg, transparent 260deg, rgba(175, 162, 255, 0.12) 316deg, transparent 360deg);
          filter: blur(18px);
          opacity: 0.58;
          animation: jvo-services-ambient-drift 28s ease-in-out infinite;
        }

        .jvo-services-ambient::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(circle at center, black 0%, black 45%, transparent 78%);
          opacity: 0.22;
        }

        @keyframes jvo-services-ambient-drift {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(10deg) scale(1.04); }
        }

        @keyframes jvo-services-ambient-pulse {
          0%, 100% { opacity: 0.24; }
          50% { opacity: 0.72; }
        }

        @keyframes jvo-services-ambient-float {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.34; }
          50% { transform: translate3d(var(--drift-x), var(--drift-y), 0); opacity: 0.78; }
        }

        @keyframes jvo-services-ambient-orbit {
          0% { transform: translate3d(-50%, -50%, 0) rotate(0deg); }
          100% { transform: translate3d(-50%, -50%, 0) rotate(360deg); }
        }

        @keyframes jvo-services-ambient-flow {
          0% { stroke-dashoffset: 76; opacity: 0.12; }
          45% { opacity: 0.48; }
          100% { stroke-dashoffset: 0; opacity: 0.18; }
        }

        .jvo-services-ambient__link {
          stroke-dasharray: 54 22;
          animation: jvo-services-ambient-flow 7.5s ease-in-out infinite;
          animation-delay: var(--delay);
        }

        .jvo-services-ambient__particle {
          animation: jvo-services-ambient-float 8s ease-in-out infinite;
          animation-delay: var(--delay);
        }

        .jvo-services-ambient__node {
          animation: jvo-services-ambient-pulse 4.8s ease-in-out infinite;
          animation-delay: var(--delay);
        }

        .jvo-services-ambient__ring {
          animation: jvo-services-ambient-orbit 34s linear infinite;
        }

        .jvo-services-ambient__ring--reverse {
          animation-direction: reverse;
          animation-duration: 43s;
        }

        @media (prefers-reduced-motion: reduce) {
          .jvo-services-ambient,
          .jvo-services-ambient *,
          .jvo-services-ambient::before,
          .jvo-services-ambient::after {
            animation: none !important;
            transition: none !important;
          }

          .jvo-services-ambient__particle,
          .jvo-services-ambient__node,
          .jvo-services-ambient__link {
            opacity: 0.36;
          }
        }
      `}</style>

      <svg className="absolute inset-0 z-[1] h-full w-full" viewBox="0 0 374 374" fill="none" role="presentation">
        <defs>
          <linearGradient id="servicesAmbientLine" x1="88" y1="92" x2="290" y2="286" gradientUnits="userSpaceOnUse">
            <stop stopColor="#AFA2FF" stopOpacity="0" />
            <stop offset="0.48" stopColor="#AFA2FF" stopOpacity="0.58" />
            <stop offset="1" stopColor="#49C4FF" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id="servicesAmbientCore" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(187 187) rotate(90) scale(82)">
            <stop stopColor="#AFA2FF" stopOpacity="0.28" />
            <stop offset="1" stopColor="#7459F7" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="187" cy="187" r="102" stroke="rgba(175, 162, 255, 0.1)" strokeWidth="1" />
        <circle cx="187" cy="187" r="68" fill="url(#servicesAmbientCore)" />
        <path className="jvo-services-ambient__link" style={{ '--delay': '0s' }} d="M86 122 C132 90 177 106 204 143 S263 198 311 160" stroke="url(#servicesAmbientLine)" strokeWidth="1.2" strokeLinecap="round" />
        <path className="jvo-services-ambient__link" style={{ '--delay': '1.7s' }} d="M67 236 C118 206 143 262 190 234 S254 178 308 228" stroke="url(#servicesAmbientLine)" strokeWidth="1.2" strokeLinecap="round" />
        <path className="jvo-services-ambient__link" style={{ '--delay': '3.2s' }} d="M137 72 C156 132 130 174 175 204 S222 258 207 308" stroke="url(#servicesAmbientLine)" strokeWidth="1" strokeLinecap="round" />
      </svg>

      <div className="jvo-services-ambient__ring absolute left-1/2 top-1/2 z-[2] h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(175,162,255,0.08)]" />
      <div className="jvo-services-ambient__ring jvo-services-ambient__ring--reverse absolute left-1/2 top-1/2 z-[2] h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(73,196,255,0.07)]" />

      <div className="absolute left-1/2 top-1/2 z-[3] h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-[22px] border border-[rgba(175,162,255,0.14)] bg-[rgba(19,19,19,0.62)] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
        <div className="absolute inset-[16%] rounded-[18px] border border-[rgba(175,162,255,0.1)] bg-[radial-gradient(circle_at_50%_35%,rgba(175,162,255,0.18),rgba(116,89,247,0.04)_54%,transparent_100%)]" />
        <span className="jvo-services-ambient__node absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#AFA2FF] shadow-[0_0_22px_rgba(175,162,255,0.56)]" style={{ '--delay': '0.4s' }} />
      </div>

      {NODES.map((node) => (
        <span
          key={`${node.left}-${node.top}`}
          className="jvo-services-ambient__node absolute z-[4] h-2.5 w-2.5 rounded-full border border-[rgba(255,255,255,0.16)] bg-[#AFA2FF]/70 shadow-[0_0_18px_rgba(175,162,255,0.34)]"
          style={{ left: node.left, top: node.top, '--delay': node.delay }}
        />
      ))}

      {PARTICLES.map((particle) => (
        <span
          key={`${particle.left}-${particle.top}`}
          className="jvo-services-ambient__particle absolute z-[4] rounded-full bg-white/80 shadow-[0_0_12px_rgba(175,162,255,0.45)]"
          style={{
            left: particle.left,
            top: particle.top,
            height: particle.size,
            width: particle.size,
            '--delay': particle.delay,
            '--drift-x': particle.driftX,
            '--drift-y': particle.driftY,
          }}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 z-[5] rounded-lg bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_34%,rgba(0,0,0,0.18)_100%)]" />
    </div>
  )
}
