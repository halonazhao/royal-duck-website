(function () {
  'use strict';

  /* Hide placeholder image once Cloudflare Stream iframe has loaded */
  (function () {
    var frame = document.getElementById('heroFrameIframe');
    var poster = document.getElementById('heroFramePoster');
    if (!frame || !poster) return;
    function hidePoster() {
      poster.classList.add('is-hidden');
    }
    frame.addEventListener('load', hidePoster, { once: true });
  })();

  function splitA(sel, tl, t, gsap) {
    var el = document.querySelector(sel);
    if (!el || !gsap) return;
    var html = el.innerHTML;
    var out = '';
    var tag = false;
    var word = '';

    function flushWord() {
      if (!word) return;
      out += '<span class="h1-word">';
      for (var j = 0; j < word.length; j++) {
        out += '<span class="ch">' + word[j] + '</span>';
      }
      out += '</span>';
      word = '';
    }

    for (var i = 0; i < html.length; i++) {
      var c = html[i];
      if (tag) {
        out += c;
        if (c === '>') tag = false;
        continue;
      }
      if (c === '<') {
        flushWord();
        tag = true;
        out += c;
        continue;
      }
      if (c === ' ' || c === '\n') {
        flushWord();
        out += c;
        continue;
      }
      word += c;
    }
    flushWord();
    el.innerHTML = out;
    var chars = el.querySelectorAll('.ch');
    if (chars.length) {
      tl.fromTo(chars,
        { opacity: 0, y: gsap.utils.random(18, 45, 5, true), scale: .4, rotation: gsap.utils.random(-18, 18, 5, true) },
        { opacity: 1, y: 0, scale: 1, rotation: 0, duration: .45, stagger: .018, ease: 'back.out(2)' },
        t
      );
    }
  }

  function addHeroToTimeline(tl) {
    if (!window.gsap || !tl) return;
    var gsap = window.gsap;

    splitA('#hTitle', tl, 0.5, gsap);
    var hBtns = document.querySelector('#hBtns');
    if (hBtns) tl.fromTo('#hBtns .btn', { opacity: 0, y: 24, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(2)' }, '+=.04');
    tl.call(function () { if (window.confetti) window.confetti(); }, [], '-=.05');

  }

  window.addHeroToTimeline = addHeroToTimeline;
})();
