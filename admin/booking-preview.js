(function() {
  var query = new URLSearchParams(location.search), category = query.get('category'), start = query.get('start');
  var target = document.getElementById('CHECKFRONT_WIDGET_01');
  if (!/^[1-9]\d*(?:,[1-9]\d*)*$/.test(category || '') || (start && !/^\d{8}$/.test(start))) { target.textContent = 'Enter a valid category ID and date to preview checkout.'; return; }
  var script = document.createElement('script');
  script.src = 'https://royalduck.checkfront.com/lib/interface--0.js';
  script.onload = function() {
    var config = { host: 'royalduck.checkfront.com', target: target.id, category_id: category, options: 'tabs', provider: 'droplet' };
    if (start) config.start_date = start;
    new DROPLET.Widget(config).render();
  };
  script.onerror = function() { target.textContent = 'Checkfront could not load. Please try again.'; };
  document.head.appendChild(script);
})();
