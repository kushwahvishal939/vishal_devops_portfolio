/**
 * Cloudflare Pages Function for POST /api/contact.
 *
 * The site is built with Next.js `output: 'export'`, which drops API route handlers
 * entirely — so the Next route at src/app/api/contact/route.ts only exists for `next dev`.
 * In production this file is what actually serves the endpoint. Pages Functions take
 * priority over the static asset handler, which would otherwise answer POST with a 405.
 *
 * Secrets come from the Pages project environment (Settings → Environment variables):
 *   AWS_SES_ACCESS_KEY_ID, AWS_SES_SECRET_ACCESS_KEY, AWS_SES_REGION, AWS_SES_FROM_EMAIL
 */

import { handleContactRequest } from '../../src/lib/contact-mailer.mjs';

const JSON_HEADERS = { 'content-type': 'application/json' };

export async function onRequestPost(context) {
  const { status, body } = await handleContactRequest(context.request, context.env);

  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

export function onRequest() {
  return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
    status: 405,
    headers: { ...JSON_HEADERS, allow: 'POST' },
  });
}
