(function() {
  'use strict';
  var h = window.h;
  var colors = [
    { value: 'default', label: 'Aqua', color: '#7afff8' },
    { value: 'ottawa', label: 'Lavender', color: '#C4B5FD' },
    { value: 'niagara', label: 'Blue', color: '#93C5FD' },
    { value: 'franklinpark', label: 'Lime', color: '#c5f84f' },
    { value: 'san-antonio', label: 'Gold', color: '#FBBF24' },
    { value: 'arlington', label: 'Lime · compact title', color: '#c5f84f' }
  ];
  var base = 'https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/';
  var backgrounds = [
    { label: 'No image', value: '' },
    { label: 'Lime duck castle', value: base + 'cdf78097-a210-42be-9436-d33fee80a400/public' },
    { label: 'Aqua adventure park', value: base + '72a4f8e0-21fc-4e7a-5664-812828de4000/public' },
    { label: 'Lavender playground', value: base + '476db8f0-b647-4c7b-1853-b90e3226b400/public' },
    { label: 'Golden duck park', value: base + '2c9edb26-f682-4fad-4a97-743454e22e00/public' },
    { label: 'Blue waves', value: 'assets/blue-card.svg' }
  ];
  var sameImage = function(a, b) { return (a || '').replace(/^\//, '') === (b || '').replace(/^\//, ''); };
  var assetUrl = function(value) { return /^assets\//.test(value) ? '/' + value : value; };

  CMS.registerWidget('card-color', window.createClass({
    render: function() {
      var self = this;
      return h('div', { className: 'appearance-control', id: this.props.forID },
        h('div', { className: 'color-choices', role: 'group', 'aria-label': 'Card border and button color' }, colors.map(function(choice) {
          var selected = (self.props.value || 'default') === choice.value;
          return h('button', { key: choice.value, type: 'button', className: 'appearance-choice color-choice', 'aria-pressed': selected,
            onClick: function() { self.props.onChange(choice.value); } },
            h('span', { className: 'color-swatch', style: { backgroundColor: choice.color }, 'aria-hidden': true }),
            h('span', {}, choice.label), selected ? h('span', { className: 'choice-check', 'aria-hidden': true }, '✓') : null);
        })),
        h('p', { className: 'appearance-hint' }, 'Sets the card border and Get Tickets button. The background image is chosen separately.'));
    }
  }));

  // Reuse Decap's image control so uploads, media selection, and draft assets keep working.
  var ImageControl = CMS.getWidget('image').control;
  CMS.registerWidget('card-background', window.createClass({
    render: function() {
      var self = this;
      var selected = backgrounds.find(function(choice) { return sameImage(choice.value, self.props.value); });
      return h('div', { className: 'appearance-control' },
        h('div', { className: 'background-choices', role: 'group', 'aria-label': 'Card background image' }, backgrounds.map(function(choice) {
          var active = sameImage(choice.value, self.props.value);
          return h('button', { type: 'button', key: choice.value, className: 'appearance-choice background-choice', 'aria-pressed': active,
            onClick: function() { self.props.onChange(choice.value); } },
            choice.value ? h('img', { src: assetUrl(choice.value), alt: '', loading: 'lazy' }) : h('span', { className: 'empty-background', 'aria-hidden': true }, 'Aa'),
            h('span', { className: 'background-caption' }, choice.label, active ? h('span', { className: 'choice-check', 'aria-hidden': true }, '✓') : null));
        })),
        h('p', { className: 'appearance-hint', 'aria-live': 'polite' }, 'Selected: ' + (selected ? selected.label : 'Custom image')),
        h('details', { className: 'custom-background', open: !selected },
          h('summary', {}, 'Upload or choose a custom image'),
          h('p', { className: 'appearance-hint' }, 'Use the media library or an HTTPS image URL. A light image with empty space at the top keeps event details readable.'),
          h(ImageControl, Object.assign({}, this.props)))
      );
    }
  }), CMS.getWidget('image').preview);
})();
