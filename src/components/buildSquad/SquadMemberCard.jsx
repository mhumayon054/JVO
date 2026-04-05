const skillKeys = ['velocity', 'security', 'ai']

export function SquadMemberCard({ member, selected, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(member.id)}
      className={`w-full rounded-lg border bg-[#131313] p-6 text-left transition-all ${
        selected
          ? 'border-[#7459F7] ring-2 ring-[#7459F7]/40'
          : 'border-[rgba(72,72,72,0.15)] hover:border-[rgba(72,72,72,0.3)]'
      }`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-[#262626]">
        <img src={member.avatar} alt="" className="h-full w-full object-cover opacity-90" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent 40%, rgba(14, 14, 14, 0.85) 100%)',
          }}
        />
        {selected && (
          <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#7459F7] text-[11px] font-bold text-white">
            ✓
          </span>
        )}
      </div>
      <p className="mt-4 text-[18px] font-bold leading-[1.22] tracking-[-0.02em] text-white">{member.name}</p>
      <p className="mt-1 text-[12px] font-bold uppercase leading-[1.33] tracking-[0.1em] text-[#AFA2FF]">{member.title}</p>
      <p className="mt-3 text-[14px] font-medium leading-[1.43] text-[#ABABAB]">
        ${member.monthlyRate.toLocaleString()}
        <span className="font-normal text-[#6B6B6B]"> / mo</span>
      </p>
      <div className="mt-4 space-y-2">
        {skillKeys.map((k) => (
          <div key={k} className="flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#262626]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${member.skills[k] * 100}%`,
                  background: 'linear-gradient(90deg, #7459F7 0%, #AFA2FF 100%)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </button>
  )
}
