export const HOST = 'royalduck.checkfront.com';
export const THEMES = ['default', 'ottawa', 'niagara', 'arlington', 'franklinpark', 'san-antonio'];
export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
export const safeJson = value => JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');

function localDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value || '')) return false;
  const date = new Date(value + ':00Z');
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 16) === value;
}

export function validateEvents(events) {
  const errors = [], keys = new Set();
  for (const event of events) {
    const fail = message => errors.push(`${event.eventKey || '(new event)'}: ${message}`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(event.eventKey || '') || event.eventKey === 'all') fail('use a unique lowercase event ID, with optional hyphens; "all" is reserved');
    if (keys.has(event.eventKey)) fail('duplicate event ID');
    keys.add(event.eventKey);
    for (const field of ['city', 'region', 'venue', 'address']) if (typeof event[field] !== 'string' || !event[field].trim()) fail(`${field} is required`);
    for (const field of ['start', 'end']) if (!localDate(event[field])) fail(`${field} must be a real venue-local date and time (YYYY-MM-DDTHH:mm)`);
    if (event.end <= event.start) fail('end must be after start');
    try { if (!event.timeZone) throw new Error(); new Intl.DateTimeFormat('en', { timeZone: event.timeZone }); } catch { fail('choose a valid IANA time zone'); }
    if (!Number.isFinite(event.lat) || Math.abs(event.lat) > 90) fail('latitude must be between -90 and 90');
    if (!Number.isFinite(event.lng) || Math.abs(event.lng) > 180) fail('longitude must be between -180 and 180');
    if (!['published', 'draft', 'archived'].includes(event.status)) fail('invalid visibility');
    if (!THEMES.includes(event.theme)) fail('choose a supported card style');
    if (!/^(#[0-9a-fA-F]{6}|var\(--(?:gold|coral|teal|lavender|aqua|cyan)\))$/.test(event.glow || '')) fail('choose a supported glow color');
    for (const field of ['hours', 'hoursNote', 'announcement']) {
      if ((field === 'hours' && typeof event[field]?.en !== 'string') || (event[field]?.en != null && typeof event[field].en !== 'string') || (event[field]?.es != null && typeof event[field].es !== 'string')) fail(`${field} needs English text and optional Spanish text`);
    }
    if (!event.hours?.en?.trim()) fail('English opening hours are required');
    if (event.cardBg && !/^(https:\/\/[A-Za-z0-9.-]+(?::\d+)?\/[A-Za-z0-9_./%?=&+-]*|\/?assets\/[A-Za-z0-9_./-]+)$/.test(event.cardBg)) fail('image must be an HTTPS URL or a file in assets');
    if (event.cardBg?.split('/').includes('..')) fail('image path cannot traverse directories');
    if (event.waiverUrl) {
      try { const url = new URL(event.waiverUrl); if (url.protocol !== 'https:' || url.username || url.password) throw new Error(); } catch { fail('waiver link must be a valid HTTPS URL'); }
    }
    const booking = event.booking;
    if (!booking || typeof booking.enabled !== 'boolean') { fail('booking settings are required'); continue; }
    if (booking.host !== HOST) fail(`Checkfront host must be ${HOST}`);
    if (booking.enabled && !/^[1-9]\d*(?:,[1-9]\d*)*$/.test(booking.categoryId || '')) fail('enabled booking requires a Checkfront category ID');
    if (booking.options !== 'tabs') fail('unsupported Checkfront options');
    if (booking.startDate && (!/^\d{8}$/.test(booking.startDate) || !localDate(booking.startDate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3') + 'T00:00'))) fail('Checkfront start date must be a real date in YYYYMMDD format');
  }
  if (errors.length) throw new Error('Event validation failed:\n' + errors.join('\n'));
  return events;
}

export function publicEvents(events) {
  return events.filter(event => event.status === 'published').map(event => ({ ...event,
    ticketUrl: event.booking.enabled ? `tickets.html?event=${encodeURIComponent(event.eventKey)}` : ''
  }));
}

export function bookingPage(event) {
  const booking = event.booking;
  const config = { host: HOST, target: 'CHECKFRONT_WIDGET_01', category_id: booking.categoryId, options: 'tabs', provider: 'droplet' };
  if (booking.startDate) config.start_date = booking.startDate;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(event.venue)} — Booking</title><style>body{margin:0;font:16px system-ui;background:#fff;color:#172554}a{color:#075985}</style></head><body>
<div id="CHECKFRONT_WIDGET_01"><p>Loading availability for ${escapeHtml(event.venue)}…</p></div>
<script src="https://${HOST}/lib/interface--0.js"></script>
<script>if(window.DROPLET){new DROPLET.Widget(${safeJson(config)}).render();}else{document.getElementById('CHECKFRONT_WIDGET_01').textContent='Booking is temporarily unavailable. Please try again shortly.';}</script>
</body></html>\n`;
}
