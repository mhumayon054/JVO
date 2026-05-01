import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from './homeMotion'
import { resendAIStrategyEmail, startAIStrategySubmission, submitAIStrategyQuestionnaire } from '../../lib/strapi'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function ResultList({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null
  return (
    <ul className="mt-2 space-y-2 text-left text-[14px] leading-[1.5] text-[#ABABAB]">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="rounded-md bg-[#151515] px-3 py-2">
          {item}
        </li>
      ))}
    </ul>
  )
}

export function AIStrategyBuilderSection() {
  const [mode, setMode] = useState('auto')
  const [ideaText, setIdeaText] = useState('')
  const [workEmail, setWorkEmail] = useState('')
  const [submissionId, setSubmissionId] = useState('')
  const [questionnaire, setQuestionnaire] = useState([])
  const [answers, setAnswers] = useState({})
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [result, setResult] = useState(null)
  const [resendingEmail, setResendingEmail] = useState(false)

  const isBusy = status === 'loading' || status === 'questionnaire_submitting'

  const canSubmit = useMemo(() => {
    return ideaText.trim().length >= 30 && isValidEmail(workEmail.trim()) && !isBusy
  }, [ideaText, workEmail, isBusy])

  function updateAnswer(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  async function onStart(event) {
    event.preventDefault()
    setError('')
    setEmailMessage('')
    setResult(null)

    if (!canSubmit) {
      setError('Provide a detailed idea (min 30 chars) and valid work email.')
      return
    }

    setStatus('loading')
    try {
      const response = await startAIStrategySubmission({
        mode,
        ideaText: ideaText.trim(),
        workEmail: workEmail.trim(),
        sourcePage: 'home',
      })
      const data = response?.data || {}
      setSubmissionId(data.id || '')

      if (data.status === 'questionnaire_ready') {
        setQuestionnaire(data.questionnaire || [])
        setAnswers({})
        setStatus('questionnaire_ready')
        return
      }

      setResult(data.strategyResult || null)
      setEmailMessage(data.emailMessage || '')
      setStatus('completed')
    } catch (err) {
      setError(err.message || 'Unable to generate strategy right now.')
      setStatus('error')
    }
  }

  async function onSubmitQuestionnaire(event) {
    event.preventDefault()
    setError('')
    setEmailMessage('')

    const hasEmpty = questionnaire.some((q) => !String(answers[q.id] || '').trim())
    if (hasEmpty) {
      setError('Please answer all follow-up questions before continuing.')
      return
    }

    setStatus('questionnaire_submitting')
    try {
      const response = await submitAIStrategyQuestionnaire(submissionId, answers)
      const data = response?.data || {}
      setResult(data.strategyResult || null)
      setEmailMessage(data.emailMessage || '')
      setStatus('completed')
    } catch (err) {
      setError(err.message || 'Unable to process questionnaire answers.')
      setStatus('error')
    }
  }

  async function onResendEmail() {
    if (!submissionId) return
    setError('')
    setResendingEmail(true)
    try {
      const response = await resendAIStrategyEmail(submissionId)
      const data = response?.data || {}
      setEmailMessage(data.emailMessage || 'Blueprint email re-sent.')
    } catch (err) {
      setError(err.message || 'Unable to resend email right now.')
    } finally {
      setResendingEmail(false)
    }
  }

  return (
    <motion.section className="py-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <motion.p
        variants={fadeUp(14)}
        className="inline-block rounded-xl border border-[rgba(72,72,72,0.15)] px-4 py-1 text-[12px] font-bold uppercase tracking-[0.1em] text-[#AFA2FF]"
      >
        AI-Powered
      </motion.p>
      <motion.h2 variants={fadeUp(18)} className="mt-4 text-[48px] font-bold tracking-[-0.025em] max-md:text-[32px]">
        AI Strategy Builder
      </motion.h2>
      <motion.div
        variants={fadeUp(22)}
        className="mt-4 grid grid-cols-1 rounded-2xl border border-[rgba(72,72,72,0.15)] bg-[rgba(72,72,72,0.2)] lg:grid-cols-2"
      >
        <div className="bg-[#131313] p-12 max-md:p-8">
          <p className="text-[16px] leading-[1.5] text-[#ABABAB]">
            Describe your vision to receive a technical roadmap and high-level architecture proposal instantly.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setMode('auto')}
              className={`rounded-md px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] ${
                mode === 'auto' ? 'bg-[#AFA2FF] text-black' : 'border border-[rgba(72,72,72,0.3)] text-[#ABABAB]'
              }`}
            >
              Auto Mode
            </button>
            <button
              type="button"
              onClick={() => setMode('deeper')}
              className={`rounded-md px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] ${
                mode === 'deeper' ? 'bg-[#AFA2FF] text-black' : 'border border-[rgba(72,72,72,0.3)] text-[#ABABAB]'
              }`}
            >
              Deeper Knowledge
            </button>
          </div>

          <form className="mt-8 space-y-6" onSubmit={onStart}>
            <div>
              <label htmlFor="ai-idea" className="mb-2 block text-[14px] uppercase tracking-[0.1em] text-[#AFA2FF]">
                What are you trying to build?
              </label>
              <textarea
                id="ai-idea"
                rows={6}
                value={ideaText}
                onChange={(event) => setIdeaText(event.target.value)}
                placeholder="e.g., A multi-tenant LLM platform for automated legal document analysis..."
                className="w-full resize-y rounded-md border border-transparent bg-[#191919] px-4 py-4 text-[16px] text-white placeholder:text-[#757575] focus:border-[#AFA2FF] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="ai-email" className="mb-2 block text-[14px] uppercase tracking-[0.1em] text-[#AFA2FF]">
                Work Email
              </label>
              <input
                id="ai-email"
                type="email"
                value={workEmail}
                onChange={(event) => setWorkEmail(event.target.value)}
                placeholder="alex@startup.io"
                className="w-full rounded-md border border-transparent bg-[#191919] px-4 py-[18px] text-[16px] text-white placeholder:text-[#757575] focus:border-[#AFA2FF] focus:outline-none"
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-md bg-gradient-to-r from-[#7459F7] to-[#AFA2FF] py-5 text-[18px] font-bold text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isBusy ? 'Generating...' : mode === 'deeper' ? 'Start Questionnaire' : 'Generate Strategy'}
            </button>

            {error ? <p className="text-sm text-[#ff8c8c]">{error}</p> : null}
          </form>

          {status === 'questionnaire_ready' ? (
            <form className="mt-8 space-y-5 border-t border-[rgba(72,72,72,0.25)] pt-6" onSubmit={onSubmitQuestionnaire}>
              <p className="text-[14px] text-[#ABABAB]">Answer these quick questions so we can refine your blueprint.</p>
              {questionnaire.map((q) => (
                <div key={q.id}>
                  <label className="mb-2 block text-[13px] uppercase tracking-[0.08em] text-[#AFA2FF]">{q.question}</label>
                  <textarea
                    rows={3}
                    value={answers[q.id] || ''}
                    onChange={(event) => updateAnswer(q.id, event.target.value)}
                    placeholder={q.placeholder || 'Type your answer...'}
                    className="w-full rounded-md border border-transparent bg-[#191919] px-4 py-3 text-[15px] text-white placeholder:text-[#757575] focus:border-[#AFA2FF] focus:outline-none"
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={isBusy}
                className="w-full rounded-md bg-gradient-to-r from-[#7459F7] to-[#AFA2FF] py-4 text-[16px] font-bold text-black disabled:opacity-60"
              >
                {isBusy ? 'Generating...' : 'Generate Final Blueprint'}
              </button>
            </form>
          ) : null}
        </div>

        <div className="p-8 md:p-12">
          <div className="h-full rounded-xl border border-[rgba(72,72,72,0.15)] bg-[#0F0F0F] p-6 md:p-8">
            {!result ? (
              <p className="text-center text-[#757575]">Your AI architecture blueprint will appear here once generated.</p>
            ) : (
              <div className="space-y-4">
                <p className="text-[12px] uppercase tracking-[0.1em] text-[#AFA2FF]">Generated Blueprint</p>
                <h3 className="text-[22px] font-bold">Executive Summary</h3>
                <p className="text-[14px] leading-[1.6] text-[#ABABAB]">{result.executive_summary}</p>

                <h4 className="text-[16px] font-bold text-white">Implementation Design</h4>
                <p className="text-[12px] uppercase tracking-[0.08em] text-[#8f8f8f]">Domain Model</p>
                <ResultList items={result.implementation_design?.domain_model} />
                <p className="text-[12px] uppercase tracking-[0.08em] text-[#8f8f8f]">Services</p>
                <ResultList items={result.implementation_design?.services} />
                <p className="text-[12px] uppercase tracking-[0.08em] text-[#8f8f8f]">API Contracts</p>
                <ResultList items={result.implementation_design?.api_contracts} />
                <p className="text-[12px] uppercase tracking-[0.08em] text-[#8f8f8f]">Data Model</p>
                <ResultList items={result.implementation_design?.data_model} />
                <p className="text-[12px] uppercase tracking-[0.08em] text-[#8f8f8f]">Background Jobs</p>
                <ResultList items={result.implementation_design?.background_jobs} />
                <p className="text-[12px] uppercase tracking-[0.08em] text-[#8f8f8f]">Testing and Quality</p>
                <ResultList items={result.implementation_design?.testing_and_quality} />

                <h4 className="text-[16px] font-bold text-white">Architecture Overview</h4>
                <p className="text-[14px] leading-[1.6] text-[#ABABAB]">{result.architecture_blueprint?.overview}</p>

                <h4 className="text-[16px] font-bold text-white">Core Components</h4>
                <ResultList items={result.architecture_blueprint?.components} />

                <h4 className="text-[16px] font-bold text-white">Risks and Mitigations</h4>
                <ul className="space-y-2 text-[14px] text-[#ABABAB]">
                  {(result.risks_and_mitigations || []).map((row, index) => (
                    <li key={`risk-${index}`} className="rounded-md bg-[#151515] px-3 py-2">
                      <strong className="text-white">Risk:</strong> {row.risk}
                      <br />
                      <strong className="text-white">Mitigation:</strong> {row.mitigation}
                    </li>
                  ))}
                </ul>

                <h4 className="text-[16px] font-bold text-white">Strengths</h4>
                <ResultList items={result.strengths} />

                <h4 className="text-[16px] font-bold text-white">Weaknesses</h4>
                <ResultList items={result.weaknesses} />

                <h4 className="text-[16px] font-bold text-white">Technical Roadmap</h4>
                <ul className="space-y-2 text-[14px] text-[#ABABAB]">
                  {(result.technical_roadmap || []).map((phase, index) => (
                    <li key={`phase-${index}`} className="rounded-md bg-[#151515] px-3 py-2">
                      <strong className="text-white">{phase.phase}</strong> ({phase.timeline})
                      <ResultList items={phase.outcomes || []} />
                    </li>
                  ))}
                </ul>

                <h4 className="text-[16px] font-bold text-white">Next Steps</h4>
                <ResultList items={result.next_steps} />

                {emailMessage ? <p className="rounded-md bg-[#151515] px-3 py-2 text-[13px] text-[#AFA2FF]">{emailMessage}</p> : null}
                {submissionId ? (
                  <button
                    type="button"
                    onClick={onResendEmail}
                    disabled={resendingEmail}
                    className="rounded-md border border-[rgba(175,162,255,0.45)] px-4 py-2 text-[13px] font-semibold text-[#AFA2FF] disabled:opacity-60"
                  >
                    {resendingEmail ? 'Resending Email...' : 'Resend Blueprint Email'}
                  </button>
                ) : null}
                {submissionId ? <p className="text-[12px] text-[#757575]">Submission ID: {submissionId}</p> : null}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
