import { useMemo, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { fadeFromX, fadeUp, staggerContainer, viewportOnce } from '../components/home/homeMotion'
import { SiteHeader } from '../components/SiteHeader'
import { PartnershipFooter } from '../components/PartnershipFooter'
import { PageContent } from '../components/PageContent'
import { CaseStudiesVoidCta } from '../components/case-studies/CaseStudiesVoidCta'

const PROJECTS = [
  {
    title: 'Focus',
    label: 'Strategy Execution Platform',
    shortDescription: 'Project management, KPI tracking, and execution visibility for growing teams.',
    overview:
      'Focus is a modern project management and strategy execution platform designed to help organizations plan, track, and optimize work across teams. The platform combines project management, strategic hierarchy mapping, KPI tracking, and performance insights into a single structured system. Built as an MVP, Focus aims to simplify how companies manage complex workflows by connecting projects, tasks, KPIs, and organizational structure in one centralized dashboard.',
    value:
      'The platform is particularly valuable for PropTech companies, technology teams, and growing organizations that require clarity in execution, performance measurement, and cross-team alignment.',
    goal:
      'Focus is being developed to help organizations move beyond basic task management tools by introducing strategy-level visibility and structured execution frameworks, enabling better decision-making and measurable outcomes.',
    images: [
      '/figma/project1thumbnail.png',
      '/figma/project1a.jpg',
      '/figma/project1b.jpg',
      '/figma/project1c.jpg',
    ],
    capabilities: [
      'Project & Task Management - create, assign, and monitor projects, tasks, and execution phases',
      'Strategy Mapping - performance using quantifiable indicators linked to business objectives',
      'Organizational Structure Visibility - manage roles, users, and responsibilities across teams',
      'Quality & Progress Insights - visualize performance through dashboards and reporting tools',
      'Voucher & Reward Mechanisms - enable performance-based incentives and recognition',
      'PMO & Reporting Tools - provide structured governance and operational transparency',
    ],
    useCases: [
      'General project management for startups and SMEs',
      'PropTech project execution and operational oversight',
      'Strategy tracking for growing organizations',
      'KPI-driven performance management',
      'Team productivity optimization',
    ],
    stack: ['React', 'Dashboard UX', 'KPI Tracking', 'Strategy Mapping', 'PMO Tools'],
    highlights: [
      { value: 'MVP', label: 'PRODUCT STAGE' },
      { value: 'KPI', label: 'PERFORMANCE TRACKING' },
      { value: 'PMO', label: 'GOVERNANCE TOOLING' },
    ],
  },
  {
    title: 'Kenteken Rapport',
    label: 'AI Vehicle Intelligence MVP',
    shortDescription: 'Structured vehicle reports combining history, visual inspection, and AI-driven recommendations.',
    overview:
      'Kentekken Rapport is an AI-powered vehicle intelligence and reporting platform designed to help users make informed decisions when purchasing vehicles. The platform aggregates critical vehicle data and presents it through structured reports, combining historical insights, visual analysis, and predictive intelligence.',
    value:
      'Developed as an MVP for the Netherlands market, the solution provides detailed vehicle reports including damage history, vehicle condition insights, 3D visualizations, and AI-generated recommendations, enabling buyers to reduce uncertainty and make confident purchase decisions. The platform also includes a comprehensive admin panel that allows system administrators to manage user access, payments, and data integrations, ensuring scalability and flexibility as the platform evolves.',
    goal:
      'Kentekken Rapport aims to simplify vehicle purchasing decisions through data transparency, AI-powered insights, and structured reporting, helping users reduce risk and improve confidence when evaluating vehicles.',
    images: [
      '/figma/project2thumbnail.png',
      '/figma/project2a.jpg',
      '/figma/project2b.jpg',
      '/figma/project2c.jpg',
      '/figma/project2d.jpg',
    ],
    capabilities: [
      'Vehicle History Reports - access structured insights about vehicle background and condition',
      'Damage History Analysis - identify reported damages and historical risk indicators',
      '3D Vehicle Visualization - interactive 3D representations for enhanced inspection experience',
      'AI Generated Recommendations - intelligent insights to support better purchase decisions',
      'Predictive Forecasting - AI-driven analysis to assess potential future risks and value indicators',
      'Admin Management Panel - manage user permissions, payments, and configurable data modules',
      'Scalable Data Architecture - designed to support integration with multiple vehicle data sources',
    ],
    useCases: [
      'Vehicle purchase decision support',
      'Automotive data intelligence platforms',
      'AI-assisted vehicle inspection insights',
      'Risk awareness before vehicle investment',
      'Digital transformation in automotive marketplaces',
    ],
    stack: ['AI Reports', 'Vehicle Data', 'Admin Panel', 'Payments', 'Predictive Intelligence'],
    highlights: [
      { value: 'AI', label: 'INTELLIGENCE LAYER' },
      { value: '3D', label: 'VEHICLE VISUALIZATION' },
      { value: 'MVP', label: 'NETHERLANDS MARKET' },
    ],
  },
]

function getNextIndex(currentIndex, total) {
  return total > 0 ? (currentIndex + 1) % total : 0
}

function getPreviousIndex(currentIndex, total) {
  return total > 0 ? (currentIndex - 1 + total) % total : 0
}

function SliderButton({ children, label, onClick, className = '' }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white shadow-[0_14px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300 hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/25 ${className}`}
    >
      {children}
    </button>
  )
}

function ProjectImage({ src, alt, fallbackImage, imageKey, className }) {
  return (
    <motion.img
      key={imageKey || src}
      src={src}
      alt={alt}
      className={className}
      initial={{ opacity: 0, scale: 1.035 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onError={(event) => {
        if (event.currentTarget.src.includes(fallbackImage)) return
        event.currentTarget.src = fallbackImage
      }}
    />
  )
}

function ProjectMediaSlider({ project, onOpen }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const images = project.images?.length ? project.images : []
  const activeImage = images[activeIndex] || images[0]
  const hasMultipleImages = images.length > 1

  const goNext = (event) => {
    event.stopPropagation()
    setActiveIndex((current) => getNextIndex(current, images.length))
  }

  const goPrevious = (event) => {
    event.stopPropagation()
    setActiveIndex((current) => getPreviousIndex(current, images.length))
  }

  return (
    <div className="group relative min-h-[320px] overflow-hidden rounded-[16px] border border-[rgba(72,72,72,0.15)] bg-[#131313] sm:min-h-[420px] lg:min-h-[520px]">
      <button
        type="button"
        onClick={() => onOpen(project, activeIndex)}
        className="block h-full w-full cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/60"
        aria-label={`Open ${project.title} project gallery`}
      >
        <AnimatePresence mode="wait">
          <ProjectImage
            imageKey={`${project.title}-${activeIndex}`}
            src={activeImage}
            fallbackImage={project.images[0]}
            alt={`${project.title} project image ${activeIndex + 1}`}
            className="absolute inset-0 h-full w-full object-cover opacity-72 transition duration-500 group-hover:opacity-88"
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/52 to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(175,162,255,0.13),transparent_52%)]" aria-hidden />

        {hasMultipleImages ? (
          <div className="absolute inset-x-4 top-4 z-20 flex items-center justify-between opacity-100 transition duration-300 md:opacity-0 md:group-hover:opacity-100">
            <SliderButton label="Previous project image" onClick={goPrevious}>
              <span aria-hidden>‹</span>
            </SliderButton>
            <SliderButton label="Next project image" onClick={goNext}>
              <span aria-hidden>›</span>
            </SliderButton>
          </div>
        ) : null}

        {hasMultipleImages ? (
          <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2">
            {images.map((image, dotIndex) => (
              <button
                key={`${image}-${dotIndex}`}
                type="button"
                aria-label={`Show ${project.title} image ${dotIndex + 1}`}
                onClick={(event) => {
                  event.stopPropagation()
                  setActiveIndex(dotIndex)
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === dotIndex ? 'w-6 bg-[#AFA2FF]' : 'w-1.5 bg-white/35 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 z-10 p-[32px] pb-[28px] pt-[90px]">
          <h3 className="text-left text-[32px] font-bold leading-[1.1em] tracking-[-0.02em] text-white sm:text-[36px] lg:text-[40px]">
            Project: {project.title}
          </h3>
          <p className="mt-[10px] max-w-[620px] text-left text-[16px] font-normal leading-[1.5em] text-[#ABABAB] lg:text-[18px] lg:leading-[1.55em]">
            {project.shortDescription}
          </p>
        </div>
      </button>
    </div>
  )
}

function ProjectSummaryCard({ project, align = 'left' }) {
  return (
    <div className="box-border rounded-[16px] border-y-[1px] border-r-[1px] border-[rgba(72,72,72,0.15)] border-l-[4px] border-l-[#AFA2FF] bg-[#131313] py-[40px] pl-[32px] pr-[40px]">
      <div className="flex flex-col gap-[34px]">
        {project.highlights.map((item) => (
          <div key={item.label} className={align === 'right' ? 'text-right' : 'text-left'}>
            <p className="text-[40px] font-bold leading-[1em] tracking-[-0.03em] text-white tabular-nums lg:text-[44px]">
              {item.value}
            </p>
            <p className={`mt-[12px] max-w-[320px] text-[10px] font-bold uppercase leading-[1.5em] tracking-[0.12em] text-[#ABABAB] ${align === 'right' ? 'ml-auto' : ''}`}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TechStackCard({ project }) {
  return (
    <div className="box-border rounded-[16px] border-[1px] border-[rgba(72,72,72,0.15)] bg-[#131313] p-[40px]">
      <p className="text-left text-[11px] font-bold uppercase leading-[1.45em] tracking-[0.12em] text-white">TECHNOLOGY STACK</p>
      <div className="mt-[24px] flex flex-wrap gap-[10px]">
        {project.stack.map((item) => (
          <span key={item} className="inline-flex items-center rounded-[6px] bg-[#262626] px-[14px] py-[9px] text-left text-[13px] font-medium leading-[1.3em] text-[#E8E8E8]">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function BulletList({ items }) {
  return (
    <ul className="mt-[16px] space-y-[10px] text-left text-[15px] font-normal leading-[1.625em] text-[#ABABAB] sm:text-[16px]">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#AFA2FF]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ProjectDetailsGrid({ project, second = false }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const previewCapabilities = project.capabilities.slice(0, 3)
  const previewUseCases = project.useCases.slice(0, 3)

  return (
    <motion.div
      className="mt-[40px]"
      variants={staggerContainer(0.06, 0.1)}
    >
      <div className={`grid grid-cols-1 gap-[32px] sm:gap-x-[48px] ${second ? 'lg:grid-cols-3 lg:gap-[48px]' : 'sm:grid-cols-2 sm:gap-y-[40px]'}`}>
        <motion.div className="min-w-0" variants={fadeUp(14)}>
          <p className="text-[11px] font-bold uppercase leading-[1.45em] tracking-[0.14em] text-[#AFA2FF]">
            PROJECT OVERVIEW
          </p>

          <p className="mt-[16px] text-left text-[15px] font-normal leading-[1.625em] text-[#ABABAB] sm:text-[16px]">
            {project.overview}
          </p>

          {isExpanded ? (
            <p className="mt-[16px] text-left text-[15px] font-normal leading-[1.625em] text-[#ABABAB] sm:text-[16px]">
              {project.value}
            </p>
          ) : null}
        </motion.div>

        <motion.div className="min-w-0" variants={fadeUp(14)}>
          <p className="text-[11px] font-bold uppercase leading-[1.45em] tracking-[0.14em] text-[#AFA2FF]">
            KEY CAPABILITIES
          </p>

          <BulletList items={isExpanded ? project.capabilities : previewCapabilities} />
        </motion.div>

        <motion.div className="min-w-0" variants={fadeUp(14)}>
          <p className="text-[11px] font-bold uppercase leading-[1.45em] tracking-[0.14em] text-[#AFA2FF]">
            USE CASES
          </p>

          <BulletList items={isExpanded ? project.useCases : previewUseCases} />
        </motion.div>

        {isExpanded ? (
          <motion.div className="min-w-0" variants={fadeUp(14)}>
            <p className="text-[11px] font-bold uppercase leading-[1.45em] tracking-[0.14em] text-[#AFA2FF]">
              GOAL OF THE MVP
            </p>

            <p className="mt-[16px] text-left text-[15px] font-normal leading-[1.625em] text-[#ABABAB] sm:text-[16px]">
              {project.goal}
            </p>
          </motion.div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => setIsExpanded((current) => !current)}
        className="mt-[28px] inline-flex items-center justify-center rounded-full border border-[rgba(175,162,255,0.22)] bg-[rgba(175,162,255,0.06)] px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-[#AFA2FF] transition duration-300 hover:border-[rgba(175,162,255,0.5)] hover:bg-[rgba(175,162,255,0.12)] hover:text-white"
        aria-expanded={isExpanded}
      >
        {isExpanded ? 'Hide details' : 'View full case study'}
      </button>
    </motion.div>
  )
}

function FirstProjectSection({ project, onOpen }) {
  return (
    <motion.div
      className="grid w-full max-w-[1216px] grid-cols-1 gap-[48px] lg:grid-cols-[752px_416px] lg:items-start"
      variants={staggerContainer(0.08, 0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.div className="flex min-w-0 flex-col" variants={fadeUp(18)}>
        <ProjectMediaSlider project={project} onOpen={onOpen} />
        <ProjectDetailsGrid project={project} />
      </motion.div>

      <motion.div className="flex min-w-0 flex-col gap-[24px]" variants={fadeUp(18)}>
        <ProjectSummaryCard project={project} />
        <TechStackCard project={project} />
      </motion.div>
    </motion.div>
  )
}

function SecondProjectSection({ project, onOpen }) {
  return (
    <motion.div
      className="grid w-full max-w-[1216px] grid-cols-1 gap-[32px] lg:grid-cols-[416px_minmax(0,1fr)] lg:items-stretch"
      variants={staggerContainer(0.08, 0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.div className="relative min-h-0 overflow-hidden rounded-[16px]" variants={fadeUp(18)}>
        <ProjectSummaryCard project={project} align="right" />
      </motion.div>

      <motion.div variants={fadeUp(18)}>
        <ProjectMediaSlider project={project} onOpen={onOpen} />
      </motion.div>

      <motion.div
        className="col-span-1 mt-[8px] grid grid-cols-1 gap-[32px] sm:gap-x-[48px] lg:col-span-2 lg:mt-[40px] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-[48px]"
        variants={staggerContainer(0.06, 0.1)}
      >
        <motion.div variants={fadeUp(14)}>
          <TechStackCard project={project} />
        </motion.div>
        <motion.div variants={fadeUp(14)}>
          <ProjectDetailsGrid project={project} second />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function ProjectModal({ project, initialIndex, onClose }) {
  const images = useMemo(() => (project?.images?.length ? project.images : []), [project])
  const [activeIndex, setActiveIndex] = useState(initialIndex || 0)
  const hasMultipleImages = images.length > 1

  if (!project || !images.length) return null

  const goNext = () => setActiveIndex((current) => getNextIndex(current, images.length))
  const goPrevious = () => setActiveIndex((current) => getPreviousIndex(current, images.length))

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-xl sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project gallery`}
    >
      <motion.div
        className="relative w-full max-w-[1100px] overflow-hidden rounded-[28px] border border-white/10 bg-[#121212] shadow-[0_35px_90px_rgba(0,0,0,0.65)]"
        initial={{ y: 28, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 18, scale: 0.97, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute right-4 top-4 z-30 flex items-center gap-2">
          <span className="hidden rounded-full border border-white/10 bg-black/35 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#AFA2FF] backdrop-blur-md sm:inline-flex">
            {activeIndex + 1} / {images.length}
          </span>
          <button
            type="button"
            aria-label="Close project gallery"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/45 text-xl leading-none text-white backdrop-blur-md transition hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/25"
          >
            ×
          </button>
        </div>

        <div className="relative aspect-[16/10] min-h-[420px] max-h-[78vh] w-full">
          <AnimatePresence mode="wait">
            <ProjectImage
              imageKey={`modal-${project.title}-${activeIndex}`}
              src={images[activeIndex]}
              fallbackImage={project.images[0]}
              alt={`${project.title} large image ${activeIndex + 1}`}
              className="absolute inset-0 h-full w-full bg-[#0B0B0B] object-contain"
            />
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#121212] to-transparent" aria-hidden />

          {hasMultipleImages ? (
            <>
              <SliderButton label="Previous project image" onClick={goPrevious} className="absolute left-4 top-1/2 z-20 -translate-y-1/2 sm:left-6">
                <span aria-hidden>‹</span>
              </SliderButton>
              <SliderButton label="Next project image" onClick={goNext} className="absolute right-4 top-1/2 z-20 -translate-y-1/2 sm:right-6">
                <span aria-hidden>›</span>
              </SliderButton>
            </>
          ) : null}

          <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#AFA2FF]">{project.label}</p>
            <h3 className="mt-2 text-[28px] font-bold leading-[1.1] tracking-[-0.025em] text-white sm:text-[36px]">
              {project.title}
            </h3>
            <p className="mt-3 max-w-[620px] text-[15px] leading-[1.55] text-[#C9C9C9] sm:text-[16px]">
              {project.shortDescription}
            </p>
          </div>
        </div>

        {hasMultipleImages ? (
          <div className="flex gap-3 overflow-x-auto border-t border-white/10 bg-[#151515] p-4">
            {images.map((image, thumbnailIndex) => (
              <button
                key={`${image}-${thumbnailIndex}`}
                type="button"
                onClick={() => setActiveIndex(thumbnailIndex)}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition duration-300 sm:h-20 sm:w-32 ${
                  activeIndex === thumbnailIndex ? 'border-[#AFA2FF]' : 'border-white/10 opacity-65 hover:opacity-100'
                }`}
                aria-label={`Open image ${thumbnailIndex + 1}`}
              >
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    if (event.currentTarget.src.includes(project.images[0])) return
                    event.currentTarget.src = project.images[0]
                  }}
                />
              </button>
            ))}
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  )
}

export default function CaseStudiesPage() {
  const [openProject, setOpenProject] = useState(null)

  return (
    <>
      <main className="mx-auto w-full max-w-[1280px] bg-[#0E0E0E] text-white">
        <SiteHeader />

        <MotionConfig reducedMotion="user">
          <PageContent>
            <section className="w-full max-w-[1280px]">
              <motion.div
                className="mx-auto w-full max-w-[1216px]"
                variants={staggerContainer(0.08, 0.14)}
                initial="hidden"
                animate="visible"
              >
                <div className="flex flex-col gap-[24px]">
                  <motion.p
                    variants={fadeFromX(-14)}
                    className="text-left font-semibold uppercase text-[#AFA2FF]"
                    style={{ fontSize: '16px', lineHeight: '1.5em', letterSpacing: '0.2em', fontWeight: 600 }}
                  >
                    Real outcomes from partners
                  </motion.p>
                  <motion.h1
                    variants={fadeFromX(-18)}
                    className="whitespace-pre-line text-left text-[56px] font-bold leading-[1em] tracking-[-0.05em] text-white sm:text-[72px] lg:text-[96px]"
                  >
                    {`Engineering\nPrecision for the AI\nFrontier.`}
                  </motion.h1>
                  <motion.div variants={fadeFromX(-16)} className="max-w-[672px] pt-[8px]">
                    <p className="text-left text-[24px] font-normal leading-[1.3333333333333333em] text-[#ABABAB]">
                      We don&apos;t just build software. We engineer high-stakes AI infrastructure and products that deliver measurable competitive advantages.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </section>

            <section className="w-full max-w-[1280px]">
              <motion.div
                className="mx-auto flex w-full max-w-[1216px] flex-col gap-[64px]"
                variants={staggerContainer(0.1, 0.14)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <motion.h2
                  variants={fadeFromX(-18)}
                  className="text-left text-white"
                  style={{ fontSize: '36px', lineHeight: '1.1111111111111112em', fontWeight: 700, letterSpacing: '-0.025em' }}
                >
                  Success Stories
                </motion.h2>

                <FirstProjectSection
                  project={PROJECTS[0]}
                  onOpen={(project, imageIndex) => setOpenProject({ project, imageIndex })}
                />

                <SecondProjectSection
                  project={PROJECTS[1]}
                  onOpen={(project, imageIndex) => setOpenProject({ project, imageIndex })}
                />
              </motion.div>
            </section>

            <CaseStudiesVoidCta />
          </PageContent>
        </MotionConfig>

        <PartnershipFooter />
      </main>

      <AnimatePresence>
        {openProject ? (
          <ProjectModal
            project={openProject.project}
            initialIndex={openProject.imageIndex}
            onClose={() => setOpenProject(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}
