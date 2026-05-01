import { factories } from '@strapi/strapi'
import OpenAI from 'openai'
import PDFDocument from 'pdfkit'
import nodemailer from 'nodemailer'

const UID = 'api::ai-strategy-submission.ai-strategy-submission'
const rateWindowMs = Number(process.env.AI_STRATEGY_RATE_WINDOW_MS || 10 * 60 * 1000)
const rateMaxAttempts = Number(process.env.AI_STRATEGY_RATE_MAX_ATTEMPTS || 5)
const rateBuckets = new Map<string, { count: number; resetAt: number }>()

const strategySchema = {
  name: 'ai_strategy_blueprint',
  schema: {
    type: 'object',
    additionalProperties: false,
    required: [
      'executive_summary',
      'implementation_design',
      'architecture_blueprint',
      'technical_roadmap',
      'technical_specs',
      'risks_and_mitigations',
      'strengths',
      'weaknesses',
      'assumptions',
      'next_steps',
    ],
    properties: {
      executive_summary: { type: 'string' },
      implementation_design: {
        type: 'object',
        additionalProperties: false,
        required: ['domain_model', 'services', 'api_contracts', 'data_model', 'background_jobs', 'testing_and_quality'],
        properties: {
          domain_model: { type: 'array', items: { type: 'string' } },
          services: { type: 'array', items: { type: 'string' } },
          api_contracts: { type: 'array', items: { type: 'string' } },
          data_model: { type: 'array', items: { type: 'string' } },
          background_jobs: { type: 'array', items: { type: 'string' } },
          testing_and_quality: { type: 'array', items: { type: 'string' } },
        },
      },
      architecture_blueprint: {
        type: 'object',
        additionalProperties: false,
        required: ['overview', 'components', 'data_flow'],
        properties: {
          overview: { type: 'string' },
          components: { type: 'array', items: { type: 'string' } },
          data_flow: { type: 'array', items: { type: 'string' } },
        },
      },
      technical_roadmap: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['phase', 'timeline', 'outcomes'],
          properties: {
            phase: { type: 'string' },
            timeline: { type: 'string' },
            outcomes: { type: 'array', items: { type: 'string' } },
          },
        },
      },
      technical_specs: {
        type: 'object',
        additionalProperties: false,
        required: ['stack', 'security', 'observability', 'cost_notes'],
        properties: {
          stack: { type: 'array', items: { type: 'string' } },
          security: { type: 'array', items: { type: 'string' } },
          observability: { type: 'array', items: { type: 'string' } },
          cost_notes: { type: 'array', items: { type: 'string' } },
        },
      },
      risks_and_mitigations: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['risk', 'mitigation'],
          properties: {
            risk: { type: 'string' },
            mitigation: { type: 'string' },
          },
        },
      },
      strengths: { type: 'array', items: { type: 'string' } },
      weaknesses: { type: 'array', items: { type: 'string' } },
      assumptions: { type: 'array', items: { type: 'string' } },
      next_steps: { type: 'array', items: { type: 'string' } },
    },
  },
}

function asText(input: unknown) {
  return String(input || '').trim()
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value: unknown) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null
  return new OpenAI({ apiKey })
}

function getValidVectorStoreId() {
  const raw = asText(process.env.OPENAI_VECTOR_STORE_ID)
  if (!raw || raw.includes('...')) return ''
  return /^[a-zA-Z0-9_-]+$/.test(raw) ? raw : ''
}

function flattenOutputText(result: any) {
  if (typeof result?.output_text === 'string' && result.output_text) return result.output_text
  const texts: string[] = []
  const outputs = Array.isArray(result?.output) ? result.output : []
  for (const item of outputs) {
    const content = Array.isArray(item?.content) ? item.content : []
    for (const chunk of content) {
      if (chunk?.type === 'output_text' && chunk?.text) texts.push(String(chunk.text))
      if (chunk?.type === 'text' && chunk?.text) texts.push(String(chunk.text))
    }
  }
  return texts.join('\n').trim()
}

function getUsage(result: any) {
  return result?.usage || null
}

function enforceRateLimit(ctx: any, email: string) {
  const ip = String(ctx.request.ip || ctx.request.ips?.[0] || 'unknown')
  const key = `${ip}:${email}`
  const now = Date.now()
  const current = rateBuckets.get(key)
  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + rateWindowMs })
    return
  }
  if (current.count >= rateMaxAttempts) {
    const seconds = Math.max(1, Math.ceil((current.resetAt - now) / 1000))
    const err: any = new Error(`Rate limit reached. Try again in ${seconds}s.`)
    err.status = 429
    throw err
  }
  current.count += 1
}

