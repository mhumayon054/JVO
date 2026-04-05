import { Link } from 'react-router-dom'

export function BuildSquadBottomBar({ selectedCount }) {
  const handleExport = () => {
    window.print()
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[rgba(72,72,72,0.15)] bg-[#131313]/95 px-4 py-4 backdrop-blur-md print:hidden sm:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] text-[#6B6B6B]">
          <span className="font-medium text-[#ABABAB]">{selectedCount}</span> selected · Squad configuration autosaved in session.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <button
            type="button"
            onClick={handleExport}
            className="rounded-[6px] border border-[rgba(72,72,72,0.15)] px-8 py-3 text-[14px] font-bold leading-[1.43] text-[#AFA2FF] transition-colors hover:border-[rgba(72,72,72,0.35)]"
          >
            Export brief
          </button>
          <Link
            to="/contact"
            className="rounded-[6px] px-10 py-3 text-center text-[14px] font-bold leading-[1.43] text-black transition-opacity hover:opacity-95"
            style={{
              background: 'linear-gradient(169deg, rgba(116, 89, 247, 1) 0%, rgba(175, 162, 255, 1) 100%)',
            }}
          >
            Deploy Squad
          </Link>
        </div>
      </div>
    </div>
  )
}
