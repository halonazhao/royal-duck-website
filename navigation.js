(function () {
  'use strict';

  var MQ_MOBILE_NAV = '(max-width: 900px)';
  /** Logo-only standalone pages use a wider “mobile” band so tablets still get ☰ (see navigation.css). */
  var MQ_LOGO_ONLY_MOBILE = '(max-width: 1024px)';

  /**
   * Map a nav link/toggle to a distinct Meta Pixel event name + readable label.
   * Keyed off the href (hash or filename) so it's stable across pages and i18n,
   * since visible labels can be translated.
   */
  var NAV_TAB_MAP = {
    home: { event: 'NavHomeClick', label: 'Home' },
    events: { event: 'NavEventsClick', label: 'Events' },
    about: { event: 'NavAboutClick', label: 'About' },
    faq: { event: 'NavFaqClick', label: 'FAQ' },
    contact: { event: 'NavContactClick', label: 'Contact' },
    mail: { event: 'NavJoinRoyalListClick', label: 'Join Royal List' },
    'volunteer-home': { event: 'NavVolunteerClick', label: 'Volunteer' },
    affiliate: { event: 'NavAffiliateClick', label: 'Affiliate Program' },
    'vendor-register': { event: 'NavVendorsClick', label: 'Vendors' }
  };

  function navTabInfo(el) {
    if (el.classList.contains('n-dropdown-toggle')) {
      return { event: 'NavMoreClick', label: 'More' };
    }
    var href = el.getAttribute('href') || '';
    var key;
    var hashIdx = href.indexOf('#');
    if (hashIdx >= 0) {
      key = href.slice(hashIdx + 1);
    } else {
      key = href.split('/').pop().split('?')[0].replace(/\.html$/, '');
    }
    if (NAV_TAB_MAP[key]) return NAV_TAB_MAP[key];
    var label = (el.textContent || key || 'Tab').trim().replace(/\s+/g, ' ');
    var slug = (key || 'tab').replace(/[^a-zA-Z0-9]+/g, '');
    return {
      event: 'Nav' + (slug.charAt(0).toUpperCase() + slug.slice(1)) + 'Click',
      label: label
    };
  }

  /**
   * Meta Pixel: fire custom click events for CTAs and each navigation tab.
   *  - .n-cta              → "BuyTicketsClick"  (nav "Buy Tickets", all pages)
   *  - .hero-btn--red      → "BookNowClick"     (hero "Book Now", home page)
   *  - .hero-btn--yellow / .ev-waiver-btn → "SignWaiverClick" (hero + event cards)
   *  - .ev-get-tickets-btn → "GetTicketsClick"  (event cards; tagged per location)
   *  - each nav tab        → "Nav<Tab>Click"    (Home, Events, About, FAQ, Contact,
   *                          Join Royal List, Volunteer, Affiliate, Vendors, More)
   * Delegated on document so it works on every page and survives nav/grid re-renders.
   * No-ops safely if the pixel isn't loaded.
   */
  function initPixelClickTracking() {
    document.addEventListener(
      'click',
      function (e) {
        if (!e.target.closest) return;
        if (typeof window.fbq !== 'function') return;

        var cta = e.target.closest(
          'a.n-cta, a.hero-btn--red, a.hero-btn--yellow, a.ev-waiver-btn, a.ev-get-tickets-btn'
        );
        if (cta) {
          var params = {
            source_page: location.pathname,
            destination: cta.getAttribute('href') || ''
          };
          var eventName;

          if (cta.classList.contains('hero-btn--red')) {
            eventName = 'BookNowClick';
          } else if (
            cta.classList.contains('hero-btn--yellow') ||
            cta.classList.contains('ev-waiver-btn')
          ) {
            eventName = 'SignWaiverClick';
          } else if (cta.classList.contains('ev-get-tickets-btn')) {
            eventName = 'GetTicketsClick';
            var city = cta.getAttribute('data-ev-city') || '';
            var region = cta.getAttribute('data-ev-region') || '';
            params.event_key = cta.getAttribute('data-ev-key') || '';
            params.event_city = city;
            params.event_region = region;
            params.event_venue = cta.getAttribute('data-ev-venue') || '';
            params.location = region ? city + ', ' + region : city;
          } else {
            eventName = 'BuyTicketsClick';
          }

          window.fbq('trackCustom', eventName, params);
          return;
        }

        /* Navigation tabs — each fires its own event. The "Buy Tickets" CTA is
           handled above; the brand logo (.n-logo) is intentionally excluded. */
        var navItem = e.target.closest(
          '#mainNav .n-links a, #mainNav .n-dropdown-toggle'
        );
        if (navItem && !navItem.classList.contains('n-cta')) {
          var info = navTabInfo(navItem);
          window.fbq('trackCustom', info.event, {
            source_page: location.pathname,
            nav_item: info.label,
            destination: navItem.getAttribute('href') || ''
          });
        }
      },
      true
    );
  }

  function initNav() {
    var nav = document.getElementById('mainNav');
    var mobBtn = document.getElementById('navMobBtn');
    var nL = document.getElementById('nL');
    var mqMobileNav = window.matchMedia(MQ_MOBILE_NAV);
    var mqLogoOnlyMobile = window.matchMedia(MQ_LOGO_ONLY_MOBILE);

    function isMobileNavLayout() {
      if (document.body.classList.contains('nav-logo-only')) {
        return mqLogoOnlyMobile.matches;
      }
      return mqMobileNav.matches;
    }

    function syncMobileFullscreenMenu() {
      if (!nL) return;
      var mobile = isMobileNavLayout();
      var menuOpen = mobile && nL.classList.contains('open');
      if (menuOpen) {
        document.body.classList.add('nav-mobile-menu-open');
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      } else {
        document.body.classList.remove('nav-mobile-menu-open');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
      if (mobBtn) {
        if (menuOpen) {
          mobBtn.textContent = '\u2715';
          mobBtn.setAttribute(
            'aria-label',
            window.I18n && window.I18n.t ? window.I18n.t('nav.toggle_close') : 'Close menu'
          );
          mobBtn.setAttribute('aria-expanded', 'true');
        } else {
          mobBtn.textContent = '\u2630';
          mobBtn.setAttribute(
            'aria-label',
            window.I18n && window.I18n.t ? window.I18n.t('nav.toggle_open') : 'Open menu'
          );
          mobBtn.setAttribute('aria-expanded', 'false');
        }
      }
    }

    if (mobBtn && nL) {
      mobBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        nL.classList.toggle('open');
        syncMobileFullscreenMenu();
      });
      document.addEventListener('click', function (e) {
        if (!nL.classList.contains('open')) return;
        if (mobBtn.contains(e.target)) return;
        if (nL.contains(e.target)) {
          if (e.target.closest && e.target.closest('a')) {
            nL.classList.remove('open');
            syncMobileFullscreenMenu();
          }
          return;
        }
        nL.classList.remove('open');
        syncMobileFullscreenMenu();
      });
      mobBtn.setAttribute('aria-controls', 'nL');
      syncMobileFullscreenMenu();
    }

    function onMobileLayoutMediaChange() {
      if (!isMobileNavLayout() && nL && nL.classList.contains('open')) {
        nL.classList.remove('open');
      }
      syncMobileFullscreenMenu();
    }
    mqMobileNav.addEventListener('change', onMobileLayoutMediaChange);
    mqLogoOnlyMobile.addEventListener('change', onMobileLayoutMediaChange);
    /* Hide bar while scrolling down; show when scrolling up.
       With logo: scroll-up shows logo only (compact) for quick jump to hero; full menu at page top. */
    if (nav) {
      var lastY = window.scrollY || document.documentElement.scrollTop || 0;
      var ticking = false;
      var DELTA = 10;
      var TOP_ALWAYS_SHOW = 56;

      function hasLogoBar() {
        return !document.body.classList.contains('nav-no-logo');
      }

      function updateNavScroll() {
        var y = window.scrollY || document.documentElement.scrollTop || 0;
        var dy = y - lastY;
        lastY = y;

        if (nL && nL.classList.contains('open')) {
          nav.classList.remove('nav-scroll-hide');
          nav.classList.remove('nav-scroll-compact');
          return;
        }
        if (y <= TOP_ALWAYS_SHOW) {
          nav.classList.remove('nav-scroll-hide');
          nav.classList.remove('nav-scroll-compact');
          return;
        }
        if (dy > DELTA) {
          nav.classList.add('nav-scroll-hide');
          nav.classList.remove('nav-scroll-compact');
        } else if (dy < -DELTA) {
          nav.classList.remove('nav-scroll-hide');
          if (hasLogoBar()) {
            /* Wordmark-only pages: never use compact — it hides ☰ + breaks the mobile grid */
            if (document.body.classList.contains('nav-logo-only')) {
              nav.classList.remove('nav-scroll-compact');
            } else {
              nav.classList.add('nav-scroll-compact');
            }
          } else {
            nav.classList.remove('nav-scroll-compact');
          }
        }
      }

      window.addEventListener(
        'scroll',
        function () {
          if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(function () {
              updateNavScroll();
              ticking = false;
            });
          }
        },
        { passive: true }
      );
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }

  initPixelClickTracking();
})();