async function moderateInput(openai: OpenAI, ideaText: string) {
  const res = await openai.moderations.create({
    model: 'omni-moderation-latest',
    input: ideaText,
  })
  const flagged = Boolean(res?.results?.[0]?.flagged)
  return { flagged, details: res?.results?.[0] || null }
}

async function fetchRagContext(openai: OpenAI, query: string) {
  const vectorStoreId = getValidVectorStoreId()
  if (!vectorStoreId) return []

  try {
    const anyOpenAI: any = openai
    if (!anyOpenAI.vectorStores?.search) return []
    const result = await anyOpenAI.vectorStores.search(vectorStoreId, {
      query,
      max_num_results: 6,
    })
    const rows = Array.isArray(result?.data) ? result.data : []
    return rows
      .map((row: any, index: number) => {
        const text = asText(row?.content?.[0]?.text || row?.text || '')
        if (!text) return ''
        return `Source ${index + 1}: ${text}`
      })
      .filter(Boolean)
  } catch {
    return []
  }
}

async function buildQuestionnaire(openai: OpenAI, ideaText: string) {
  const model = process.env.OPENAI_MODEL_QUESTIONNAIRE || 'gpt-4.1-mini'
  const response = await openai.responses.create({
    model,
    input: [
      {
        role: 'system',
        content:
          'You generate concise non-technical client discovery questions. Return JSON array only with 6 items. Each item: {id,question,placeholder}.',
      },
      {
        role: 'user',
        content: `Idea:\n${ideaText}`,
      },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'questionnaire',
        strict: true,
        schema: {
          type: 'object',
          additionalProperties: false,
          required: ['questions'],
          properties: {
            questions: {
              type: 'array',
              minItems: 6,
              maxItems: 8,
              items: {
                type: 'object',
                additionalProperties: false,
                required: ['id', 'question', 'placeholder'],
                properties: {
                  id: { type: 'string' },
                  question: { type: 'string' },
                  placeholder: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  })

  const text = flattenOutputText(response)
  const parsed = JSON.parse(text)
  return { questions: parsed.questions || [], usage: getUsage(response) }
}

async function buildStrategy(openai: OpenAI, payload: { ideaText: string; mode: string; answers?: Record<string, string>; email: string }) {
  const model = process.env.OPENAI_MODEL_STRATEGY || 'gpt-4.1'
  const vectorStoreId = getValidVectorStoreId()

  const prompt = {
    role: 'system' as const,
    content:
      [
        'You are a senior software engineer and solution architect.',
        'Produce practical, execution-ready output focused on software system design and implementation.',
        'Be explicit about assumptions and constraints. Avoid hype and unknown claims.',
        'Default to cloud-agnostic recommendations and avoid cloud-vendor-specific services unless the user explicitly requests a specific provider.',
        'Prioritize application architecture details: domain boundaries, modules/services, data model, API contracts, background jobs, event flows, security controls, testing strategy, and delivery sequencing.',
        'For stack recommendations, prioritize frameworks, languages, databases, queues, caching, and observability tooling in vendor-neutral terms.',
        'If retrieved context is cloud-skewed, do not mirror that bias; keep the final output implementation-centric and software-engineering focused.',
        'Never make the response primarily about Azure, AWS, or GCP unless the user asked for it.',
      ].join(' '),
  }

  const ragContext = await fetchRagContext(openai, payload.ideaText)

  const userContent = [
    `Mode: ${payload.mode}`,
    `Client email: ${payload.email}`,
    'Idea:',
    payload.ideaText,
    payload.answers ? `Questionnaire answers:\n${JSON.stringify(payload.answers, null, 2)}` : '',
    ragContext.length ? `Knowledge context:\n${ragContext.join('\n\n')}` : 'Knowledge context: unavailable',
    'Return grounded strategy. If uncertain, state assumptions clearly.',
    'The implementation_design section is mandatory and must be concrete, implementation-ready, and specific to the product idea.',
  ]
    .filter(Boolean)
    .join('\n\n')

  const params: any = {
    model,
    input: [prompt, { role: 'user', content: userContent }],
    text: {
      format: {
        type: 'json_schema',
        ...strategySchema,
        strict: true,
      },
    },
  }

  if (vectorStoreId) {
    params.tools = [{ type: 'file_search', vector_store_ids: [vectorStoreId] }]
  }

  const response = await openai.responses.create(params)
  const text = flattenOutputText(response)
  const strategy = JSON.parse(text)
  return { strategy, usage: getUsage(response), ragContextCount: ragContext.length }
}

async function renderStrategyPdf(strategy: any, meta: { ideaText: string; mode: string; id: string }) {
  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 42 })
    const chunks: Buffer[] = []

    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    doc.fontSize(20).text('AI Strategy Blueprint', { underline: true })
    doc.moveDown(0.3)
    doc.fontSize(10).text(`Submission: ${meta.id}`)
    doc.text(`Mode: ${meta.mode}`)
    doc.moveDown(0.7)

    doc.fontSize(13).text('Client Idea')
    doc.fontSize(10).text(meta.ideaText)
    doc.moveDown(0.6)

    doc.fontSize(13).text('Executive Summary')
    doc.fontSize(10).text(strategy.executive_summary || '')

    doc.moveDown(0.6)
    doc.fontSize(13).text('Implementation Design')
    const impl = strategy.implementation_design || {}
    doc.fontSize(11).text('Domain Model')
    for (const item of impl.domain_model || []) doc.fontSize(10).text(`- ${item}`)
    doc.moveDown(0.2)
    doc.fontSize(11).text('Services')
    for (const item of impl.services || []) doc.fontSize(10).text(`- ${item}`)
    doc.moveDown(0.2)
    doc.fontSize(11).text('API Contracts')
    for (const item of impl.api_contracts || []) doc.fontSize(10).text(`- ${item}`)
    doc.moveDown(0.2)
    doc.fontSize(11).text('Data Model')
    for (const item of impl.data_model || []) doc.fontSize(10).text(`- ${item}`)
    doc.moveDown(0.2)
    doc.fontSize(11).text('Background Jobs')
    for (const item of impl.background_jobs || []) doc.fontSize(10).text(`- ${item}`)
    doc.moveDown(0.2)
    doc.fontSize(11).text('Testing and Quality')
    for (const item of impl.testing_and_quality || []) doc.fontSize(10).text(`- ${item}`)

    doc.moveDown(0.6)
    doc.fontSize(13).text('Architecture Overview')
    doc.fontSize(10).text(strategy.architecture_blueprint?.overview || '')

    doc.moveDown(0.6)
    doc.fontSize(13).text('Core Components')
    for (const item of strategy.architecture_blueprint?.components || []) doc.fontSize(10).text(`- ${item}`)

    doc.moveDown(0.5)
    doc.fontSize(13).text('Data Flow')
    for (const item of strategy.architecture_blueprint?.data_flow || []) doc.fontSize(10).text(`- ${item}`)

    doc.moveDown(0.6)
    doc.fontSize(13).text('Technical Roadmap')
    for (const phase of strategy.technical_roadmap || []) {
      doc.fontSize(11).text(`${phase.phase} (${phase.timeline})`)
      for (const outcome of phase.outcomes || []) doc.fontSize(10).text(`- ${outcome}`)
      doc.moveDown(0.2)
    }

    doc.moveDown(0.4)
    doc.fontSize(13).text('Risks and Mitigations')
    for (const row of strategy.risks_and_mitigations || []) {
      doc.fontSize(10).text(`Risk: ${row.risk}`)
      doc.fontSize(10).text(`Mitigation: ${row.mitigation}`)
      doc.moveDown(0.2)
    }

    doc.moveDown(0.4)
    doc.fontSize(13).text('Strengths')
    for (const s of strategy.strengths || []) doc.fontSize(10).text(`- ${s}`)

    doc.moveDown(0.4)
    doc.fontSize(13).text('Weaknesses')
    for (const s of strategy.weaknesses || []) doc.fontSize(10).text(`- ${s}`)

    doc.end()
  })
}

async function sendUserEmail({ to, pdfBuffer, fileName, summary }: { to: string; pdfBuffer: Buffer; fileName: string; summary: string }) {
  const smtpHost = process.env.SMTP_HOST
  if (!smtpHost) return { sent: false, message: 'SMTP is not configured.' }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
  })

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@jvolabs.ai',
    to,
    subject: 'Your AI Strategy Blueprint',
    html: `<div style="font-family:Inter,Arial,sans-serif;color:#111"><h2>Your AI Strategy Blueprint</h2><p>${escapeHtml(summary)}</p><p>The full PDF blueprint is attached.</p></div>`,
    attachments: [
      {
        filename: fileName,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  })

  return { sent: true, message: 'Email sent to user.' }
}

