export function BuildSquadBottomBar({
  selectedCount,
  onDeploy,
  onExport,
  deployState = 'idle',
  exportState = 'idle',
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 overflow-x-clip border-t border-[rgba(72,72,72,0.15)] bg-[#131313]/95 px-4 py-4 backdrop-blur-md print:hidden sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="min-w-0 text-[12px] leading-[1.5] text-[#6B6B6B]">
          <span className="font-medium text-[#ABABAB]">{selectedCount}</span> selected · Squad configuration becomes a PDF brief.
        </p>

        <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row md:w-auto md:items-center md:gap-4">
          <button
            type="button"
            onClick={onExport}
            disabled={exportState === 'loading' || deployState === 'loading'}
            className="w-full rounded-[6px] border border-[rgba(72,72,72,0.15)] px-6 py-3 text-[14px] font-bold leading-[1.43] text-[#AFA2FF] transition-colors hover:border-[rgba(72,72,72,0.35)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto md:px-8"
          >
            {exportState === 'loading' ? 'Generating...' : 'Export PDF'}
          </button>

          <button
            type="button"
            onClick={onDeploy}
            disabled={deployState === 'loading'}
            className="w-full rounded-[6px] px-6 py-3 text-center text-[14px] font-bold leading-[1.43] text-black transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto md:px-8 lg:px-10"
            style={{
              background: 'linear-gradient(169deg, rgba(116, 89, 247, 1) 0%, rgba(175, 162, 255, 1) 100%)',
            }}
          >
            {deployState === 'loading' ? 'Submitting...' : 'Export and Deploy Squad'}
          </button>
        </div>
      </div>
    </div>
  )
}