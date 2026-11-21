// node --test test/
import test from 'node:test';
import assert from 'node:assert/strict';
import { handleForm, serveMedia } from '../worker/index.js';

function fakeDB({ fail = false } = {}) {
  const rows = [];
  return {
    rows,
    prepare(sql) {
      return { bind: (...a) => ({ run: async () => { if (fail) throw new Error('d1 down'); rows.push({ sql, a }); } }) };
    },
  };
}
const env = (db, extra = {}) => ({ DB: db, RESEND_API_KEY: 'k', SENDER: 'S <s@x>', OWNER_EMAIL: 'o@x', ...extra });
const post = (fields, headers = {}) => new Request('https://harrisonkeen.tech/api/form', {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded', ...headers },
  body: new URLSearchParams(fields).toString(),
});
const okMail = (sent) => async (url, init) => { sent.push(JSON.parse(init.body)); return new Response('{}', { status: 200 }); };

test('enquiry is stored and emailed with reply-to', async () => {
  const db = fakeDB(); const sent = [];
  const res = await handleForm(post({ 'form-name': 'websites-enquiry', name: 'Jane', email: 'j@x.com', message: 'hi', evil: 'x' }), env(db), okMail(sent));
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  const data = JSON.parse(db.rows[0].a[2]);
  assert.deepEqual(data, { name: 'Jane', email: 'j@x.com', message: 'hi' });
  assert.equal(sent[0].reply_to, 'j@x.com');
  assert.match(sent[0].subject, /Jane/);
  assert.match(db.rows[1].sql, /emailed = 1/);
});

test('honeypot is accepted silently and nothing kept', async () => {
  const db = fakeDB(); const sent = [];
  const res = await handleForm(post({ 'form-name': 'client-feedback', rating: '5', 'bot-field': 'spam' }), env(db), okMail(sent));
  assert.equal(res.status, 200);
  assert.equal(db.rows.length, 0); assert.equal(sent.length, 0);
});

test('unknown form, wrong method and foreign origin are refused', async () => {
  assert.equal((await handleForm(post({ 'form-name': 'nope' }), env(fakeDB()), okMail([]))).status, 400);
  assert.equal((await handleForm(new Request('https://harrisonkeen.tech/api/form'), env(fakeDB()))).status, 405);
  assert.equal((await handleForm(post({ 'form-name': 'client-feedback' }, { origin: 'https://evil.test' }), env(fakeDB()), okMail([]))).status, 403);
});

test('still succeeds when only one of store/email works; fails when both fail', async () => {
  const mailDown = async () => new Response('no', { status: 500 });
  assert.equal((await handleForm(post({ 'form-name': 'client-feedback', rating: '4' }), env(fakeDB()), mailDown)).status, 200);
  assert.equal((await handleForm(post({ 'form-name': 'client-feedback', rating: '4' }), env(fakeDB({ fail: true })), okMail([]))).status, 200);
  assert.equal((await handleForm(post({ 'form-name': 'client-feedback', rating: '4' }), env(fakeDB({ fail: true })), mailDown)).status, 500);
});

test('no-JS post redirects back to the form page', async () => {
  const res = await handleForm(post({ 'form-name': 'client-feedback', rating: '5' }, { accept: 'text/html' }), env(fakeDB()), okMail([]));
  assert.equal(res.status, 303);
  assert.equal(res.headers.get('location'), 'https://harrisonkeen.tech/feedback/');
});

function fakeR2(size) {
  return {
    async get(key, opts) {
      if (key !== 'acting/resources/Videos/a.mp4') return null;
      const range = opts.range.get('range');
      const m = range && /bytes=(\d+)-(\d*)/.exec(range);
      const r = m ? { offset: +m[1], length: (m[2] ? +m[2] : size - 1) - +m[1] + 1, suffix: undefined } : undefined;
      return { size, range: r, httpEtag: '"e"', body: 'BODY', writeHttpMetadata: (h) => h.set('content-type', 'video/mp4') };
    },
  };
}

test('media: full, ranged, non-media and missing', async () => {
  const e = { MEDIA: fakeR2(1000) };
  const full = await serveMedia(new Request('https://h/acting/resources/Videos/a.mp4'), e);
  assert.equal(full.status, 200); assert.equal(full.headers.get('content-length'), '1000');
  const part = await serveMedia(new Request('https://h/acting/resources/Videos/a.mp4', { headers: { range: 'bytes=100-199' } }), e);
  assert.equal(part.status, 206);
  assert.equal(part.headers.get('content-range'), 'bytes 100-199/1000');
  assert.equal(part.headers.get('content-length'), '100');
  assert.equal(await serveMedia(new Request('https://h/index.html'), e), null);
  assert.equal(await serveMedia(new Request('https://h/acting/resources/Videos/b.mp4'), e), null);
});