async function markSubmissionFailed(strapi: any, documentId: string, message: string) {
  if (!documentId) return
  try {
    await (strapi.documents(UID) as any).update({
      documentId,
      data: {
        status: 'failed',
        errorMessage: asText(message) || 'Unknown processing error.',
      },
    })
  } catch {
    // Best-effort fail marker. Primary error is handled by caller.
  }
}

async function generateAndPersist({ strapi, documentId, ideaText, mode, workEmail, answers }: any) {
  const openai = getOpenAIClient()
  if (!openai) {
    throw new Error('OPENAI_API_KEY is missing.')
  }

  const { strategy, usage, ragContextCount } = await buildStrategy(openai, { ideaText, mode, answers, email: workEmail })
  const pdfBuffer = await renderStrategyPdf(strategy, { ideaText, mode, id: documentId })
  const pdfFileName = `ai-strategy-${documentId}.pdf`

  let emailStatus = { sent: false, message: 'Skipped email send.' }
  try {
    emailStatus = await sendUserEmail({ to: workEmail, pdfBuffer, fileName: pdfFileName, summary: strategy.executive_summary || '' })
  } catch (error: any) {
    emailStatus = { sent: false, message: error?.message || 'Email failed.' }
  }

  await (strapi.documents(UID) as any).update({
    documentId,
    data: {
      strategyResult: strategy,
      status: 'completed',
      tokenUsage: usage,
      retrievalContextMeta: { ragContextCount },
      pdfFileName,
      emailSent: emailStatus.sent,
      emailMessage: emailStatus.message,
      errorMessage: '',
    },
  })

  return { strategy, emailStatus, pdfFileName, usage }
}

