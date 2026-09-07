(function(root) {
  'use strict';
  root.parseCheckfrontEmbed = function(input) {
    if (typeof input !== 'string' || input.length > 30000) throw new Error('Paste a Checkfront booking widget (under 30 KB).');
    var match = input.match(/new\s+DROPLET\.Widget\s*\(\s*\{([\s\S]*?)\}\s*\)/);
    if (!match) throw new Error('This is not a supported Checkfront booking widget. Copy the embed containing new DROPLET.Widget.');
    var fields = {}, rest = match[1];
    var pattern = /\s*(?:([a-z_]+)|"([a-z_]+)"|'([a-z_]+)')\s*:\s*(?:'([^'\\]*)'|"([^"\\]*)")\s*(?:,|$)/y;
    var offset = 0;
    while (offset < rest.length && rest.slice(offset).trim()) {
      pattern.lastIndex = offset;
      var pair = pattern.exec(rest);
      if (!pair) throw new Error('Unsupported widget settings. Paste the original Checkfront embed without editing it.');
      var key = pair[1] || pair[2] || pair[3];
      if (!['host','target','category_id','start_date','options','provider'].includes(key) || Object.prototype.hasOwnProperty.call(fields, key)) throw new Error('Unsupported or duplicate Checkfront setting: ' + key);
      fields[key] = pair[4] === undefined ? pair[5] : pair[4];
      offset = pattern.lastIndex;
    }
    if (fields.host !== 'royalduck.checkfront.com') throw new Error('Use a widget from royalduck.checkfront.com.');
    if (!/^[1-9]\d*(?:,[1-9]\d*)*$/.test(fields.category_id || '')) throw new Error('The widget needs a location category_id.');
    if (fields.options && fields.options !== 'tabs') throw new Error('Only the tabs widget layout is supported.');
    if (fields.provider && fields.provider !== 'droplet') throw new Error('Unsupported widget provider.');
    if (fields.start_date && !/^\d{8}$/.test(fields.start_date)) throw new Error('Start date must use YYYYMMDD.');
    return { enabled: true, host: fields.host, categoryId: fields.category_id, startDate: fields.start_date || '', options: 'tabs' };
  };
})(typeof window !== 'undefined' ? window : globalThis);
