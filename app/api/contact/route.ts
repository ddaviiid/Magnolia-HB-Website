import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
  let body: Record<string, string>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, phone, email, address, situation, message } = body

  if (!name || !phone || !email || !address) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'Magnolia Home Buyers <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL ?? 'info@magnoliahomebuyers.com'],
      replyTo: email,
      subject: `New Cash Offer Request: ${name} — ${address}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f4ee; padding: 40px 32px; border-radius: 4px;">
          <div style="border-bottom: 2px solid #C9A84C; padding-bottom: 20px; margin-bottom: 28px;">
            <h1 style="font-family: Georgia, serif; font-style: italic; color: #0A1A0C; font-size: 28px; margin: 0;">
              New Cash Offer Request
            </h1>
            <p style="color: #888; font-size: 13px; margin: 8px 0 0;">Magnolia Home Buyers — Lead Notification</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            ${[
              ['Name', name],
              ['Phone', phone],
              ['Email', email],
              ['Property Address', address],
              ['Situation', situation || 'Not specified'],
            ]
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding: 10px 0; color: #666; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; width: 140px; vertical-align: top; border-bottom: 1px solid #e8dfca;">${label}</td>
                <td style="padding: 10px 0; color: #1a1a1a; font-size: 15px; border-bottom: 1px solid #e8dfca;">${value}</td>
              </tr>
            `
              )
              .join('')}
            ${
              message
                ? `<tr>
                <td style="padding: 10px 0; color: #666; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #1a1a1a; font-size: 15px; line-height: 1.6;">${message}</td>
              </tr>`
                : ''
            }
          </table>

          <div style="margin-top: 32px; padding: 20px; background: #0A1A0C; border-radius: 2px; text-align: center;">
            <a href="mailto:${email}" style="display: inline-block; background: #C9A84C; color: #0A1A0C; font-weight: 700; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; padding: 12px 28px; border-radius: 2px; text-decoration: none;">
              Reply to ${name}
            </a>
          </div>

          <p style="color: #aaa; font-size: 11px; text-align: center; margin-top: 24px;">
            This lead was submitted via magnoliahomebuyers.com
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