export default factories.createCoreController(UID, ({ strapi }) => ({
  async start(ctx) {
    let documentId = ''
    try {
      const incoming = ctx.request.body?.data || {}
      const mode = asText(incoming.mode || 'auto').toLowerCase() === 'deeper' ? 'deeper' : 'auto'
      const ideaText = asText(incoming.ideaText)
      const workEmail = asText(incoming.workEmail).toLowerCase()
      const sourcePage = asText(incoming.sourcePage || 'home')
      const openai = getOpenAIClient()
      if (!openai) throw new Error('OPENAI_API_KEY is missing.')

      if (ideaText.length < 30) {
        ctx.status = 400
        ctx.body = { error: { message: 'Please provide more detail in your idea (minimum 30 characters).' } }
        return
      }
      if (!isValidEmail(workEmail)) {
        ctx.status = 400
        ctx.body = { error: { message: 'A valid work email is required.' } }
        return
      }
      enforceRateLimit(ctx, workEmail)

      const moderation = await moderateInput(openai, ideaText)
      if (moderation.flagged) {
        ctx.status = 400
        ctx.body = { error: { message: 'Your input could not be processed due to safety policy.' } }
        return
      }

      const entry = await (strapi.documents(UID) as any).create({
        data: { mode, ideaText, workEmail, sourcePage, status: 'in_progress', moderationMeta: moderation.details },
      })

      documentId = String(entry.documentId || entry.id)

      if (mode === 'deeper') {
        const { questions, usage } = await buildQuestionnaire(openai, ideaText)
        await (strapi.documents(UID) as any).update({
          documentId,
          data: { questionnaire: questions, status: 'questionnaire_ready', tokenUsage: usage },
        })

        ctx.body = {
          data: {
            id: documentId,
            mode,
            status: 'questionnaire_ready',
            questionnaire: questions,
          },
        }
        return
      }

      const generated = await generateAndPersist({ strapi, documentId, ideaText, mode, workEmail })
      ctx.body = {
        data: {
          id: documentId,
          mode,
          status: 'completed',
          strategyResult: generated.strategy,
          emailSent: generated.emailStatus.sent,
          emailMessage: generated.emailStatus.message,
          pdfFileName: generated.pdfFileName,
        },
      }
    } catch (error: any) {
      await markSubmissionFailed(strapi, documentId, error?.message || 'Unable to start AI strategy generation.')
      strapi.log.error('AI strategy start failed', error)
      ctx.status = 500
      ctx.body = { error: { message: error?.message || 'Unable to start AI strategy generation.' } }
    }
  },

  async submitQuestionnaire(ctx) {
    try {
      const id = asText(ctx.params.id)
      const incoming = ctx.request.body?.data || {}
      const answers = incoming.answers && typeof incoming.answers === 'object' ? incoming.answers : {}

      const existing = await (strapi.documents(UID) as any).findOne({ documentId: id })
      if (!existing) {
        ctx.status = 404
        ctx.body = { error: { message: 'Submission not found.' } }
        return
      }

      if (existing.status !== 'questionnaire_ready') {
        ctx.status = 400
        ctx.body = { error: { message: 'Submission is not ready for questionnaire answers.' } }
        return
      }
      const questionnaireIds = new Set(
        (Array.isArray(existing.questionnaire) ? existing.questionnaire : [])
          .map((q: any) => asText(q?.id))
          .filter(Boolean),
      )
      const answerKeys = Object.keys(answers)
      if (!questionnaireIds.size || answerKeys.length !== questionnaireIds.size) {
        ctx.status = 400
        ctx.body = { error: { message: 'Please submit answers for all follow-up questions.' } }
        return
      }
      const invalidAnswer = answerKeys.find((key) => !questionnaireIds.has(asText(key)) || !asText((answers as any)[key]))
      if (invalidAnswer) {
        ctx.status = 400
        ctx.body = { error: { message: 'One or more questionnaire answers are invalid.' } }
        return
      }

      await (strapi.documents(UID) as any).update({ documentId: id, data: { answers, status: 'in_progress' } })

      const generated = await generateAndPersist({
        strapi,
        documentId: id,
        ideaText: existing.ideaText,
        mode: existing.mode,
        workEmail: existing.workEmail,
        answers,
      })

      ctx.body = {
        data: {
          id,
          mode: existing.mode,
          status: 'completed',
          strategyResult: generated.strategy,
          emailSent: generated.emailStatus.sent,
          emailMessage: generated.emailStatus.message,
          pdfFileName: generated.pdfFileName,
        },
      }
    } catch (error: any) {
      await markSubmissionFailed(strapi, asText(ctx.params.id), error?.message || 'Unable to process questionnaire answers.')
      strapi.log.error('AI strategy questionnaire submit failed', error)
      ctx.status = 500
      ctx.body = { error: { message: error?.message || 'Unable to process questionnaire answers.' } }
    }
  },

  async findOne(ctx) {
    try {
      const id = asText(ctx.params.id)
      const entry = await (strapi.documents(UID) as any).findOne({ documentId: id })
      if (!entry) {
        ctx.status = 404
        ctx.body = { error: { message: 'Submission not found.' } }
        return
      }

      ctx.body = {
        data: {
          id,
          mode: entry.mode,
          status: entry.status,
          questionnaire: entry.questionnaire || [],
          strategyResult: entry.strategyResult || null,
          emailSent: Boolean(entry.emailSent),
          emailMessage: entry.emailMessage || '',
          pdfFileName: entry.pdfFileName || '',
          errorMessage: entry.errorMessage || '',
        },
      }
    } catch (error: any) {
      ctx.status = 500
      ctx.body = { error: { message: error?.message || 'Unable to fetch submission.' } }
    }
  },

  async resendEmail(ctx) {
    try {
      const id = asText(ctx.params.id)
      const entry = await (strapi.documents(UID) as any).findOne({ documentId: id })
      if (!entry) {
        ctx.status = 404
        ctx.body = { error: { message: 'Submission not found.' } }
        return
      }
      if (entry.status !== 'completed' || !entry.strategyResult) {
        ctx.status = 400
        ctx.body = { error: { message: 'Submission is not ready for email resend.' } }
        return
      }

      const pdfFileName = asText(entry.pdfFileName) || `ai-strategy-${id}.pdf`
      const pdfBuffer = await renderStrategyPdf(entry.strategyResult, {
        ideaText: entry.ideaText || '',
        mode: entry.mode || 'auto',
        id,
      })
      const emailStatus = await sendUserEmail({
        to: entry.workEmail,
        pdfBuffer,
        fileName: pdfFileName,
        summary: entry.strategyResult?.executive_summary || '',
      })

      await (strapi.documents(UID) as any).update({
        documentId: id,
        data: {
          emailSent: emailStatus.sent,
          emailMessage: emailStatus.message,
        },
      })

      ctx.body = {
        data: {
          id,
          emailSent: emailStatus.sent,
          emailMessage: emailStatus.message,
          pdfFileName,
        },
      }
    } catch (error: any) {
      ctx.status = 500
      ctx.body = { error: { message: error?.message || 'Unable to resend blueprint email.' } }
    }
  },
}))
