/**
 * Marketing page body — horizontal rhythm matches Insights: px-4 mobile, sm:px-8 from sm.
 * @param {string} gapClass - default matches Insights vertical section gap on mobile/desktop
 */
export function PageContent({ children, gapClass = 'gap-16 lg:gap-[128px]' }) {
  return (
    <div className={`flex flex-col px-4 pb-20 pt-8 sm:px-8 lg:pb-20 lg:pt-[24px] ${gapClass}`}>{children}</div>
  )
}
