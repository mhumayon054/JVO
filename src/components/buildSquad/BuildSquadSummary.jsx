function formatUsd(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export function BuildSquadSummary({ monthlyBurn, projectTotal, selectedCount }) {
  return (
    <aside className="w-full shrink-0 lg:w-[300px]">
      <div className="sticky top-6 rounded-lg border border-[rgba(72,72,72,0.15)] bg-[#131313] p-8">
        <h3 className="text-[10px] font-bold uppercase leading-[1.5] tracking-[0.2em] text-[#AFA2FF]">Estimate</h3>
        <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.1em] text-[#ABABAB]">Monthly burn</p>
        <p className="mt-2 text-[32px] font-bold leading-none tracking-[-0.04em] text-white">{formatUsd(monthlyBurn)}</p>
        <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.1em] text-[#ABABAB]">Project total (90 days)</p>
        <p className="mt-2 text-[24px] font-bold leading-none tracking-[-0.03em] text-[#AFA2FF]">{formatUsd(projectTotal)}</p>
        <p className="mt-6 border-t border-[rgba(72,72,72,0.15)] pt-6 text-[13px] leading-[1.5] text-[#6B6B6B]">
          {selectedCount === 0
            ? 'Select one or more squad members to see live pricing.'
            : `${selectedCount} specialist${selectedCount === 1 ? '' : 's'} selected · indicative studio engagement.`}
        </p>
      </div>
    </aside>
  )
}
