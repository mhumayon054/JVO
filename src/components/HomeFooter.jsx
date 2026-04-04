export function HomeFooter() {
  return (
    <footer className="border-t border-[rgba(72,72,72,0.15)] px-8 py-10">
      <div className="flex flex-col gap-10 md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-8">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-white">JVO Labs</p>
          <p className="mt-2 max-w-[290px] text-[12px] text-[#ABABAB]">Precision engineering for the AI era.</p>
        </div>
        <div className="text-[12px] text-[#ABABAB]">
          <p className="font-semibold uppercase tracking-[0.1em] text-[#AFA2FF]">Services</p>
          <p className="mt-2">Product Development</p>
          <p>Dedicated Teams</p>
          <p>MVP Launch</p>
        </div>
        <div className="text-[12px] text-[#ABABAB]">
          <p className="font-semibold uppercase tracking-[0.1em] text-[#AFA2FF]">Company</p>
          <p className="mt-2">About</p>
          <p>Case Studies</p>
          <p>Contact</p>
        </div>
        <div className="text-[12px] text-[#ABABAB]">
          <p className="font-semibold uppercase tracking-[0.1em] text-[#AFA2FF]">Social</p>
          <p className="mt-2">LinkedIn</p>
          <p>X</p>
        </div>
      </div>
    </footer>
  )
}
