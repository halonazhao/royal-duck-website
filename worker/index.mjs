import { handleAuth } from './oauth.mjs';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/auth/')) {
      if (env.SITE_ENV !== 'staging' || url.origin !== env.ADMIN_ORIGIN) return new Response('Not found', { status: 404 });
      return handleAuth(request, env);
    }
    if ((url.pathname === '/admin' || url.pathname.startsWith('/admin/')) && url.origin !== env.ADMIN_ORIGIN && !['localhost', '127.0.0.1'].includes(url.hostname)) {
      return Response.redirect(env.ADMIN_ORIGIN + '/admin/', 302);
    }
    const response = await env.ASSETS.fetch(request);
    if (env.SITE_ENV === 'staging') {
      const headers = new Headers(response.headers);
      headers.set('X-Robots-Tag', 'noindex, nofollow');
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }
    return response;
  }
};
