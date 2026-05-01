import fs from 'node:fs'
import path from 'node:path'
import OpenAI from 'openai'

const apiKey = process.env.OPENAI_API_KEY
const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID
const knowledgeDir = process.env.AI_STRATEGY_KNOWLEDGE_DIR || path.join(process.cwd(), 'knowledge')

if (!apiKey) {
  console.error('Missing OPENAI_API_KEY')
  process.exit(1)
}
if (!vectorStoreId) {
  console.error('Missing OPENAI_VECTOR_STORE_ID')
  process.exit(1)
}
if (String(vectorStoreId).includes('...') || !/^[a-zA-Z0-9_-]+$/.test(String(vectorStoreId))) {
  console.error(`Invalid OPENAI_VECTOR_STORE_ID: ${vectorStoreId}`)
  console.error('Set a real vector store id (example: vs_abc123...) in backend/.env')
  process.exit(1)
}
if (!fs.existsSync(knowledgeDir)) {
  console.error(`Knowledge directory not found: ${knowledgeDir}`)
  process.exit(1)
}

const client = new OpenAI({ apiKey })

function walk(dir) {
  const out = []
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

function isSupported(file) {
  const ext = path.extname(file).toLowerCase()
  return ['.md', '.txt', '.pdf', '.docx', '.csv', '.json'].includes(ext)
}

async function main() {
  const files = walk(knowledgeDir).filter(isSupported)
  if (!files.length) {
    console.log('No supported knowledge files found.')
    return
  }

  console.log(`Found ${files.length} files. Uploading to vector store ${vectorStoreId}...`)

  const uploads = []
  for (const filePath of files) {
    const stream = fs.createReadStream(filePath)
    const uploaded = await client.files.create({
      file: stream,
      purpose: 'assistants',
    })
    uploads.push(uploaded.id)
    console.log(`Uploaded: ${path.relative(knowledgeDir, filePath)} -> ${uploaded.id}`)
  }

  const batch = await client.vectorStores.fileBatches.create(vectorStoreId, {
    file_ids: uploads,
  })

  console.log(`Batch created: ${batch.id}`)
  console.log('Polling batch status...')

  let status = batch.status
  while (status !== 'completed' && status !== 'failed' && status !== 'cancelled') {
    await new Promise((r) => setTimeout(r, 2500))
    const current = await client.vectorStores.fileBatches.retrieve(batch.id, {
      vector_store_id: vectorStoreId,
    })
    status = current.status
    console.log(`Status: ${status}`)
  }

  console.log(`Final status: ${status}`)
  if (status !== 'completed') process.exit(2)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
