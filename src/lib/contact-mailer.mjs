/**
 * Runtime-agnostic contact-form mailer.
 *
 * Uses the SES v2 HTTPS API signed with SigV4 over `fetch` + Web Crypto, so the exact
 * same code runs under Node (next dev) and the Cloudflare Workers runtime (Pages
 * Functions). Deliberately zero-dependency — the AWS SDK does not belong in a Worker
 * bundle, and duplicating this logic per runtime is how the two drift apart.
 */

const SES_SERVICE = 'ses';
const SES_PATH = '/v2/email/outbound-emails';
const MIN_MESSAGE_LENGTH = 20;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 3600000;

export const TO_EMAIL = 'kushwahvishal939@gmail.com';

/* -------------------------------------------------------------------------- */
/* Rate limiting                                                              */
/* -------------------------------------------------------------------------- */

// Best-effort only: this map lives in one isolate/process and resets on restart. It
// blunts naive spam bursts; it is not a distributed rate limiter.
const rateLimitMap = new Map();

export function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count++;
  return false;
}

export function clientIpFrom(headers) {
  return (
    headers.get('cf-connecting-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}

/* -------------------------------------------------------------------------- */
/* Validation + sanitization                                                  */
/* -------------------------------------------------------------------------- */

function sanitize(input, maxLength = 1000) {
  return String(input)
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\s@.,\-()/#&+:;'"!?\n\r₹$€£¥]/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * @returns {{ error: string, status: number } | { clean: object }}
 */
export function validateContact(body) {
  const { name, email, company, projectType, budget, timeline, message } = body ?? {};

  if (!name || !email || !projectType || !message) {
    return { error: 'Missing required fields.', status: 400 };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'Invalid email address.', status: 400 };
  }

  if (String(message).trim().length < MIN_MESSAGE_LENGTH) {
    return { error: `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`, status: 400 };
  }

  return {
    clean: {
      name: sanitize(name, 100),
      email: sanitize(email, 100),
      company: sanitize(company || 'Not provided', 200),
      projectType: sanitize(projectType, 100),
      budget: sanitize(budget || 'Not specified', 50),
      timeline: sanitize(timeline || 'Not specified', 50),
      message: sanitize(message, 2000),
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Email body                                                                 */
/* -------------------------------------------------------------------------- */

function row(label, value, color = '#e0e0e0') {
  return `
          <tr style="border-bottom: 1px solid #1a1a1a;">
            <td style="padding: 8px 0; color: #666; width: 120px;">${label}</td>
            <td style="padding: 8px 0; color: ${color};">${value}</td>
          </tr>`;
}

export function buildEmail(c) {
  const subject = `New Project Inquiry: ${c.projectType} from ${c.name}`;

  const html = `
      <div style="font-family: monospace; background: #0a0a0a; color: #e0e0e0; padding: 24px; max-width: 600px;">
        <div style="border-bottom: 1px solid #222; padding-bottom: 16px; margin-bottom: 16px;">
          <h2 style="color: #f59e0b; margin: 0 0 4px 0; font-size: 18px;">New Project Inquiry</h2>
          <p style="color: #666; margin: 0; font-size: 12px;">via vishalkushwah.com contact form</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">${row('Name', c.name)}${row('Email', c.email, '#f59e0b')}${row('Company', c.company)}${row('Project Type', c.projectType)}${row('Budget', c.budget)}${row('Timeline', c.timeline)}
        </table>

        <div style="margin-top: 16px; padding: 16px; background: #111; border: 1px solid #222;">
          <p style="color: #666; font-size: 11px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Project Description</p>
          <p style="color: #e0e0e0; margin: 0; white-space: pre-wrap; font-size: 13px; line-height: 1.6;">${c.message}</p>
        </div>

        <p style="color: #333; font-size: 10px; margin-top: 16px;">
          Reply directly to this email to respond to ${c.name} at ${c.email}
        </p>
      </div>
    `;

  const text = `New Project Inquiry\n\nName: ${c.name}\nEmail: ${c.email}\nCompany: ${c.company}\nProject Type: ${c.projectType}\nBudget: ${c.budget}\nTimeline: ${c.timeline}\n\nMessage:\n${c.message}`;

  return { subject, html, text };
}

/* -------------------------------------------------------------------------- */
/* SigV4                                                                      */
/* -------------------------------------------------------------------------- */

const encoder = new TextEncoder();

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, '0')).join('');
}

async function sha256Hex(input) {
  return toHex(await crypto.subtle.digest('SHA-256', encoder.encode(input)));
}

async function hmac(key, message) {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    typeof key === 'string' ? encoder.encode(key) : key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message));
}

async function signingKey(secretAccessKey, dateStamp, region) {
  let key = await hmac(`AWS4${secretAccessKey}`, dateStamp);
  key = await hmac(key, region);
  key = await hmac(key, SES_SERVICE);
  return hmac(key, 'aws4_request');
}

/* -------------------------------------------------------------------------- */
/* Send                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * @param {{ region: string, accessKeyId: string, secretAccessKey: string, fromEmail: string }} config
 * @param {{ to: string, replyTo: string, subject: string, html: string, text: string }} email
 */
export async function sendViaSes(config, email) {
  const { region, accessKeyId, secretAccessKey, fromEmail } = config;

  if (!accessKeyId || !secretAccessKey || !region || !fromEmail) {
    throw new Error('SES configuration is incomplete (region/credentials/from address).');
  }

  const host = `email.${region}.amazonaws.com`;
  const payload = JSON.stringify({
    FromEmailAddress: fromEmail,
    Destination: { ToAddresses: [email.to] },
    ReplyToAddresses: [email.replyTo],
    Content: {
      Simple: {
        Subject: { Data: email.subject, Charset: 'UTF-8' },
        Body: {
          Html: { Data: email.html, Charset: 'UTF-8' },
          Text: { Data: email.text, Charset: 'UTF-8' },
        },
      },
    },
  });

  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8);
  const payloadHash = await sha256Hex(payload);
  const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date';

  const canonicalRequest = [
    'POST',
    SES_PATH,
    '',
    'content-type:application/json',
    `host:${host}`,
    `x-amz-content-sha256:${payloadHash}`,
    `x-amz-date:${amzDate}`,
    '',
    signedHeaders,
    payloadHash,
  ].join('\n');

  const scope = `${dateStamp}/${region}/${SES_SERVICE}/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    scope,
    await sha256Hex(canonicalRequest),
  ].join('\n');

  const signature = toHex(await hmac(await signingKey(secretAccessKey, dateStamp, region), stringToSign));

  const response = await fetch(`https://${host}${SES_PATH}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-amz-content-sha256': payloadHash,
      'x-amz-date': amzDate,
      authorization: `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    },
    body: payload,
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`SES responded ${response.status}: ${detail}`);
  }

  return response.json();
}

/**
 * Full request handler shared by the Next route and the Pages Function.
 *
 * @param {Request} request
 * @param {Record<string, string | undefined>} env
 * @returns {Promise<{ status: number, body: object }>}
 */
export async function handleContactRequest(request, env) {
  try {
    if (isRateLimited(clientIpFrom(request.headers))) {
      return { status: 429, body: { error: 'Too many requests. Please try again later.' } };
    }

    const result = validateContact(await request.json());
    if (result.error) {
      return { status: result.status, body: { error: result.error } };
    }

    const { clean } = result;
    const { subject, html, text } = buildEmail(clean);

    await sendViaSes(
      {
        region: env.AWS_SES_REGION || 'us-east-1',
        accessKeyId: env.AWS_SES_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SES_SECRET_ACCESS_KEY,
        fromEmail: env.AWS_SES_FROM_EMAIL || 'portfolio@vishalkushwah.com',
      },
      { to: TO_EMAIL, replyTo: clean.email, subject, html, text }
    );

    return { status: 200, body: { success: true } };
  } catch (error) {
    // Log server-side only — never surface internals to the browser.
    console.error('[Contact API] SES Error:', error instanceof Error ? error.message : error);

    return {
      status: 500,
      body: { error: 'Failed to send message. Please try again or email directly.' },
    };
  }
}
