import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE, fadeFromX, fadeUp, staggerContainer, viewportOnce } from './homeMotion'

const STORIES = [
  {
    title: 'Focus',
    category: 'Strategy Execution Plateform',
    subtitle: 'Project management, KPI tracking, and execution visibility for growing teams.',
    alt: 'Strategy Execution MVP',
    fallbackImage: '/figma/project1thumbnail.png',
    images: [
      '/figma/project1thumbnail.png',
      '/figma/project1a.jpg',
      '/figma/project1b.jpg',
      '/figma/project1c.jpg',
    ],
  },
  {
    title: 'Kenteken Rapport',
    category: 'AI Vehicle Intelligence MVP',
    subtitle: 'Structured vehicle reports combining history, visual inspection, and AI-driven recommendations.',
    alt: 'AI Vehicle Intelligence MVP',
    fallbackImage: '/figma/project2thumbnail.png',
    images: [
      '/figma/project2thumbnail.png',
      '/figma/project2a.jpg',
      '/figma/project2b.jpg',
      '/figma/project2c.jpg',
      '/figma/project2d.jpg',
    ],
  },
]

// const AUTOPLAY_MS = 4000

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
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white shadow-[0_14px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300 hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/25 ${className}`}
    >
      {children}
    </button>
  )
}

function StoryImage({ src, fallbackImage, alt, className, imageKey }) {
  return (
    <motion.img
      key={imageKey || src}
      src={src}
      alt={alt}
      className={className}
      initial={{ opacity: 0, scale: 1.035 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={{ duration: 0.55, ease: EASE }}
      onError={(event) => {
        if (event.currentTarget.src.includes(fallbackImage)) return
        event.currentTarget.src = fallbackImage
      }}
    />
  )
}

function StoryCard({ story, index, onOpen }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const images = story.images?.length ? story.images : [story.fallbackImage]
  const hasMultipleImages = images.length > 1

  // useEffect(() => {
  //   if (!hasMultipleImages) return undefined

  //   const timer = window.setInterval(() => {
  //     setActiveIndex((current) => getNextIndex(current, images.length))
  //   }, AUTOPLAY_MS)

  //   return () => window.clearInterval(timer)
  // }, [hasMultipleImages, images.length])

  const goNext = () => setActiveIndex((current) => getNextIndex(current, images.length))
  const goPrevious = () => setActiveIndex((current) => getPreviousIndex(current, images.length))

  return (
    <motion.article
      variants={fadeUp(22)}
      className="group relative overflow-hidden rounded-2xl border border-[rgba(72,72,72,0.15)] outline-none"
      whileHover={{
        borderColor: 'rgba(116, 89, 247, 0.2)',
        transition: { duration: 0.35, ease: EASE },
      }}
    >
      <button
        type="button"
        onClick={() => onOpen(index, activeIndex)}
        className="block w-full cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/60"
        aria-label={`Open ${story.title} project gallery`}
      >
        <div className="relative aspect-[16/10] w-full md:aspect-[1.55/1] md:min-h-[320px]">
          <AnimatePresence mode="wait">
            <StoryImage
              imageKey={`${story.title}-${activeIndex}`}
              src={images[activeIndex]}
              fallbackImage={story.fallbackImage}
              alt={`${story.alt} image ${activeIndex + 1}`}
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:opacity-85"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/55 to-transparent" aria-hidden />

          {hasMultipleImages && (
            <div className="absolute inset-x-4 top-4 z-20 flex items-center justify-between opacity-100 transition duration-300 md:opacity-0 md:group-hover:opacity-100">
              <SliderButton label="Previous project image" onClick={goPrevious}>
                <span aria-hidden>‹</span>
              </SliderButton>
              <SliderButton label="Next project image" onClick={goNext}>
                <span aria-hidden>›</span>
              </SliderButton>
            </div>
          )}

          {hasMultipleImages && (
            <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2">
              {images.map((image, dotIndex) => (
                <button
                  key={`${image}-${dotIndex}`}
                  type="button"
                  aria-label={`Show image ${dotIndex + 1}`}
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
          )}

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <h3 className="mt-2 text-[24px] font-bold leading-[1.2] tracking-[-0.02em] text-white md:text-[28px]">
              {story.title}
            </h3>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#AFA2FF] mt-1">{story.category}</p>
            <p className="mt-2 max-w-[480px] text-[15px] leading-[1.45] text-[#ABABAB] md:text-[16px] md:leading-[1.5]">
              {story.subtitle}
            </p>
          </div>
        </div>
      </button>
    </motion.article>
  )
}

function StoryModal({ story, initialIndex, onClose }) {
  const images = useMemo(() => (story?.images?.length ? story.images : [story?.fallbackImage]), [story])
  const [activeIndex, setActiveIndex] = useState(initialIndex || 0)
  const hasMultipleImages = images.length > 1

  useEffect(() => {
    setActiveIndex(initialIndex || 0)
  }, [initialIndex, story?.title])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') setActiveIndex((current) => getNextIndex(current, images.length))
      if (event.key === 'ArrowLeft') setActiveIndex((current) => getPreviousIndex(current, images.length))
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [images.length, onClose])

  // useEffect(() => {
  //   if (!hasMultipleImages) return undefined

  //   const timer = window.setInterval(() => {
  //     setActiveIndex((current) => getNextIndex(current, images.length))
  //   }, AUTOPLAY_MS)

  //   return () => window.clearInterval(timer)
  // }, [hasMultipleImages, images.length])

  if (!story) return null

  const goNext = () => setActiveIndex((current) => getNextIndex(current, images.length))
  const goPrevious = () => setActiveIndex((current) => getPreviousIndex(current, images.length))

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-xl sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: EASE }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${story.title} project gallery`}
    >
      <motion.div
        className="relative w-full max-w-[1100px] overflow-hidden rounded-[28px] border border-white/10 bg-[#121212] shadow-[0_35px_90px_rgba(0,0,0,0.65)]"
        initial={{ y: 28, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 18, scale: 0.97, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
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

        <div className="relative aspect-[16/10] min-h-[420px] w-full max-h-[78vh]">
          <AnimatePresence mode="wait">
            <StoryImage
              imageKey={`modal-${story.title}-${activeIndex}`}
              src={images[activeIndex]}
              fallbackImage={story.fallbackImage}
              alt={`${story.alt} large image ${activeIndex + 1}`}
              className="absolute inset-0 h-full w-full object-contain bg-[#0B0B0B]"
            />
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#121212] to-transparent" aria-hidden />

          {hasMultipleImages && (
            <>
              <SliderButton
                label="Previous project image"
                onClick={goPrevious}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 sm:left-6"
              >
                <span aria-hidden>‹</span>
              </SliderButton>
              <SliderButton
                label="Next project image"
                onClick={goNext}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 sm:right-6"
              >
                <span aria-hidden>›</span>
              </SliderButton>
            </>
          )}

          <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#AFA2FF]">{story.category}</p>
            <h3 className="mt-2 text-[28px] font-bold leading-[1.1] tracking-[-0.025em] text-white sm:text-[36px]">
              {story.title}
            </h3>
            <p className="mt-3 max-w-[620px] text-[15px] leading-[1.55] text-[#C9C9C9] sm:text-[16px]">
              {story.subtitle}
            </p>
          </div>
        </div>

        {hasMultipleImages && (
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
                    if (event.currentTarget.src.includes(story.fallbackImage)) return
                    event.currentTarget.src = story.fallbackImage
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export function HomeSuccessStoriesSection() {
  const [openStory, setOpenStory] = useState(null)

  return (
    <section className="py-16 md:py-20">
      <motion.div
        className="mx-auto w-full max-w-[1216px] px-4 sm:px-8"
        variants={staggerContainer(0.1, 0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.h2
          variants={fadeFromX(-18)}
          className="text-[36px] font-bold leading-[1.1] tracking-[-0.025em] text-white md:text-[40px]"
        >
          Success Stories
        </motion.h2>
        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
          variants={staggerContainer(0.08, 0.14)}
        >
          {STORIES.map((story, index) => (
            <StoryCard
              key={story.title}
              story={story}
              index={index}
              onOpen={(storyIndex, imageIndex) => setOpenStory({ storyIndex, imageIndex })}
            />
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {openStory && (
          <StoryModal
            story={STORIES[openStory.storyIndex]}
            initialIndex={openStory.imageIndex}
            onClose={() => setOpenStory(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
