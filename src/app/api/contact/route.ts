import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import config from '@/data/config.json';

export async function POST(req: NextRequest) {
  try {
    const { name, phone, message, service } = await req.json();

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || config.email,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${config.businessName} Website" <${process.env.SMTP_USER || config.email}>`,
      to: config.email,
      replyTo: undefined,
      subject: `New Enquiry${service ? ` – ${service}` : ''} from ${name}`,
      html: `
        <h2>New Enquiry from ${config.businessName} Website</h2>
        ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
        <hr/>
        <p style="color:#999;font-size:12px;">Sent from ${config.url}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message. Please call us directly.' }, { status: 500 });
  }
}
