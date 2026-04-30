import { factories } from '@strapi/strapi'
import nodemailer from 'nodemailer'

const UID = 'api::squad-brief-submission.squad-brief-submission'

function escapeHtml(value: unknown) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

function formatUsd(value: unknown) {
  const number = Number(value || 0)
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

function getPdfAttachment(pdfDataUri?: string, pdfFileName?: string) {
  if (!pdfDataUri || !pdfDataUri.startsWith('data:application/pdf;base64,')) return null

  const base64 = pdfDataUri.replace('data:application/pdf;base64,', '')
  return {
    filename: pdfFileName || 'jvo-labs-squad-brief.pdf',
    content: Buffer.from(base64, 'base64'),
    contentType: 'application/pdf',
  }
}

function buildEmailHtml(data: any) {
  const members = Array.isArray(data.selectedMembers) ? data.selectedMembers : []

  const memberRows = members
    .map((member: any) => {
      return `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #252525;color:#ffffff;font-weight:700;">${escapeHtml(member.name)}</td>
          <td style="padding:10px;border-bottom:1px solid #252525;color:#ababab;">${escapeHtml(member.title)}</td>
          <td style="padding:10px;border-bottom:1px solid #252525;color:#afa2ff;font-weight:700;">${formatUsd(member.monthlyRate)} / mo</td>
        </tr>
      `
    })
    .join('')

  return `
    <div style="margin:0;padding:0;background:#0e0e0e;color:#ffffff;font-family:Inter,Arial,sans-serif;">
      <div style="max-width:720px;margin:0 auto;padding:32px;">
        <div style="border:1px solid #252525;background:#131313;border-radius:18px;padding:28px;">
          <p style="margin:0 0 8px;color:#afa2ff;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">
            New Build Squad Request
          </p>
          <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.15;">
            ${escapeHtml(data.name)} submitted a squad brief.
          </h1>

          <div style="margin-top:26px;padding:18px;border:1px solid #252525;border-radius:14px;background:#0e0e0e;">
            <p style="margin:0 0 10px;color:#afa2ff;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;">
              Contact
            </p>
            <p style="margin:0;color:#ffffff;"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
            <p style="margin:8px 0 0;color:#ffffff;"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
            <p style="margin:8px 0 0;color:#ffffff;"><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
            <p style="margin:8px 0 0;color:#ffffff;"><strong>Company:</strong> ${escapeHtml(data.company || '—')}</p>
          </div>

          <div style="margin-top:18px;padding:18px;border:1px solid #252525;border-radius:14px;background:#0e0e0e;">
            <p style="margin:0 0 10px;color:#afa2ff;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;">
              Project Summary
            </p>
            <p style="margin:0;color:#dddddd;line-height:1.65;">${escapeHtml(data.projectSummary)}</p>
          </div>

          <div style="margin-top:18px;padding:18px;border:1px solid #252525;border-radius:14px;background:#0e0e0e;">
            <p style="margin:0 0 12px;color:#afa2ff;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;">
              Estimate
            </p>
            <p style="margin:0;color:#ffffff;font-size:22px;font-weight:800;">Monthly Burn: ${formatUsd(data.monthlyBurn)}</p>
            <p style="margin:8px 0 0;color:#afa2ff;font-size:20px;font-weight:800;">90-Day Total: ${formatUsd(data.projectTotal)}</p>
          </div>

          <table style="margin-top:18px;width:100%;border-collapse:collapse;border:1px solid #252525;border-radius:14px;overflow:hidden;background:#0e0e0e;">
            <thead>
              <tr>
                <th align="left" style="padding:10px;color:#afa2ff;font-size:11px;text-transform:uppercase;letter-spacing:1.2px;">Member</th>
                <th align="left" style="padding:10px;color:#afa2ff;font-size:11px;text-transform:uppercase;letter-spacing:1.2px;">Role</th>
                <th align="left" style="padding:10px;color:#afa2ff;font-size:11px;text-transform:uppercase;letter-spacing:1.2px;">Rate</th>
              </tr>
            </thead>
            <tbody>
              ${memberRows || '<tr><td colspan="3" style="padding:10px;color:#ababab;">No members selected.</td></tr>'}
            </tbody>
          </table>

          <p style="margin:22px 0 0;color:#757575;font-size:12px;line-height:1.6;">
            The generated PDF brief is attached if the frontend provided it successfully.
          </p>
        </div>
      </div>
    </div>
  `
}

export default factories.createCoreController(UID, ({ strapi }) => ({
  async submitAndNotify(ctx) {
    try {
      const incoming = ctx.request.body?.data || {}

      const {
        pdfDataUri,
        pdfFileName,
        ...submissionData
      } = incoming

      const data = {
        name: String(submissionData.name || '').trim(),
        email: String(submissionData.email || '').trim(),
        phone: String(submissionData.phone || '').trim(),
        company: String(submissionData.company || '').trim(),
        projectSummary: String(submissionData.projectSummary || '').trim(),
        selectedMembers: submissionData.selectedMembers || [],
        selectedMemberIds: submissionData.selectedMemberIds || [],
        monthlyBurn: Number(submissionData.monthlyBurn || 0),
        projectTotal: Number(submissionData.projectTotal || 0),
        notes: String(submissionData.projectSummary || '').trim(),
        sourcePage: submissionData.sourcePage || 'build-squad',
        status: submissionData.status || 'new',
      }

      if (!data.name || !data.email || !data.phone || !data.projectSummary) {
        ctx.status = 400
        ctx.body = {
          error: {
            message: 'Name, email, phone, and project summary are required.',
          },
        }
        return
      }

      const entry = await strapi.documents(UID).create({ data })

      let emailSent = false
      let emailMessage = 'SMTP is not configured.'

      const smtpHost = process.env.SMTP_HOST
      const ownerEmail = process.env.OWNER_EMAIL

      if (smtpHost && ownerEmail) {
        try {
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
      
          const attachment = getPdfAttachment(pdfDataUri, pdfFileName)
      
          await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER || ownerEmail,
            to: ownerEmail,
            replyTo: data.email,
            subject: `New Build Squad Brief — ${data.company || data.name}`,
            html: buildEmailHtml(data),
            attachments: attachment ? [attachment] : [],
          })
      
          emailSent = true
          emailMessage = 'Owner email sent.'
        } catch (emailError: any) {
          strapi.log.error('Squad brief saved, but owner email failed', emailError)
          emailSent = false
          emailMessage = emailError?.message || 'Squad brief saved, but owner email failed.'
        }
      }

      ctx.body = {
        data: {
          id: entry.documentId || entry.id,
          emailSent,
          emailMessage,
        },
      }
    } catch (error: any) {
      strapi.log.error('Squad brief submit-and-notify failed', error)
      ctx.status = 500
      ctx.body = {
        error: {
          message: error?.message || 'Unable to submit squad brief.',
        },
      }
    }
  },
}))