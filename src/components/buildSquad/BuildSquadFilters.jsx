import { ROLE_FILTERS, SENIORITY_FILTERS } from '../../data/buildSquadMembers'

function FilterChip({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-3 py-2 text-left text-[12px] font-medium leading-[1.33] transition-colors ${
        active
          ? 'border-[#7459F7] bg-[rgba(116,89,247,0.12)] text-[#AFA2FF]'
          : 'border-[rgba(72,72,72,0.2)] bg-[#131313] text-[#ABABAB] hover:border-[rgba(72,72,72,0.35)] hover:text-white'
      }`}
    >
      {label}
    </button>
  )
}

export function BuildSquadFilters({ selectedRoles, selectedSeniority, onToggleRole, onToggleSeniority }) {
  return (
    <aside className="w-full shrink-0 border-b border-[rgba(72,72,72,0.15)] bg-[#0E0E0E] p-8 lg:w-[300px] lg:border-b-0 lg:border-r">
      <h2 className="text-[10px] font-bold uppercase leading-[1.5] tracking-[0.2em] text-[#AFA2FF]">Filters</h2>
      <p className="mt-2 text-[14px] leading-[1.43] text-[#ABABAB]">Refine specialists by role and seniority.</p>

      <div className="mt-8">
        <h3 className="text-[10px] font-bold uppercase leading-[1.5] tracking-[0.15em] text-white">Roles</h3>
        <div className="mt-3 flex flex-col gap-2">
          {ROLE_FILTERS.map((r) => (
            <FilterChip
              key={r.id}
              label={r.label}
              active={selectedRoles.includes(r.id)}
              onClick={() => onToggleRole(r.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-[10px] font-bold uppercase leading-[1.5] tracking-[0.15em] text-white">Seniority</h3>
        <div className="mt-3 flex flex-col gap-2">
          {SENIORITY_FILTERS.map((s) => (
            <FilterChip
              key={s.id}
              label={s.label}
              active={selectedSeniority.includes(s.id)}
              onClick={() => onToggleSeniority(s.id)}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
