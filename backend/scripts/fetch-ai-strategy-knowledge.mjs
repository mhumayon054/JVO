import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const sourcesFile = process.env.AI_STRATEGY_SOURCE_LIST || path.join(root, '..', 'docs', 'ai-strategy-knowledge-sources-100.md')
const outDir = process.env.AI_STRATEGY_KNOWLEDGE_OUT || path.join(root, 'knowledge', 'sources')
const maxDocs = Number(process.env.AI_STRATEGY_FETCH_MAX || 40)
const timeoutMs = Number(process.env.AI_STRATEGY_FETCH_TIMEOUT_MS || 20000)
const delayMs = Number(process.env.AI_STRATEGY_FETCH_DELAY_MS || 500)

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/https?:\/\//g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
}

function extractUrls(markdown) {
  const matches = markdown.match(/https?:\/\/[^\s)]+/g) || []
  return [...new Set(matches.map((url) => url.replace(/[>,.;]+$/, '')))]
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function cleanHtmlToText(html) {
  let s = html
  s = s.replace(/<script[\s\S]*?<\/script>/gi, ' ')
  s = s.replace(/<style[\s\S]*?<\/style>/gi, ' ')
  s = s.replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
  s = s.replace(/<svg[\s\S]*?<\/svg>/gi, ' ')

  s = s.replace(/<(h1|h2|h3|h4|h5|h6)[^>]*>/gi, '\n## ')
  s = s.replace(/<\/(h1|h2|h3|h4|h5|h6)>/gi, '\n')
  s = s.replace(/<(p|div|section|article|li|tr|br)[^>]*>/gi, '\n')
  s = s.replace(/<\/\s*(p|div|section|article|li|tr)>/gi, '\n')

  s = s.replace(/<[^>]+>/g, ' ')
  s = decodeHtmlEntities(s)
  s = s.replace(/[ \t]+/g, ' ')
  s = s.replace(/\n{3,}/g, '\n\n')

  const lines = s
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  return lines.join('\n')
}

function extractTitle(html, fallback) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  if (!m) return fallback
  return decodeHtmlEntities(m[1].trim()).replace(/\s+/g, ' ').slice(0, 180)
}

async function fetchWithTimeout(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'JVO-Knowledge-Fetcher/1.0 (+RAG indexing pipeline)',
      },
      redirect: 'follow',
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const contentType = res.headers.get('content-type') || ''
    if (!contentType.includes('text/html') && !contentType.includes('text/plain') && !contentType.includes('application/json')) {
      throw new Error(`Unsupported content-type: ${contentType}`)
    }
    const text = await res.text()
    return { text, finalUrl: res.url }
  } finally {
    clearTimeout(timer)
  }
}

async function main() {
  if (!fs.existsSync(sourcesFile)) {
    throw new Error(`Sources file not found: ${sourcesFile}`)
  }
  fs.mkdirSync(outDir, { recursive: true })

  const md = fs.readFileSync(sourcesFile, 'utf8')
  const urls = extractUrls(md).slice(0, maxDocs)

  const summary = []
  let ok = 0
  let failed = 0

  for (let i = 0; i < urls.length; i += 1) {
    const url = urls[i]
    process.stdout.write(`[${i + 1}/${urls.length}] Fetching ${url} ... `)

    try {
      const { text: raw, finalUrl } = await fetchWithTimeout(url)
      const title = extractTitle(raw, finalUrl)
      const body = cleanHtmlToText(raw)

      if (!body || body.length < 500) {
        throw new Error('Content too short after cleaning')
      }

      const fileName = `${String(i + 1).padStart(3, '0')}-${slugify(finalUrl)}.md`
      const filePath = path.join(outDir, fileName)
      const content = `# ${title}\n\nSource: ${finalUrl}\n\n${body}\n`
      fs.writeFileSync(filePath, content, 'utf8')

      summary.push(`- OK: ${url} -> ${path.relative(root, filePath)}`)
      ok += 1
      process.stdout.write('OK\n')
    } catch (error) {
      summary.push(`- FAIL: ${url} -> ${error.message}`)
      failed += 1
      process.stdout.write(`FAIL (${error.message})\n`)
    }

    await sleep(delayMs)
  }

  const report = [
    '# AI Strategy Knowledge Fetch Report',
    '',
    `- Total attempted: ${urls.length}`,
    `- Success: ${ok}`,
    `- Failed: ${failed}`,
    '',
    '## Details',
    ...summary,
    '',
  ].join('\n')

  const reportPath = path.join(root, 'knowledge', 'ai-strategy-knowledge-fetch-report.md')
  fs.writeFileSync(reportPath, report, 'utf8')

  console.log('')
  console.log(`Saved report: ${reportPath}`)
  console.log(`Saved docs to: ${outDir}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
