// harrisonkeen.tech on Cloudflare Workers (static assets + this script).
//
// Static files are served by the assets layer before this script runs; it only
// sees requests that matched no file. It does two jobs:
//   1. POST /api/form  — the Websites enquiry form and the client feedback form
//      (replaced Netlify Forms on 2026-11-20). Saves to D1, emails via Resend.
//   2. Acting videos   — the mp4s under acting/resources/ are over the 25 MiB
//      asset limit, so they live in R2 (bucket hk-media, same key as the path)
//      and are served from here with Range support so seeking works.

const MAX_FIELD = 5000;

export const FORMS = {
  'websites-enquiry': {
    page: '/websites/',
    fields: ['name', 'email', 'links', 'message', 'source'],
    subject: (d) => `New website enquiry: ${d.name || 'no name'}`,
    replyTo: (d) => d.email,
  },
  'client-feedback': {
    page: '/feedback/',
    fields: ['client', 'site', 'rating', 'loved', 'change',
      'price_too_cheap', 'price_bargain', 'price_expensive', 'price_too_expensive',
      'testimonial', 'display_name', 'role', 'consent'],
    subject: (d) => `Client feedback: ${d.display_name || d.client || 'unknown'} (${d.rating || '?'}★)`,
    replyTo: () => undefined,
  },
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export async function handleForm(request, env, fetchFn = fetch) {
  if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405);

  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false, error: 'origin' }, 403);

  let form;
  try { form = await request.formData(); } catch { return json({ ok: false, error: 'body' }, 400); }

  const spec = FORMS[form.get('form-name')];
  if (!spec) return json({ ok: false, error: 'form' }, 400);

  const wantsPage = (request.headers.get('accept') || '').includes('text/html');
  const done = () => (wantsPage ? Response.redirect(new URL(spec.page, request.url), 303) : json({ ok: true }));

  // Honeypot: bots fill every field. Pretend it worked, keep nothing.
  if ((form.get('bot-field') || '').trim()) return done();

  const data = {};
  for (const k of spec.fields) {
    const v = form.get(k);
    if (typeof v === 'string' && v.trim()) data[k] = v.trim().slice(0, MAX_FIELD);
  }
  const name = form.get('form-name');
  const ip = request.headers.get('cf-connecting-ip') || '';
  const created = new Date().toISOString();

  let saved = false;
  let emailed = false;
  try {
    await env.DB.prepare('INSERT INTO submissions (form, created_at, data, ip) VALUES (?, ?, ?, ?)')
      .bind(name, created, JSON.stringify(data), ip).run();
    saved = true;
  } catch (e) { console.error('d1 insert failed', e); }

  try {
    const text = spec.fields.filter((k) => data[k]).map((k) => `${k}:\n${data[k]}\n`).join('\n')
      + `\n— ${name}, ${created}, ${ip}`;
    const res = await fetchFn('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: env.SENDER, to: [env.OWNER_EMAIL], subject: spec.subject(data), text,
        ...(spec.replyTo(data) ? { reply_to: spec.replyTo(data) } : {}),
      }),
    });
    emailed = res.ok;
    if (!res.ok) console.error('resend failed', res.status, await res.text());
  } catch (e) { console.error('resend threw', e); }

  if (saved && emailed) {
    try { await env.DB.prepare('UPDATE submissions SET emailed = 1 WHERE form = ? AND created_at = ?').bind(name, created).run(); } catch {}
  }
  return saved || emailed ? done() : json({ ok: false, error: 'store' }, 500);
}

export async function serveMedia(request, env) {
  const url = new URL(request.url);
  const key = decodeURIComponent(url.pathname.slice(1));
  if (!key.startsWith('acting/resources/') || !key.endsWith('.mp4')) return null;

  let obj;
  try {
    obj = await env.MEDIA.get(key, { range: request.headers, onlyIf: request.headers });
  } catch {
    const head = await env.MEDIA.head(key);
    return new Response(null, { status: 416, headers: head ? { 'content-range': `bytes */${head.size}` } : {} });
  }
  if (obj === null) return null;

  const h = new Headers();
  obj.writeHttpMetadata(h);
  h.set('etag', obj.httpEtag);
  h.set('accept-ranges', 'bytes');
  h.set('cache-control', 'public, max-age=86400');
  if (!('body' in obj)) return new Response(null, { status: 304, headers: h });

  const size = obj.size;
  let status = 200;
  let length = size;
  if (request.headers.has('range') && obj.range) {
    const r = obj.range;
    const offset = 'suffix' in r ? size - r.suffix : (r.offset ?? 0);
    length = 'suffix' in r ? r.suffix : (r.length ?? size - offset);
    h.set('content-range', `bytes ${offset}-${offset + length - 1}/${size}`);
    status = 206;
  }
  h.set('content-length', String(length));
  return new Response(request.method === 'HEAD' ? null : obj.body, { status, headers: h });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/form') return handleForm(request, env);
    if (request.method === 'GET' || request.method === 'HEAD') {
      const media = await serveMedia(request, env);
      if (media) return media;
    }
    return env.ASSETS.fetch(request);
  },
};
