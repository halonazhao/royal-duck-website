import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { validateEvents, publicEvents, bookingPage, safeJson } from '../lib/events.mjs';
const events = fs.readdirSync('content/events').map(name => JSON.parse(fs.readFileSync('content/events/' + name, 'utf8')));
const example = () => JSON.parse(fs.readFileSync('tests/fixtures/event.json', 'utf8'));
test('all current event records validate', () => {
  validateEvents(events);
});
test('reject duplicate IDs, invalid venue times, missing checkout categories and script URLs', () => {
  assert.throws(() => validateEvents([example(), example()]), /duplicate/);
  for (const [field, value, expected] of [['start','2026-02-30T10:00',/real venue-local/], ['end','2020-01-01T10:00',/after start/], ['timeZone','fake/zone',/time zone/], ['cardBg','javascript:alert(1)',/image/], ['waiverUrl','javascript:alert(1)',/HTTPS/]]) {
    const event = example(); event[field] = value; assert.throws(() => validateEvents([event]), expected);
  }
  const event = example(); event.booking.categoryId = ''; assert.throws(() => validateEvents([event]), /category ID/);
});
test('draft and archived events never appear in a deployed public snapshot', () => {
  const draft = example(), archived = example(), published = example();
  draft.status = 'draft'; archived.status = 'archived';
  assert.equal(publicEvents([draft, archived, published]).length, 1);
  published.booking.enabled = false;
  assert.equal(publicEvents([published])[0].ticketUrl, '');
});
test('checkout template uses only the selected category and escapes user text', () => {
  const event = example(); event.venue = '</title><script>alert(1)</script>';
  const html = bookingPage(event);
  assert.match(html, /"category_id":"59"/);
  assert.ok(!html.includes(event.venue));
  assert.ok(!safeJson(event).includes('<'));
});
test('embed import extracts settings without executing pasted JavaScript', () => {
  const scope = {}; vm.runInNewContext(fs.readFileSync('admin/checkfront-import.js', 'utf8'), scope);
  const original = fs.readFileSync('checkfronts/oaklandmall_checkfront.html', 'utf8');
  const result = scope.parseCheckfrontEmbed(original + '<script>throw new Error("executed")</script>');
  assert.equal(result.categoryId, '48'); assert.equal(result.startDate, '20260713');
  assert.throws(() => scope.parseCheckfrontEmbed(original.replace('royalduck.checkfront.com', 'evil.example').replace("host: 'royalduck.checkfront.com'", "host: 'evil.example'")), /royalduck/);
  assert.throws(() => scope.parseCheckfrontEmbed(original.replace("category_id: '48'", "category_id: '48', item_id: '999'")), /Unsupported/);
  assert.throws(() => scope.parseCheckfrontEmbed(original.replace("category_id: '48'", 'category_id: alert(1)')), /Unsupported/);
});
test('venue clocks remain correct across US time zones', () => {
  const scope = { window: {} }; vm.runInNewContext(fs.readFileSync('events-data.js', 'utf8'), scope);
  const start = scope.window.getEventStartDate({ start: '2026-10-09T10:00', timeZone: 'America/New_York' });
  assert.equal(start.toISOString().slice(0,16), '2026-10-09T14:00');
  const west = scope.window.getEventStartDate({ start: '2026-10-09T10:00', timeZone: 'America/Los_Angeles' });
  assert.equal(west.toISOString().slice(0,16), '2026-10-09T17:00');
});
