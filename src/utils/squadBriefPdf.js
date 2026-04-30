import { jsPDF } from 'jspdf'

function formatUsd(value) {
  return Number(value || 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

function safeText(value, fallback = '—') {
  const text = String(value || '').trim()
  return text || fallback
}

function cleanFileName(value) {
  return String(value || 'squad-brief')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function addWrappedText(doc, text, x, y, maxWidth, lineHeight, options = {}) {
  const lines = doc.splitTextToSize(safeText(text), maxWidth)
  const maxLines = options.maxLines || lines.length
  const visibleLines = lines.slice(0, maxLines)

  visibleLines.forEach((line, index) => {
    doc.text(line, x, y + index * lineHeight)
  })

  if (lines.length > maxLines) {
    doc.text('...', x, y + visibleLines.length * lineHeight)
    return y + (visibleLines.length + 1) * lineHeight
  }

  return y + visibleLines.length * lineHeight
}

export function createSquadBriefPdfBlob({
  contact,
  selectedMembers,
  monthlyBurn,
  projectTotal,
}) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 36
  const purple = [175, 162, 255]
  const deepPurple = [116, 89, 247]
  const black = [14, 14, 14]
  const dark = [19, 19, 19]
  const grey = [117, 117, 117]
  const lightGrey = [171, 171, 171]
  const white = [255, 255, 255]

  doc.setFillColor(...black)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  // Header
  doc.setFillColor(...dark)
  doc.roundedRect(margin, 28, pageWidth - margin * 2, 92, 14, 14, 'F')
  doc.setFillColor(...deepPurple)
  doc.roundedRect(pageWidth - margin - 122, 52, 92, 28, 14, 14, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(...white)
  doc.text('JVO LABS', margin + 22, 62)

  doc.setFontSize(8)
  doc.setTextColor(...purple)
  doc.text('BUILD SQUAD BRIEF', margin + 22, 82)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...lightGrey)
  doc.text('Precision engineering for AI SaaS teams', margin + 22, 101)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(0, 0, 0)
  doc.text('90-DAY ESTIMATE', pageWidth - margin - 108, 70)

  let y = 154

  // Client block
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...purple)
  doc.text('CLIENT DETAILS', margin, y)

  y += 18
  doc.setFillColor(...dark)
  doc.roundedRect(margin, y, pageWidth - margin * 2, 82, 12, 12, 'F')

  doc.setFontSize(9)
  doc.setTextColor(...lightGrey)
  doc.text('Name', margin + 18, y + 24)
  doc.text('Email', margin + 190, y + 24)
  doc.text('Phone', margin + 360, y + 24)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...white)
  doc.text(safeText(contact.name), margin + 18, y + 42)
  doc.text(safeText(contact.email), margin + 190, y + 42)
  doc.text(safeText(contact.phone), margin + 360, y + 42)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...lightGrey)
  doc.text('Company', margin + 18, y + 66)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...white)
  doc.text(safeText(contact.company), margin + 82, y + 66)

  y += 112

  // Project summary
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...purple)
  doc.text('PROJECT SUMMARY', margin, y)

  y += 18
  doc.setFillColor(...dark)
  doc.roundedRect(margin, y, pageWidth - margin * 2, 118, 12, 12, 'F')

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(231, 231, 231)
  addWrappedText(doc, contact.projectSummary, margin + 18, y + 26, pageWidth - margin * 2 - 36, 15, {
    maxLines: 5,
  })

  y += 148

  // Estimate + selected team
  const leftWidth = 245
  const rightWidth = pageWidth - margin * 2 - leftWidth - 16

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...purple)
  doc.text('SELECTED SQUAD', margin, y)
  doc.text('COMMERCIAL ESTIMATE', margin + leftWidth + 16, y)

  y += 18

  const teamBoxY = y
  doc.setFillColor(...dark)
  doc.roundedRect(margin, teamBoxY, leftWidth, 184, 12, 12, 'F')
  doc.roundedRect(margin + leftWidth + 16, teamBoxY, rightWidth, 184, 12, 12, 'F')

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...lightGrey)

  const visibleMembers = selectedMembers.slice(0, 5)
  let memberY = teamBoxY + 26

  if (visibleMembers.length === 0) {
    doc.text('No squad members selected.', margin + 16, memberY)
  } else {
    visibleMembers.forEach((member, index) => {
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...white)
      doc.setFontSize(10)
      doc.text(`${index + 1}. ${safeText(member.name)}`, margin + 16, memberY)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8.5)
      doc.setTextColor(...lightGrey)
      doc.text(safeText(member.title), margin + 16, memberY + 13)

      doc.setTextColor(...purple)
      doc.text(`${formatUsd(member.monthlyRate)} / mo`, margin + 16, memberY + 26)

      memberY += 33
    })

    if (selectedMembers.length > visibleMembers.length) {
      doc.setTextColor(...lightGrey)
      doc.setFont('helvetica', 'normal')
      doc.text(`+ ${selectedMembers.length - visibleMembers.length} additional specialist(s)`, margin + 16, memberY + 4)
    }
  }

  const estimateX = margin + leftWidth + 34
  const estimateY = teamBoxY + 34

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...lightGrey)
  doc.text('MONTHLY BURN', estimateX, estimateY)

  doc.setFontSize(25)
  doc.setTextColor(...white)
  doc.text(formatUsd(monthlyBurn), estimateX, estimateY + 32)

  doc.setFontSize(9)
  doc.setTextColor(...lightGrey)
  doc.text('PROJECT TOTAL / 90 DAYS', estimateX, estimateY + 70)

  doc.setFontSize(22)
  doc.setTextColor(...purple)
  doc.text(formatUsd(projectTotal), estimateX, estimateY + 100)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(...grey)
  doc.text('Estimate is indicative and subject to final scope alignment.', estimateX, estimateY + 132)
  doc.text('Final onboarding begins after technical discovery.', estimateX, estimateY + 147)

  y += 218

  // Next steps
  doc.setFillColor(17, 17, 17)
  doc.roundedRect(margin, y, pageWidth - margin * 2, 72, 12, 12, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...white)
  doc.text('Recommended next step', margin + 18, y + 26)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...lightGrey)
  doc.text(
    'JVO Labs will review the selected squad, validate the technical scope, and contact you to align timeline, delivery model, and onboarding.',
    margin + 18,
    y + 46,
    { maxWidth: pageWidth - margin * 2 - 36 },
  )

  // Footer
  doc.setDrawColor(72, 72, 72)
  doc.line(margin, pageHeight - 58, pageWidth - margin, pageHeight - 58)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...purple)
  doc.text('JVO LABS', margin, pageHeight - 36)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...grey)
  doc.text('AI SaaS architecture · Product engineering · Dedicated technical squads', margin + 58, pageHeight - 36)

  doc.setTextColor(...lightGrey)
  doc.text('Generated brief', pageWidth - margin - 88, pageHeight - 36)

  const fileName = `jvo-labs-${cleanFileName(contact.company || contact.name)}-squad-brief.pdf`
  const blob = doc.output('blob')

  return { blob, fileName }
}

export function downloadPdfBlob(blob, fileName) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export function blobToDataUri(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}