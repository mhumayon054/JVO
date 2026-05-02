import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE, fadeUp, staggerContainer, viewportOnce } from './homeMotion'

const MEMBERS = [
  {
    name: 'Sufyan Iftekhar',
    role: 'Founder / CEO',
    img: '/figma/imagesuf.webp',
    bio: 'Battle-tested specialist with production experience in high-stakes AI systems.',
    linkedinUrl: 'https://www.linkedin.com/in/sufyan-iftekhar/',
    upworkUrl: 'https://www.upwork.com/freelancers/~01617abe4257f896dd?mp_source=share',
    githubUrl: 'https://github.com/SufyanIftekhar',
  },
  {
    name: 'Muhammad Faizan',
    role: 'Co-Founder / COO',
    img: '/figma/imagefaizan.webp',
    bio: 'Battle-tested specialist with production experience in high-stakes AI systems.',
    linkedinUrl: 'https://www.linkedin.com/in/faizanjvo/',
  },
  {
    name: 'Ahmad Ashfaq',
    role: 'CTO',
    img: '/figma/imageahm.webp',
    bio: 'Battle-tested specialist with production experience in high-stakes AI systems.',
    linkedinUrl: 'https://www.linkedin.com/in/ahmad-ashfaq-25aab419a/',
  },
]


function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function UpworkIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.075.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703 0 1.49-1.212 2.701-2.704 2.701zm0-8.142c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112a2.55 2.55 0 01-2.547 2.547 2.55 2.55 0 01-2.546-2.547V3.49H0v7.112c0 2.914 2.37 5.285 5.281 5.285 2.913 0 5.283-2.371 5.283-5.285V9.41c.533 1.113 1.192 2.244 1.992 3.236l-1.675 7.863h2.797l1.213-5.699c1.063.679 2.285 1.077 3.67 1.077 2.999 0 5.439-2.438 5.439-5.43 0-2.998-2.44-5.441-5.439-5.441z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function SocialLink({ href, label, children }) {
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center text-[#ABABAB] transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7459F7]"
    >
      {children}
    </a>
  )
}

function Chevron({ dir }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      {dir === 'prev' ? (
        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

function BenchCard({ member }) {
  const hasSocialLinks = member.linkedinUrl || member.upworkUrl || member.githubUrl

  return (
    <motion.div
      className="relative flex h-full gap-5 rounded-2xl border border-[rgba(72,72,72,0.15)] bg-[rgba(72,72,72,0.2)] p-6 sm:gap-6 md:p-7"
      whileHover={{
        borderColor: 'rgba(116, 89, 247, 0.22)',
        boxShadow: '0 22px 48px -28px rgba(0, 0, 0, 0.5)',
        transition: { duration: 0.3, ease: EASE },
      }}
    >
      <img
        src={member.img}
        alt={member.name}
        className="h-[112px] w-[112px] shrink-0 rounded-2xl object-cover sm:h-[124px] sm:w-[124px] lg:h-[132px] lg:w-[118px] xl:h-[136px] xl:w-[126px]"
      />

      <div className="flex min-w-0 flex-1 flex-col pb-14">
        <h3 className="text-[22px] font-bold leading-[1.15] tracking-[-0.02em] text-white md:text-[23px]">
          {member.name}
        </h3>
        <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#AFA2FF]">{member.role}</p>
        <p className="mt-4 text-[14px] leading-[1.5] text-[#ABABAB]">{member.bio}</p>

        {hasSocialLinks ? (
          <div className="absolute bottom-6 right-6 flex items-center gap-4 text-[#ABABAB]">
            <SocialLink href={member.linkedinUrl} label={`${member.name} LinkedIn profile`}>
              <LinkedInIcon />
            </SocialLink>
            <SocialLink href={member.upworkUrl} label={`${member.name} Upwork profile`}>
              <UpworkIcon />
            </SocialLink>
            <SocialLink href={member.githubUrl} label={`${member.name} GitHub profile`}>
  <GitHubIcon />
</SocialLink>
          </div>
        ) : null}
      </div>
    </motion.div>
  )
}

export function HomePrecisionBench() {
  const [index, setIndex] = useState(0)
  const n = MEMBERS.length

  const go = useCallback(
    (delta) => {
      setIndex((i) => (i + delta + n) % n)
    },
    [n],
  )

  return (
    <section className="py-16 md:py-20">
      <motion.div
        className="mx-auto w-full max-w-[1216px] px-4 sm:px-8"
        variants={staggerContainer(0.1, 0.14)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.h2
          variants={fadeUp(16)}
          className="text-center text-[36px] font-bold leading-[1.1] tracking-[-0.025em] text-white md:text-[40px]"
        >
          The Precision Bench
        </motion.h2>

        <motion.div className="mt-12 md:mt-14" variants={fadeUp(20)}>
          <motion.div
            className="hidden grid-cols-3 gap-6 lg:grid"
            variants={staggerContainer(0.06, 0.14)}
          >
            {MEMBERS.map((m) => (
              <motion.article key={m.name} variants={fadeUp(22)}>
                <BenchCard member={m} />
              </motion.article>
            ))}
          </motion.div>

          <div className="lg:hidden">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {MEMBERS.map((m) => (
                  <article key={m.name} className="w-full shrink-0 px-1">
                    <BenchCard member={m} />
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Previous team member"
                onClick={() => go(-1)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(72,72,72,0.2)] bg-[rgba(19,19,19,0.85)] text-white transition-[border-color,background-color,color] duration-200 hover:border-[rgba(116,89,247,0.45)] hover:bg-[rgba(116,89,247,0.08)] hover:text-[#AFA2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7459F7]"
              >
                <Chevron dir="prev" />
              </button>
              <div className="flex gap-2" role="tablist" aria-label="Team slides">
                {MEMBERS.map((m, i) => (
                  <button
                    key={m.name}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show ${m.name}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 w-2 rounded-full transition-[background-color,transform] duration-300 ${
                      i === index ? 'scale-110 bg-[#AFA2FF]' : 'bg-[rgba(72,72,72,0.6)] hover:bg-[rgba(171,171,171,0.5)]'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next team member"
                onClick={() => go(1)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(72,72,72,0.2)] bg-[rgba(19,19,19,0.85)] text-white transition-[border-color,background-color,color] duration-200 hover:border-[rgba(116,89,247,0.45)] hover:bg-[rgba(116,89,247,0.08)] hover:text-[#AFA2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7459F7]"
              >
                <Chevron dir="next" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
