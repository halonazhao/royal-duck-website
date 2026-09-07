import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateEvents, publicEvents, bookingPage, safeJson } from '../lib/events.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
const deployment = JSON.parse(await fs.readFile(path.join(root, 'deployment.json'), 'utf8'));
const contentDir = path.join(root, 'content/events');
const events = [];
for (const filename of (await fs.readdir(contentDir)).filter(name => name.endsWith('.json')).sort()) {
  const event = JSON.parse(await fs.readFile(path.join(contentDir, filename), 'utf8'));
  if (filename !== event.eventKey + '.json') throw new Error(`Event ID must match filename: ${filename}`);
  events.push(event);
}
validateEvents(events);
for (const event of events) {
  if (/^\/?assets\//.test(event.cardBg)) await fs.access(path.join(root, event.cardBg.replace(/^\//, '')));
}
// Recreate only this task's generated output directory, never the source folder.
await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(output, { recursive: true });
for (const entry of await fs.readdir(root, { withFileTypes: true })) {
  if (entry.isFile() && /\.(html|css|js|txt|xml)$/.test(entry.name)) await fs.copyFile(path.join(root, entry.name), path.join(output, entry.name));
}
await fs.cp(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true });
await fs.cp(path.join(root, 'admin'), path.join(output, 'admin'), { recursive: true });
const published = publicEvents(events);
await fs.appendFile(path.join(output, 'events-data.js'), '\nwindow.EVENTS = ' + safeJson(published) + ';\n');
await fs.mkdir(path.join(output, 'checkfronts'), { recursive: true });
for (const event of published.filter(event => event.booking.enabled)) {
  await fs.writeFile(path.join(output, 'checkfronts', `${event.eventKey}_checkfront.html`), bookingPage(event));
}
const config = JSON.parse(await fs.readFile(path.join(root, 'admin/config.json'), 'utf8'));
config.backend = { name: 'github', repo: deployment.repository, branch: 'main', base_url: deployment.adminOrigin, auth_endpoint: 'api/auth/auth', preview_context: 'staging-preview' };
config.site_url = deployment.productionOrigin;
config.display_url = deployment.adminOrigin;
await fs.writeFile(path.join(output, 'admin/config.json'), JSON.stringify(config, null, 2));
await fs.copyFile(path.join(root, '_headers'), path.join(output, '_headers'));
await fs.writeFile(path.join(output, 'release.json'), JSON.stringify({ commit: process.env.SOURCE_COMMIT || 'local', events: published.length }));
console.log(`Built ${published.length} published events and ${published.filter(event => event.booking.enabled).length} checkout pages in dist/ (${events.length - published.length} hidden).`);
