export function CaseStudyCard({ imageSrc, stat, title, description, widthClass }) {
  return (
    <article
      className={`box-border max-w-full shrink-0 overflow-hidden rounded-[16px] border-[1px] border-[rgba(72,72,72,0.15)] ${widthClass}`}
    >
      <div className="relative h-[363px] w-full">
        <img src={imageSrc} alt="" className="absolute inset-0 h-[363px] w-full object-cover opacity-[0.6]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(0deg, rgba(14, 14, 14, 1) 0%, rgba(14, 14, 14, 0.2) 50%, rgba(14, 14, 14, 0) 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-[48px]">
          <div className="pb-[16px]">
            <p className="text-left text-[48px] font-bold leading-[1em] text-[#AFA2FF]">{stat}</p>
          </div>
          <div className="pb-[8px]">
            <h3 className="text-left text-[24px] font-bold leading-[1.3333333333333333em] text-white">{title}</h3>
          </div>
          <p className="whitespace-pre-line text-left text-[16px] font-normal leading-[1.5em] text-[#ABABAB]">{description}</p>
        </div>
      </div>
    </article>
  )
}
