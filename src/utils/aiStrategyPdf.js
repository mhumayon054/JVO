import { jsPDF } from 'jspdf'

function money(value, currency = '$') {
  return `${currency}${Number(value || 0).toLocaleString('en-US')}`
}

function addSectionTitle(doc, text, y) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(175, 162, 255)
  doc.text(text, 40, y)
  return y + 14
}

function addParagraph(doc, text, y, width = 515) {
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(230, 230, 230)
  const lines = doc.splitTextToSize(String(text || ''), width)
  doc.text(lines, 40, y)
  return y + lines.length * 14
}

function ensurePage(doc, y, needed = 30) {
  const pageHeight = doc.internal.pageSize.getHeight()
  if (y + needed <= pageHeight - 30) return y
  doc.addPage()
  const pageWidth = doc.internal.pageSize.getWidth()
  doc.setFillColor(14, 14, 14)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')
  return 34
}

export function downloadAIStrategyPdf({ result, ideaText, submissionId }) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  doc.setFillColor(14, 14, 14)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')
  doc.setFillColor(19, 19, 19)
  doc.roundedRect(28, 24, pageWidth - 56, 78, 12, 12, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(255, 255, 255)
  doc.text('JVO LABS', 44, 56)
  doc.setFontSize(10)
  doc.setTextColor(175, 162, 255)
  doc.text('AI STRATEGY PLAN', 44, 74)
  doc.setFontSize(9)
  doc.setTextColor(171, 171, 171)
  doc.text(`Submission: ${submissionId || '-'}`, 44, 92)

  let y = 130
  y = addSectionTitle(doc, 'Client Idea', y)
  y = addParagraph(doc, ideaText, y)

  y = ensurePage(doc, y, 90)
  y = addSectionTitle(doc, 'Reality Check', y + 8)
  y = addParagraph(doc, result?.reality_check, y)

  y = ensurePage(doc, y, 90)
  y = addSectionTitle(doc, 'Executive Summary', y + 8)
  y = addParagraph(doc, result?.executive_summary, y)

  y = ensurePage(doc, y, 120)
  y = addSectionTitle(doc, 'Recommended Lean Team', y + 8)
  for (const member of result?.recommended_lean_team || []) {
    y = addParagraph(doc, `${member.role} - ${money(member.monthly_cost_usd)}/mo`, y)
    y = addParagraph(doc, member.why, y)
    y += 4
    y = ensurePage(doc, y, 40)
  }

  y = ensurePage(doc, y, 120)
  y = addSectionTitle(doc, 'Project Roadmap', y + 8)
  for (const phase of result?.technical_roadmap || []) {
    y = addParagraph(doc, `${phase.phase} (${phase.timeline})`, y)
    for (const outcome of phase.outcomes || []) y = addParagraph(doc, `- ${outcome}`, y)
    y += 4
    y = ensurePage(doc, y, 40)
  }

  y = ensurePage(doc, y, 120)
  y = addSectionTitle(doc, 'Risks and Mitigations', y + 8)
  for (const row of result?.risks_and_mitigations || []) {
    y = addParagraph(doc, `Risk: ${row.risk}`, y)
    y = addParagraph(doc, `Mitigation: ${row.mitigation}`, y)
    y += 4
    y = ensurePage(doc, y, 40)
  }

  y = ensurePage(doc, y, 100)
  y = addSectionTitle(doc, 'Smart Technical Suggestions', y + 8)
  for (const item of result?.smart_technical_suggestions || []) y = addParagraph(doc, `- ${item}`, y)

  y = ensurePage(doc, y, 100)
  y = addSectionTitle(doc, 'Estimated Monthly Cost (Lean Mode)', y + 8)
  for (const item of result?.monthly_cost_estimate?.line_items || []) {
    y = addParagraph(doc, `${item.label}: ${money(item.amount, result?.monthly_cost_estimate?.currency || '$')}`, y)
  }
  y += 4
  doc.setDrawColor(116, 89, 247)
  doc.setLineWidth(1)
  doc.line(40, y, pageWidth - 40, y)
  y += 16
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(255, 255, 255)
  doc.text('Total Monthly Cost', 40, y)
  y += 16
  doc.setFontSize(14)
  doc.setTextColor(175, 162, 255)
  doc.text(
    `${money(result?.monthly_cost_estimate?.total_monthly_cost, result?.monthly_cost_estimate?.currency || '$')}/mo`,
    40,
    y,
  )

  const fileName = `jvo-ai-strategy-${String(submissionId || 'plan').replace(/[^a-zA-Z0-9-_]/g, '')}.pdf`
  doc.save(fileName)
}
