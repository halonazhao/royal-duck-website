(async function() {
  'use strict';
  var loading = document.getElementById('admin-loading');
  if (!window.CMS) { loading.textContent = 'The event editor could not load. Check your connection and refresh.'; return; }
  var h = window.h, createClass = window.createClass;
  CMS.registerWidget('venue-datetime', createClass({
    render: function() {
      return h('input', { id: this.props.forID, className: this.props.classNameWrapper,
        type: 'datetime-local', required: true, value: this.props.value || '',
        onChange: function(e) { this.props.onChange(e.target.value); }.bind(this) });
    }
  }));
  CMS.registerWidget('checkfront', createClass({
    getInitialState: function() { return { embed: '', error: '', preview: false }; },
    data: function() {
      var value = this.props.value;
      return value && value.toJS ? value.toJS() : value || { enabled: false, host: 'royalduck.checkfront.com', categoryId: '', startDate: '', options: 'tabs' };
    },
    update: function(key, value) {
      var data = Object.assign({}, this.data()); data[key] = value;
      this.props.onChange(data); this.setState({ preview: false });
    },
    isValid: function() {
      var data = this.data();
      if (data.enabled && !/^[1-9]\d*(?:,[1-9]\d*)*$/.test(data.categoryId || '')) return { error: 'Import a Checkfront embed or enter its category ID before enabling booking.' };
      if (data.startDate && !/^\d{8}$/.test(data.startDate)) return { error: 'Use YYYYMMDD for the booking start date.' };
      return true;
    },
    render: function() {
      var data = this.data(), self = this;
      var previewUrl = 'booking-preview.html?category=' + encodeURIComponent(data.categoryId || '') + '&start=' + encodeURIComponent(data.startDate || '');
      return h('div', { className: 'booking-control' },
        h('label', {}, h('input', { type: 'checkbox', checked: !!data.enabled, onChange: function(e) { self.update('enabled', e.target.checked); } }), ' Enable ticket booking'),
        h('p', { className: 'hint' }, 'Copy the booking embed from Checkfront and import it below. Confirm the preview shows the correct venue. Prices and availability are managed in Checkfront.'),
        h('label', { htmlFor: this.props.forID }, 'Paste Checkfront embed'),
        h('textarea', { id: this.props.forID, rows: 5, value: this.state.embed, placeholder: 'Paste the Checkfront booking widget here…', onChange: function(e) { self.setState({ embed: e.target.value }); } }),
        h('button', { type: 'button', onClick: function() {
          try { var parsed = window.parseCheckfrontEmbed(self.state.embed); self.props.onChange(parsed); self.setState({ error: '', embed: '', preview: false }); }
          catch (error) { self.setState({ error: error.message }); }
        } }, 'Import checkout settings'),
        this.state.error ? h('p', { className: 'error', role: 'alert' }, this.state.error) : null,
        h('label', {}, 'Checkfront category ID', h('input', { value: data.categoryId || '', placeholder: 'e.g. 59', onChange: function(e) { self.update('categoryId', e.target.value.trim()); } })),
        h('label', {}, 'Initial booking date (optional, YYYYMMDD)', h('input', { value: data.startDate || '', placeholder: 'e.g. 20261009', onChange: function(e) { self.update('startDate', e.target.value.trim()); } })),
        h('button', { type: 'button', disabled: !/^[1-9]\d*(?:,[1-9]\d*)*$/.test(data.categoryId || ''), onClick: function() { self.setState({ preview: !self.state.preview }); } }, this.state.preview ? 'Close checkout preview' : 'Preview checkout'),
        this.state.preview ? h('div', {}, h('p', { className: 'hint' }, 'This preview uses live Checkfront availability. Do not complete a purchase while reviewing.'), h('iframe', { title: 'Checkfront checkout preview', src: previewUrl, style: { width: '100%', height: '650px', border: '1px solid #cbd5e1', marginTop: '12px' } })) : null
      );
    }
  }));
  CMS.registerPreviewStyle('/events.css');
  CMS.registerPreviewStyle('/admin/preview.css');
  CMS.registerPreviewTemplate('events', createClass({
    render: function() {
      var ev = this.props.entry.get('data').toJS();
      var asset = ev.cardBg ? this.props.getAsset(ev.cardBg) : null;
      var text = function(field) { return (ev[field] || {}).en || ''; };
      return h('div', { className: 'event-preview' },
        h('p', { className: 'preview-help' }, 'Card preview · Save a draft to build the full staging website.'),
        h('article', { className: 'evc' + (asset ? ' evc--card-bg' : '') + (ev.theme !== 'default' ? ' evc--' + ev.theme : ''), style: { opacity: 1, backgroundImage: asset ? 'url(' + asset.toString() + ')' : undefined } },
          h('div', { className: 'evc-hd' }, h('div', {}, h('div', { className: 'evc-nm' }, ev.city || 'City'), h('div', { className: 'evc-rg' }, ev.region || 'State'))),
          h('div', { className: 'evc-dl' },
            h('div', { className: 'evc-v' }, ev.venue || 'Venue'),
            h('p', { className: 'evc-lb', style: { whiteSpace: 'pre-line' } }, ev.address),
            h('p', {}, (ev.start || 'Opening date') + ' — ' + (ev.end || 'Closing date')),
            h('strong', {}, text('hoursNote')),
            h('p', { style: { whiteSpace: 'pre-line' } }, text('hours')),
            h('p', { style: { whiteSpace: 'pre-line' } }, text('announcement'))),
          h('div', { className: 'evc-ft' }, ev.booking && ev.booking.enabled ? h('span', { className: 'btn bt bs preview-ticket' }, 'Get Tickets') : 'Booking disabled')),
        h('p', { className: 'preview-help' }, 'Visibility after approval: ' + (ev.status || 'published'))
      );
    }
  }));
  try {
    var response = await fetch('config.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Configuration unavailable');
    var config = await response.json();
    // Centralize login on the stable staging origin, including from version previews.
    if (location.protocol === 'https:' && location.origin !== config.backend.base_url) { location.replace(config.backend.base_url + '/admin/'); return; }
    CMS.init({ config: Object.assign({ load_config_file: false }, config) });
    loading.remove();
  } catch (error) { loading.textContent = 'The event editor could not start: ' + error.message; }
})();
