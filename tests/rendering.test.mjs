import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import { publicEvents } from '../lib/events.mjs';
const source = file => fs.readFileSync(file, 'utf8');
const example = () => JSON.parse(source('tests/fixtures/event.json'));
function runtime(html, url = 'https://example.test/home') {
  const dom = new JSDOM(html, { url, runScripts: 'outside-only' });
  dom.window.eval(source('events-data.js'));
  dom.window.gsap = { registerPlugin() {}, to() {}, fromTo() {}, set() {}, timeline() { return { to() {} }; } };
  return dom;
}
test('new card renders ordinary text safely, preserves line breaks, and changes language', () => {
  const dom = runtime('<div id="evGrid"></div>');
  const event = example(); event.eventKey = 'new-location'; event.city = '<img src=x onerror=alert(1)>'; event.address = 'First line\nSecond line'; event.hours = { en: 'Weekdays\nWeekends', es: 'Entre semana\nFines de semana' };
  dom.window.EVENTS = publicEvents([event]);
  dom.window.getEventStatus = () => 'live';
  let lang = 'en'; dom.window.I18n = { getLang: () => lang, t: key => key };
  dom.window.eval(source('events.js'));
  dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
  assert.equal(dom.window.document.querySelectorAll('.evc').length, 1);
  assert.equal(dom.window.document.querySelector('.evc-nm').textContent, event.city);
  assert.equal(dom.window.document.querySelectorAll('.evc img').length, 0);
  assert.ok(dom.window.document.querySelector('.evc-lb').innerHTML.includes('<br>'));
  assert.equal(dom.window.document.querySelector('.ev-get-tickets-btn').getAttribute('href'), 'tickets.html?event=new-location');
  lang = 'es'; dom.window.document.dispatchEvent(new dom.window.Event('rd-locale-change'));
  assert.match(dom.window.document.querySelector('.evc').textContent, /Entre semana/);
  dom.window.close();
});
test('ticket selection opens only the selected enabled event checkout', () => {
  const dom = runtime(source('tickets.html'), 'https://example.test/tickets.html?event=edisonmall');
  const event = example(), disabled = example(); disabled.eventKey = 'disabled'; disabled.booking.enabled = false;
  dom.window.EVENTS = publicEvents([event, disabled]); dom.window.getEventStatus = () => 'upcoming';
  const script = [...dom.window.document.querySelectorAll('script:not([src])')].find(script => script.textContent.includes("var iframe = document.getElementById('tix-checkfront-iframe')"));
  dom.window.eval(script.textContent);
  const frame = dom.window.document.getElementById('tix-checkfront-iframe');
  assert.equal(frame.getAttribute('src'), 'checkfronts/edisonmall_checkfront.html');
  assert.equal(dom.window.document.querySelector('[data-event="disabled"]'), null);
  dom.window.document.querySelector('[data-event="all"]').click();
  assert.equal(frame.getAttribute('src'), null);
  dom.window.close();
});
test('empty event list never links to a legacy fallback checkout', () => {
  const dom = runtime(source('tickets.html'), 'https://example.test/tickets.html?event=deerbrook');
  const script = [...dom.window.document.querySelectorAll('script:not([src])')].find(script => script.textContent.includes("var iframe = document.getElementById('tix-checkfront-iframe')"));
  dom.window.eval(script.textContent);
  assert.equal(dom.window.document.querySelectorAll('.tix-loc-btn').length, 1);
  assert.equal(dom.window.document.getElementById('tix-checkfront-iframe').getAttribute('src'), null);
  dom.window.close();
});
