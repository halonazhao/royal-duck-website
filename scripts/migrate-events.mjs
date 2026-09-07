// One-time migration. Emits an apply_patch patch; never executes pasted embeds.
import fs from 'node:fs';
import vm from 'node:vm';
const scope = { window: {} };
vm.runInNewContext(fs.readFileSync('events-data.js', 'utf8'), scope);
const translations = {};
for (const match of fs.readFileSync('i18n.js', 'utf8').matchAll(/'(hours\.[^']+)':\s*('(?:\\.|[^'\\])*')/g)) {
  (translations[match[1]] ||= []).push(vm.runInNewContext(match[2]));
}
const plain = text => (text || '').replace(/<br\s*\/?\s*>/gi, '\n').replace(/&amp;/g, '&');
const files = [];
for (const ev of scope.window.EVENTS) {
  const file = `checkfronts/${ev.eventKey}_checkfront.html`;
  const embed = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  let key = ev.eventKey === 'sanantonio' ? 'sa' : ['arlington', 'franklinpark'].includes(ev.eventKey) ? 'afternoon_evening' : ev.eventKey;
  const hours = translations[`hours.${key}`] || translations['hours.default'];
  let theme = 'default';
  if (['ottawa', 'deerbrook', 'oaklandmall', 'southcenter'].includes(ev.eventKey)) theme = 'ottawa';
  if (ev.eventKey === 'niagarafalls') theme = 'niagara';
  if (ev.eventKey === 'arlington') theme = 'arlington';
  if (['franklinpark', 'woodfield'].includes(ev.eventKey)) theme = 'franklinpark';
  if (ev.eventKey === 'sanantonio') theme = 'san-antonio';
  const record = { ...ev, address: plain(ev.address), status: 'published', theme,
    hours: { en: plain(hours[0]), es: plain(hours[1]) },
    hoursNote: { en: '', es: '' },
    announcement: { en: plain(ev.note), es: '' },
    booking: { enabled: !!embed, host: 'royalduck.checkfront.com',
      categoryId: embed.match(/category_id:\s*'([^']+)'/)?.[1] || '',
      startDate: embed.match(/start_date:\s*'([^']+)'/)?.[1] || '', options: 'tabs' }
  };
  if (ev.eventKey === 'mainplace') record.hoursNote = { en: translations['hours.mainplace_note'][0], es: translations['hours.mainplace_note'][1] };
  // This referenced image was missing in the original folder; retain its blue card treatment with a local SVG.
  if (record.cardBg === 'assets/blue_card.png') record.cardBg = 'assets/blue-card.svg';
  record.cardBg ||= '';
  delete record.ticketUrl;
  delete record.note;
  files.push([`${process.cwd()}/content/events/${ev.eventKey}.json`, JSON.stringify(record, null, 2) + '\n']);
}
console.log('*** Begin Patch\n' + files.map(([path, text]) => `*** Add File: ${path}\n` + text.trimEnd().split('\n').map(line => '+' + line).join('\n')).join('\n') + '\n*** End Patch');
