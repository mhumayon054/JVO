/**
 * Centered lock motif with layered rounded frames (Figma Omni-Commerce project card).
 */
export function OmniProjectLockVisual() {
  return (
    <div className="relative mx-auto mb-10 flex h-[168px] w-[168px] shrink-0 items-center justify-center sm:h-[180px] sm:w-[180px]">
      <div
        className="absolute inset-0 rounded-[32px] border border-[rgba(72,72,72,0.35)]"
        style={{
          background: 'linear-gradient(145deg, rgba(38,38,38,0.9) 0%, rgba(22,22,22,0.95) 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      />
      <div className="absolute inset-[10px] rounded-[26px] border border-[rgba(100,100,100,0.25)] bg-[#1C1C1C]" />
      <div className="absolute inset-[22px] rounded-[20px] border border-[rgba(175,162,255,0.12)] bg-[#222]" />
      <div
        className="absolute inset-[36px] flex items-center justify-center rounded-[14px] border border-[rgba(72,72,72,0.35)]"
        style={{
          background: 'linear-gradient(180deg, #2C2C2C 0%, #1A1A1A 100%)',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.35), 0 0 40px rgba(116,89,247,0.08)',
        }}
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path
            d="M7 11V8a5 5 0 0 1 10 0v3"
            stroke="#F5F5F5"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="5.5" y="11" width="13" height="10" rx="2" stroke="#F5F5F5" strokeWidth="1.4" />
        </svg>
      </div>
    </div>
  )
}
