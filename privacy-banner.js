/**
 * Site-wide privacy consent (cookies & similar technologies).
 * localStorage key: rd_privacy_consent = 'accepted' | 'essential'
 */
(function () {
  var KEY = 'rd_privacy_consent';
  var TIX_LS = 'tixLocationConsent';

  function hideBanner(el) {
    if (!el) return;
    el.setAttribute('hidden', '');
    el.classList.remove('is-visible');
    document.body.classList.remove('privacy-banner-open');
  }

  function showBanner(el) {
    el.removeAttribute('hidden');
    el.classList.add('is-visible');
    document.body.classList.add('privacy-banner-open');
  }

  function init() {
    var el = document.getElementById('privacy-banner');
    if (!el) return;

    try {
      if (localStorage.getItem(KEY)) {
        hideBanner(el);
        return;
      }
    } catch (e) {
      /* private mode: still show banner but buttons may fail */
    }

    showBanner(el);

    var acc = document.getElementById('privacy-banner-accept');
    var ess = document.getElementById('privacy-banner-essential');

    if (acc) {
      acc.addEventListener('click', function () {
        try {
          localStorage.setItem(KEY, 'accepted');
        } catch (e) {}
        hideBanner(el);
      });
    }
    if (ess) {
      ess.addEventListener('click', function () {
        try {
          localStorage.setItem(KEY, 'essential');
          localStorage.removeItem(TIX_LS);
        } catch (e) {}
        hideBanner(el);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
