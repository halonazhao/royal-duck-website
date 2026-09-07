(function () {
  'use strict';

  var VOLUNTEER_FAQ_FALLBACK = [
    {
      q: 'How do I sign up to volunteer?',
      a: '<p>Head to our <a href="volunteer.html" style="color:var(--teal);font-weight:800">volunteer page</a> and submit the interest form with your name, contact info, city, and shift preference. Our team will reach out when we’re planning a stop near you.</p>'
    },
    {
      q: 'You must be 18 or older',
      a: '<p>Yes.</p>'
    },
    {
      q: 'What are the requirements to volunteer?',
      a: '<ul><li>Each volunteer needs to sign up individually, and you can only claim one spot per shift.</li><li>A signed waiver is required for everyone.</li><li>When you check in for your shift, you’ll leave your photo ID with the on-site volunteer coordinator.</li><li>Your passes must be used during the same weekend you volunteer.</li><li><em>Please note: event session times are subject to change.</em></li></ul>'
    },
    {
      q: 'What kinds of volunteer shifts are there?',
      a: '<p>We typically need help during <strong>morning</strong> load-in, <strong>noon</strong> and <strong>afternoon</strong> peak guest hours, and <strong>evening</strong> wrap-up. You can note your preference on the form; final assignments depend on each tour stop’s needs.</p>'
    },
    {
      q: 'What should I wear and bring?',
      a: '<p>Come dressed for fun and comfort! While we don’t have a strict shoe requirement, we do recommend closed-toe shoes. We do require socks, since you’ll be stepping into the inflatables. Wear clothes you’re comfortable in and don’t mind getting a little dirty. Since this is a family-friendly event, we ask that outfits stay cool and appropriate (so save the short shorts and spaghetti straps for another day). And don’t forget sunscreen! Bring some along and reapply during your shift—you’ll thank yourself later.</p>'
    },
    {
      q: 'Is training provided?',
      a: '<p>Yes. You’ll get a short orientation before your shift covering safety basics, guest flow, and where to check in. Lead volunteers and staff are available throughout the event.</p>'
    },
    {
      q: 'When and how do I get my passes?',
      a: '<p>You’ll receive your passes after your volunteer shift ends, when you show up for the event session you want to use them for. Here’s how it works depending on when you volunteer:</p><ul><li><strong>Saturday morning shift</strong> → Use your passes Saturday afternoon or any time Sunday.</li><li><strong>Saturday afternoon shift</strong> → Use your passes anytime Sunday.</li><li><strong>Sunday morning shift</strong> → Grab your passes after your shift ends.</li><li><strong>Sunday 12:00 PM – 4:00 PM shift</strong> → Plan to enjoy the bounce session before your shift starts. Arrive 30–45 minutes early to meet the on-site coordinator, and bring your driver’s license or photo ID—you’ll hand it over in exchange for your passes. Once your shift is done, you’ll get your ID back.</li></ul><p><em>A quick heads-up: event session times are subject to change.</em></p>'
    },
    {
      q: 'What if I need to cancel my shift?',
      a: '<p>Life happens! Please reply to your volunteer confirmation email or message us as early as you can so we can adjust staffing. Last-minute no-shows make it harder to keep the park safe and fun for families.</p>'
    }
  ];

  function volunteerFaqRows() {
    var pack = window.RD_LOCALE_DATA && window.RD_LOCALE_DATA.volunteerFaqItems;
    if (window.I18n && typeof window.I18n.getVolunteerFAQItems === 'function') {
      var rows = window.I18n.getVolunteerFAQItems();
      if (rows && rows.length) return rows;
    }
    var lng = window.I18n && window.I18n.getLang ? window.I18n.getLang() : 'en';
    if (lng === 'es' && pack && pack.es && pack.es.length) return pack.es;
    if (lng !== 'es' && pack && pack.en && pack.en.length) return pack.en;
    return VOLUNTEER_FAQ_FALLBACK;
  }

  function render() {
    var faqEl = document.getElementById('volunteerFaqList');
    if (!faqEl) return;
    faqEl.innerHTML = '';
    volunteerFaqRows().forEach(function (f) {
      var item = document.createElement('div');
      item.className = 'faq-item';
      item.innerHTML =
        '<div class="faq-q"><h4>' +
        f.q +
        '</h4><span class="faq-arrow">▼</span></div><div class="faq-a">' +
        f.a +
        '</div>';
      item.querySelector('.faq-q').onclick = function () {
        var open = item.classList.contains('open');
        /* Same behavior as faq.js: only one FAQ accordion item open site-wide */
        document.querySelectorAll('.faq-item.open').forEach(function (x) {
          x.classList.remove('open');
          var ax = x.querySelector('.faq-a');
          if (ax) ax.style.maxHeight = '0';
        });
        if (!open) {
          item.classList.add('open');
          var a = item.querySelector('.faq-a');
          if (a) a.style.maxHeight = a.scrollHeight + 'px';
        }
      };
      faqEl.appendChild(item);
    });
  }

  function initAnimations() {
    if (!window.gsap || !window.ScrollTrigger || !window.gsap.registerPlugin) return;
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    gsap.fromTo(
      '.volunteer-faq-sec .sh,.volunteer-faq-sec .volunteer-faq-intro .sd',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.volunteer-faq-sec', start: 'top 72%' }
      }
    );
    gsap.fromTo(
      '.volunteer-faq-sec .faq-item',
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#volunteerFaqList', start: 'top 80%' }
      }
    );
  }

  function init() {
    if (!document.getElementById('volunteerFaqList')) return;
    render();
    initAnimations();
  }

  document.addEventListener('rd-locale-change', render);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
