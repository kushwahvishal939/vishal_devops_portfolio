import { NextRequest, NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Server-side only — credentials never reach the browser
const ses = new SESClient({
  region: process.env.AWS_SES_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY || '',
  },
});

const TO_EMAIL = 'kushwahvishal939@gmail.com';
const FROM_EMAIL = process.env.AWS_SES_FROM_EMAIL || 'kushwahvishal939@gmail.com';

// Simple rate limit: max 5 submissions per IP per hour (in-memory, resets on restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 });
    return false;
  }

  if (entry.count >= 5) return true;

  entry.count++;
  return false;
}

// Input sanitization — strip HTML tags and limit length
function sanitize(input: string, maxLength = 1000): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\s@.,\-()/#&+:;'"!?\n\r₹$€£¥]/g, '')
    .trim()
    .slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit check
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate body
    const body = await request.json();
    const { name, email, company, projectType, budget, timeline, message } = body;

    // Server-side validation
    if (!name || !email || !projectType || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    if (message.trim().length < 20) {
      return NextResponse.json(
        { error: 'Message must be at least 20 characters.' },
        { status: 400 }
      );
    }

    // Sanitize all inputs
    const cleanName = sanitize(name, 100);
    const cleanEmail = sanitize(email, 100);
    const cleanCompany = sanitize(company || 'Not provided', 200);
    const cleanProjectType = sanitize(projectType, 100);
    const cleanBudget = sanitize(budget || 'Not specified', 50);
    const cleanTimeline = sanitize(timeline || 'Not specified', 50);
    const cleanMessage = sanitize(message, 2000);

    // Build email
    const subject = `New Project Inquiry: ${cleanProjectType} from ${cleanName}`;
    const htmlBody = `
      <div style="font-family: monospace; background: #0a0a0a; color: #e0e0e0; padding: 24px; max-width: 600px;">
        <div style="border-bottom: 1px solid #222; padding-bottom: 16px; margin-bottom: 16px;">
          <h2 style="color: #f59e0b; margin: 0 0 4px 0; font-size: 18px;">New Project Inquiry</h2>
          <p style="color: #666; margin: 0; font-size: 12px;">via vishalkushwah.dev contact form</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr style="border-bottom: 1px solid #1a1a1a;">
            <td style="padding: 8px 0; color: #666; width: 120px;">Name</td>
            <td style="padding: 8px 0; color: #e0e0e0;">${cleanName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1a1a1a;">
            <td style="padding: 8px 0; color: #666;">Email</td>
            <td style="padding: 8px 0; color: #f59e0b;">${cleanEmail}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1a1a1a;">
            <td style="padding: 8px 0; color: #666;">Company</td>
            <td style="padding: 8px 0; color: #e0e0e0;">${cleanCompany}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1a1a1a;">
            <td style="padding: 8px 0; color: #666;">Project Type</td>
            <td style="padding: 8px 0; color: #e0e0e0;">${cleanProjectType}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1a1a1a;">
            <td style="padding: 8px 0; color: #666;">Budget</td>
            <td style="padding: 8px 0; color: #e0e0e0;">${cleanBudget}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1a1a1a;">
            <td style="padding: 8px 0; color: #666;">Timeline</td>
            <td style="padding: 8px 0; color: #e0e0e0;">${cleanTimeline}</td>
          </tr>
        </table>

        <div style="margin-top: 16px; padding: 16px; background: #111; border: 1px solid #222;">
          <p style="color: #666; font-size: 11px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Project Description</p>
          <p style="color: #e0e0e0; margin: 0; white-space: pre-wrap; font-size: 13px; line-height: 1.6;">${cleanMessage}</p>
        </div>

        <p style="color: #333; font-size: 10px; margin-top: 16px;">
          Reply directly to this email to respond to ${cleanName} at ${cleanEmail}
        </p>
      </div>
    `;

    const textBody = `New Project Inquiry\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nCompany: ${cleanCompany}\nProject Type: ${cleanProjectType}\nBudget: ${cleanBudget}\nTimeline: ${cleanTimeline}\n\nMessage:\n${cleanMessage}`;

    // Send via SES
    const command = new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: {
        ToAddresses: [TO_EMAIL],
      },
      Message: {
        Subject: { Data: subject, Charset: 'UTF-8' },
        Body: {
          Html: { Data: htmlBody, Charset: 'UTF-8' },
          Text: { Data: textBody, Charset: 'UTF-8' },
        },
      },
      ReplyToAddresses: [cleanEmail],
    });

    await ses.send(command);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    // Never expose internal errors to the client
    const message = error instanceof Error ? error.message : 'Unknown error';

    // Log server-side only (never reaches browser)
    console.error('[Contact API] SES Error:', message);

    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email directly.' },
      { status: 500 }
    );
  }
}
