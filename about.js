(function () {
  'use strict';

  function initAboutAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    var section = document.querySelector('.about-sec');
    var grid = document.querySelector('.about-grid');
    if (!section || !grid) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var stOnce = { once: true, toggleActions: 'play none none none' };

    if (reduceMotion) {
      gsap.from('.about-sec .ct .sh, .about-sec .ct .sd, .about-sec .acard', {
        opacity: 0,
        duration: 0.35,
        stagger: 0.05,
        ease: 'power1.out',
        immediateRender: false,
        scrollTrigger: Object.assign({ trigger: section, start: 'top 85%' }, stOnce)
      });
      return;
    }

    /* Intro: plays when section title area enters view */
    gsap.from('.about-sec .ct .sh', {
      opacity: 0,
      y: 48,
      duration: 0.72,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: Object.assign(
        {
          trigger: '.about-sec .ct',
          start: 'top 82%',
          invalidateOnRefresh: true
        },
        stOnce
      )
    });

    gsap.from('.about-sec .ct .sd', {
      opacity: 0,
      y: 28,
      duration: 0.58,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: Object.assign(
        {
          trigger: '.about-sec .ct',
          start: 'top 78%',
          invalidateOnRefresh: true
        },
        stOnce
      )
    });

    /* Each card: full mini-timeline when that card scrolls into view (gradual as user scrolls down) */
    document.querySelectorAll('.about-sec .acard').forEach(function (card) {
      var icon = card.querySelector('.ac-icon');
      var h3 = card.querySelector('h3');
      var p = card.querySelector('p');

      var tl = gsap.timeline({
        scrollTrigger: Object.assign(
          {
            trigger: card,
            start: 'top 88%',
            invalidateOnRefresh: true
          },
          stOnce
        ),
        defaults: { immediateRender: false }
      });

      tl.from(
        card,
        {
          opacity: 0,
          y: 76,
          x: function () {
            var i = Array.prototype.indexOf.call(grid.querySelectorAll('.acard'), card);
            return i === 0 ? -32 : i === 2 ? 32 : 0;
          },
          rotationZ: function () {
            var i = Array.prototype.indexOf.call(grid.querySelectorAll('.acard'), card);
            return i === 1 ? 0 : i === 0 ? -2 : 2;
          },
          scale: 0.92,
          duration: 0.82,
          ease: 'power3.out',
          immediateRender: false
        },
        0
      );

      if (icon) {
        tl.from(
          icon,
          {
            opacity: 0,
            scale: 0.5,
            y: 28,
            rotation: 6,
            duration: 0.62,
            ease: 'back.out(1.5)',
            immediateRender: false
          },
          '-=0.45'
        );
      }
      if (h3) {
        tl.from(
          h3,
          {
            opacity: 0,
            y: 18,
            duration: 0.48,
            ease: 'power2.out',
            immediateRender: false
          },
          '-=0.38'
        );
      }
      if (p) {
        tl.from(
          p,
          {
            opacity: 0,
            y: 12,
            duration: 0.4,
            ease: 'power2.out',
            immediateRender: false
          },
          '-=0.32'
        );
      }
    });

    window.addEventListener(
      'load',
      function () {
        try {
          window.ScrollTrigger.refresh();
        } catch (e) {}
      },
      { once: true }
    );

    document.querySelectorAll('.about-sec .acard').forEach(function (c) {
      c.addEventListener('mousemove', function (e) {
        var r = c.getBoundingClientRect();
        gsap.to(c, {
          y: -4,
          rotationY: ((e.clientX - r.left) / r.width - 0.5) * 10,
          rotationX: -((e.clientY - r.top) / r.height - 0.5) * 10,
          duration: 0.3,
          overwrite: 'auto'
        });
        var ic = c.querySelector('.ac-icon');
        if (ic)
          gsap.to(ic, {
            x: ((e.clientX - r.left) / r.width - 0.5) * 14,
            y: ((e.clientY - r.top) / r.height - 0.5) * 14,
            duration: 0.3,
            overwrite: 'auto'
          });
      });
      c.addEventListener('mouseleave', function () {
        gsap.to(c, {
          y: 0,
          rotationY: 0,
          rotationX: 0,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto'
        });
        var ic = c.querySelector('.ac-icon');
        if (ic) gsap.to(ic, { x: 0, y: 0, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAboutAnimations);
  } else {
    initAboutAnimations();
  }
})();
