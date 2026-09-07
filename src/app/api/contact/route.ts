import { NextResponse } from 'next/server';

// Plain .mjs module, shared verbatim with the Cloudflare Pages Function.
import { handleContactRequest } from '@/lib/contact-mailer.mjs';

/**
 * Local-development only.
 *
 * `next.config.mjs` sets `output: 'export'`, so this handler is NOT part of the
 * production build. The deployed endpoint is functions/api/contact.js (Cloudflare Pages
 * Function). Both call the same handleContactRequest, so behaviour stays in sync.
 */
export async function POST(request: Request) {
  const { status, body } = await handleContactRequest(request, process.env);

  return NextResponse.json(body, { status });
}
