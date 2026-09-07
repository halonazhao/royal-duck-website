import test from 'node:test';
import assert from 'node:assert/strict';
import { handleAuth } from '../worker/oauth.mjs';
import worker from '../worker/index.mjs';
const origin = 'https://little-river-fc26.halona-zhao.workers.dev';
const env = { ADMIN_ORIGIN: origin, SITE_ENV: 'staging', GITHUB_REPOSITORY: 'halonazhao/royal-duck-website', GITHUB_CLIENT_ID: 'test-id', GITHUB_CLIENT_SECRET: 'test-secret' };
test('OAuth refuses unconfigured login and an untrusted editor origin', async () => {
  assert.equal((await handleAuth(new Request(origin + '/api/auth/auth'), {})).status, 503);
  assert.equal((await handleAuth(new Request(origin + '/api/auth/auth?provider=github&site_id=evil.example'), env)).status, 400);
});
test('OAuth generates a secure state cookie and validates it before exchanging a code', async () => {
  const start = await handleAuth(new Request(origin + '/api/auth/auth?provider=github&site_id=' + new URL(origin).hostname), env);
  assert.equal(start.status, 302);
  assert.match(start.headers.get('set-cookie'), /HttpOnly; Secure; SameSite=Lax/);
  const bad = await handleAuth(new Request(origin + '/api/auth/callback?code=fake&state=bad'), env, () => { throw new Error('must not exchange'); });
  assert.equal(bad.status, 400);
});
test('OAuth requires repository write access and confines token delivery to the editor origin', async () => {
  const request = new Request(origin + '/api/auth/callback?code=test&state=correct', { headers: { Cookie: '__Host-rd-oauth=correct' } });
  const mock = allowed => async url => Response.json(url.includes('access_token') ? { access_token: 'fixture-token' } : { permissions: { push: allowed } });
  assert.equal((await handleAuth(request, env, mock(false))).status, 403);
  const response = await handleAuth(request, env, mock(true));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.match(response.headers.get('content-security-policy'), /frame-ancestors 'none'/);
  const html = await response.text(); assert.ok(html.includes(origin)); assert.ok(!html.includes("postMessage('*'"));
  assert.match(response.headers.get('set-cookie'), /Max-Age=0/);
});
test('production redirects admin to staging and exposes no OAuth endpoint', async () => {
  const prod = { ...env, SITE_ENV: 'production' };
  assert.equal((await worker.fetch(new Request('https://www.royalduckusa.com/api/auth/auth'), prod)).status, 404);
  assert.equal((await worker.fetch(new Request('https://www.royalduckusa.com/admin/'), prod)).headers.get('location'), origin + '/admin/');
});
test('all staging pages discourage indexing', async () => {
  const response = await worker.fetch(new Request(origin + '/home'), { ...env, ASSETS: { fetch: async () => new Response('example') } });
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
});
