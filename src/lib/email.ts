import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendInquiryEmail({
  type,
  name,
  email,
  phone,
  details,
}: {
  type: string
  name: string
  email: string
  phone: string
  details: Record<string, string>
}) {
  const to = process.env.ADMIN_EMAIL || 'pdp81283@gmail.com'

  const detailsHtml = Object.entries(details)
    .map(([key, val]) => `<tr><td style="font-weight:600;padding:4px 12px 4px 0;white-space:nowrap">${key}</td><td>${val}</td></tr>`)
    .join('')

  await transporter.sendMail({
    from: `"Maple Crest Website" <${process.env.SMTP_USER}>`,
    to,
    replyTo: email,
    subject: `[Maple Crest Portfolio] New ${type} Inquiry from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#1a1a2e;color:#d4a853;padding:20px;text-align:center;font-size:20px;font-weight:700">
          🍁 Maple Crest Developments — Portfolio Site
        </div>
        <div style="background:#f9f9f9;padding:24px;border:1px solid #ddd">
          <p style="color:#666;font-size:13px;margin-bottom:16px">
            This inquiry came from the <strong>portfolio/demo</strong> website.
            This is not a real real estate company.
          </p>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="font-weight:600;padding:4px 12px 4px 0;white-space:nowrap">Type</td><td>${type}</td></tr>
            <tr><td style="font-weight:600;padding:4px 12px 4px 0;white-space:nowrap">Name</td><td>${name}</td></tr>
            <tr><td style="font-weight:600;padding:4px 12px 4px 0;white-space:nowrap">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="font-weight:600;padding:4px 12px 4px 0;white-space:nowrap">Phone</td><td>${phone || '—'}</td></tr>
            ${detailsHtml}
          </table>
        </div>
        <div style="background:#fff1f0;border:1px solid #ffccc7;padding:12px;text-align:center;font-size:12px;color:#a8071a">
          ⚠️ This is an automated notification from a portfolio/demo project. The sender may not expect a real response.
        </div>
      </div>
    `,
  })
}
