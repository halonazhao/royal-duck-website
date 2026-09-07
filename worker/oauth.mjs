const cookieName = '__Host-rd-oauth';
const cookie = value => `${cookieName}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${value ? 600 : 0}`;
const jsonForScript = value => JSON.stringify(value).replace(/</g, '\\u003c');
const noStore = { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff' };
const errorResponse = (message, status = 400) => new Response(message, { status, headers: { ...noStore, 'Set-Cookie': cookie('') } });

export async function handleAuth(request, env, fetcher = fetch) {
  const url = new URL(request.url);
  if (request.method !== 'GET') return errorResponse('Method not allowed', 405);
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) return errorResponse('GitHub login is not connected yet. Ask Halona to finish OAuth application setup.', 503);
  if (url.origin !== env.ADMIN_ORIGIN) return errorResponse('Invalid login origin', 403);
  const callback = env.ADMIN_ORIGIN + '/api/auth/callback';
  if (url.pathname === '/api/auth/auth') {
    if (url.searchParams.get('provider') !== 'github' || url.searchParams.get('site_id') !== new URL(env.ADMIN_ORIGIN).hostname) return errorResponse('Invalid login request');
    const state = crypto.randomUUID() + crypto.randomUUID();
    const redirect = new URL('https://github.com/login/oauth/authorize');
    redirect.search = new URLSearchParams({ client_id: env.GITHUB_CLIENT_ID, redirect_uri: callback, scope: 'repo', state }).toString();
    return new Response(null, { status: 302, headers: { ...noStore, Location: redirect.href, 'Set-Cookie': cookie(state) } });
  }
  if (url.pathname !== '/api/auth/callback') return errorResponse('Not found', 404);
  const state = url.searchParams.get('state');
  const savedState = (request.headers.get('Cookie') || '').split(';').map(part => part.trim()).find(part => part.startsWith(cookieName + '='))?.slice(cookieName.length + 1);
  if (!state || !savedState || state !== savedState || !url.searchParams.get('code')) return errorResponse('Login expired or was declined. Close this window and try again.');
  try {
    const exchange = await fetcher('https://github.com/login/oauth/access_token', {
      method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code: url.searchParams.get('code'), redirect_uri: callback })
    });
    const result = await exchange.json();
    if (!exchange.ok || !result.access_token) return errorResponse('GitHub could not complete this login. Try again.', 401);
    // Authenticate only staff with write access to this specific content repository.
    const repo = await fetcher('https://api.github.com/repos/' + env.GITHUB_REPOSITORY, {
      headers: { Authorization: 'Bearer ' + result.access_token, Accept: 'application/vnd.github+json', 'User-Agent': 'royal-duck-event-admin' }
    });
    const repository = await repo.json();
    if (!repo.ok || !repository.permissions?.push) return errorResponse('Your GitHub account has not been granted event editing access. Contact Halona.', 403);
    const nonce = crypto.randomUUID().replaceAll('-', '');
    const message = 'authorization:github:success:' + JSON.stringify({ token: result.access_token, provider: 'github' });
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Royal Duck login</title></head><body><p>Login complete. Returning to the event editor…</p><script nonce="${nonce}">
const origin=${jsonForScript(env.ADMIN_ORIGIN)};
window.addEventListener('message',function(event){
  if(event.origin!==origin || event.source!==window.opener || event.data!=='authorizing:github')return;
  window.opener.postMessage(${jsonForScript(message)},origin);
},{once:true});
if(window.opener)window.opener.postMessage('authorizing:github',origin);
</script></body></html>`;
    return new Response(html, { headers: { ...noStore, 'Content-Type': 'text/html; charset=utf-8', 'Set-Cookie': cookie(''), 'Content-Security-Policy': `default-src 'none'; script-src 'nonce-${nonce}'; frame-ancestors 'none'; base-uri 'none'` } });
  } catch {
    return errorResponse('GitHub is temporarily unavailable. Close this window and try again.', 502);
  }
}
