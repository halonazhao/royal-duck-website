(function(){
  'use strict';
  if (!window.gsap || !window.gsap.registerPlugin) return;
  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);

  /* EVENT DATA — loaded from events-data.js (window.EVENTS) */

  function getStatus(ev) {
    return window.getEventStatus ? window.getEventStatus(ev) : 'ended';
  }
  function parseEventInstant(iso, timeZone, isEnd) {
    if (isEnd && window.getEventEndDate) return window.getEventEndDate({ end: iso, timeZone: timeZone });
    if (!isEnd && window.getEventStartDate) return window.getEventStartDate({ start: iso, timeZone: timeZone });
    return new Date(iso);
  }
  function fmtDate(iso, timeZone, isEnd) {
    var d = parseEventInstant(iso, timeZone, !!isEnd);
    var locStr =
      window.I18n && window.I18n.getLang && window.I18n.getLang() === 'es'
        ? 'es-US'
        : 'en-US';
    return d.toLocaleDateString(locStr, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: timeZone || undefined
    });
  }

  function Tx(k, n) {
    if (window.I18n && window.I18n.t) {
      if (n !== undefined && n !== null) return window.I18n.t(k, n);
      return window.I18n.t(k);
    }
    return '';
  }
  function getCD(ev) {
    if (!window.getEventStartDate) return null;
    var target = window.getEventStartDate(ev);
    var d = target - new Date();
    if (d <= 0) return null;
    return {
      d: Math.floor(d / 864e5),
      h: Math.floor((d % 864e5) / 36e5),
      m: Math.floor((d % 36e5) / 6e4),
      s: Math.floor((d % 6e4) / 1e3)
    };
  }
  function getProg(ev) {
    if (!window.getEventStartDate || !window.getEventEndDate) return 0;
    var s = window.getEventStartDate(ev).getTime(),
      e = window.getEventEndDate(ev).getTime(),
      n = new Date().getTime();
    return Math.min(100, Math.max(0, (n - s) / (e - s) * 100));
  }

  var sorted = [].concat(window.EVENTS).sort(function(a,b){
    var o={live:0,upcoming:1,ended:2};
    var sa=o[getStatus(a)],sb=o[getStatus(b)];
    if(sa!==sb)return sa-sb;
    var dateDiff =
      (window.getEventStartDate ? window.getEventStartDate(a) : new Date(a.start)) -
      (window.getEventStartDate ? window.getEventStartDate(b) : new Date(b.start));
    if(dateDiff!==0) return dateDiff;
    return (a.city||'').localeCompare(b.city||'');
  });
  var cnts = { live: 0, upcoming: 0 };
  sorted.forEach(function(ev) {
    var s = getStatus(ev);
    if (s === 'live') cnts.live++;
    else if (s === 'upcoming') cnts.upcoming++;
  });

  function updateHeroBadge(){
    var el = document.getElementById('hBadgeTxt');
    if (!el) return;
    if (!window.I18n || !window.I18n.t) {
      el.textContent =
        cnts.live > 0
          ? cnts.live +
            ' Event' +
            (cnts.live > 1 ? 's' : '') +
            ' Live Right Now!'
          : cnts.upcoming > 0
            ? cnts.upcoming + ' Upcoming Events!'
            : 'New Events Coming Soon!';
      return;
    }
    if (cnts.live > 0) {
      el.textContent =
        cnts.live > 1
          ? window.I18n.t('events.cta_live_many', cnts.live)
          : window.I18n.t('events.cta_live_one', cnts.live);
    } else if (cnts.upcoming > 0) {
      el.textContent =
        cnts.upcoming > 1
          ? window.I18n.t('events.cta_up_many', cnts.upcoming)
          : window.I18n.t('events.cta_up_one', cnts.upcoming);
    } else {
      el.textContent = window.I18n.t('events.cta_fallback');
    }
  }

  var aFilt = 'live';
  /** Region/province filter; only applies when viewing live or upcoming (null = all). */
  var aRegion = null;

  function regionsForLiveAndUpcoming() {
    var seen = {};
    var list = [];
    sorted.forEach(function(ev) {
      var st = getStatus(ev);
      if (st !== 'live' && st !== 'upcoming') return;
      var r = (ev.region || '').trim();
      if (!r || seen[r]) return;
      seen[r] = true;
      list.push(r);
    });
    list.sort(function(a, b) { return a.localeCompare(b); });
    return list;
  }

  function getFilteredEvents() {
    return sorted.filter(function(ev) {
      if (getStatus(ev) !== aFilt) return false;
      if (aRegion === null) return true;
      return (ev.region || '').trim() === aRegion;
    });
  }

  function renderFilt(){
    var el = document.getElementById('evFlt');
    if (!el) return;
    el.innerHTML = '';
    [
      { k: 'live', l: Tx('events.status_live'), c: cnts.live },
      { k: 'upcoming', l: Tx('events.status_upcoming'), c: cnts.upcoming }
    ].forEach(function(f){
        var d = document.createElement('div');
        d.className = 'ev-f' + (aFilt===f.k ? ' on' : '');
        d.innerHTML = f.l + ' <span class="ev-f-c">' + f.c + '</span>';
        d.onclick = function(){ aFilt = f.k; aRegion = null; renderFilt(); renderRegionFilt(); renderEV(); };
        el.appendChild(d);
      });
  }

  function renderRegionFilt() {
    var el = document.getElementById('evFltRegions');
    if (!el) return;
    el.innerHTML = '';
    var regs = regionsForLiveAndUpcoming();
    if (!regs.length) {
      el.setAttribute('hidden', '');
      return;
    }
    el.removeAttribute('hidden');
    function addChip(label, regionVal) {
      var on = regionVal === null ? aRegion === null : aRegion === regionVal;
      var d = document.createElement('div');
      d.className = 'ev-f' + (on ? ' on' : '');
      d.textContent = label;
      d.onclick = function() {
        aRegion = regionVal;
        renderRegionFilt();
        renderEV();
      };
      el.appendChild(d);
    }
    addChip(Tx('events.region_all'), null);
    regs.forEach(function(r) {
      addChip(r, r);
    });
  }

  function escapeText(value) {
    return String(value || '').replace(/[&<>"']/g, function(c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; });
  }
  function textLines(value) { return escapeText(value).replace(/\r?\n/g, '<br>'); }
  function eventText(ev, field) {
    var lang = window.I18n && window.I18n.getLang ? window.I18n.getLang() : 'en';
    var value = ev[field] || {};
    return value[lang] || value.en || '';
  }
  function venueHoursNote(ev) {
    var note = eventText(ev, 'hoursNote');
    return note ? '<strong class="evc-hours-note">' + textLines(note) + '</strong><br>' : '';
  }
  function venueHoursLines(ev) { return textLines(eventText(ev, 'hours')); }

  function renderEV(){
    var g = document.getElementById('evGrid');
    if (!g) return;
    var flt = getFilteredEvents();
    if(!flt.length){
      g.innerHTML='<div class="ev-empty">'+(window.I18n&&window.I18n.t?window.I18n.t('events.empty'):'No events in this category. Follow us for updates!')+'</div>';
      return;
    }
    g.innerHTML = flt.map(function(ev,i){
      var st = getStatus(ev), cd = st === 'upcoming' ? getCD(ev) : null, prog = st === 'live' ? getProg(ev) : 0;
      var H = window.I18n && window.I18n.hrefWithLang ? window.I18n.hrefWithLang : function (h) { return h; };
      var tix = st !== 'ended' && ev.ticketUrl ? H(ev.ticketUrl) : '';
      var liveLb = window.I18n && window.I18n.t ? window.I18n.t('events.live_badge') : 'LIVE NOW';
      var upLb = window.I18n && window.I18n.t ? window.I18n.t('events.upcoming_badge') : 'UPCOMING';
      var endLb = window.I18n && window.I18n.t ? window.I18n.t('events.ended_badge') : 'ENDED';
      var localCap = window.I18n && window.I18n.t ? window.I18n.t('events.local_time_caption') : 'Local time at venue';
      var getT = window.I18n && window.I18n.t ? window.I18n.t('events.get_tickets') : 'Get Tickets';
      var signW = window.I18n && window.I18n.t ? window.I18n.t('events.sign_waiver') : 'Sign Waiver';
      var thx = window.I18n && window.I18n.t ? window.I18n.t('events.thanks_ended') : 'Thanks for bouncing with us!';
      var cdD = window.I18n && window.I18n.t ? window.I18n.t('events.cd_days') : 'Days';
      var cdH = window.I18n && window.I18n.t ? window.I18n.t('events.cd_hrs') : 'Hrs';
      var cdM = window.I18n && window.I18n.t ? window.I18n.t('events.cd_min') : 'Min';
      var cdS = window.I18n && window.I18n.t ? window.I18n.t('events.cd_sec') : 'Sec';
      var bgStyle = ev.cardBg ? ';background-image:url('+escapeText(ev.cardBg)+')' : '';
      var cardClass = 'evc' + (ev.cardBg ? ' evc--card-bg' : '') + (ev.theme && ev.theme !== 'default' ? ' evc--' + escapeText(ev.theme) : '');
      return '<div class="'+cardClass+'" data-i="'+i+'" style="opacity:0'+bgStyle+'">' +
        '<div class="evc-glow" style="background:'+ev.glow+'"></div>' +
        '<div class="evc-hd"><div class="evc-city"><div><div class="evc-nm">'+escapeText(ev.city)+'</div><div class="evc-rg">'+escapeText(ev.region)+'</div></div></div>' +
        (st==='live'?'<div class="evc-st st-live"><span class="st-dot"></span>'+liveLb+'</div>':st==='upcoming'?'<div class="evc-st st-up">'+upLb+'</div>':'<div class="evc-st st-end">'+endLb+'</div>') + '</div>' +
        '<div class="evc-dl">' +
          '<div class="evc-d"><span class="evc-di"></span><div><span class="evc-v">'+escapeText(ev.venue)+'</span><br><span class="evc-lb">'+textLines(ev.address)+'</span></div></div>' +
          '<div class="evc-d"><span class="evc-di"></span><div><span class="evc-v">'+fmtDate(ev.start, ev.timeZone, false)+' — '+fmtDate(ev.end, ev.timeZone, true)+'</span></div></div>' +
          '<div class="evc-d"><span class="evc-di"></span><div><span class="evc-v">'+venueHoursNote(ev)+venueHoursLines(ev)+'</span><br><span class="evc-lb">'+localCap+'</span></div></div>' +
          (eventText(ev, 'announcement') ? '<div class="evc-d"><span class="evc-di"></span><div><span class="evc-v">'+textLines(eventText(ev, 'announcement'))+'</span></div></div>' : '') +
        '</div>' +
        (cd ? '<div class="evc-cd"><div class="cd-u"><div class="cd-n">'+cd.d+'</div><div class="cd-l">'+cdD+'</div></div><div class="cd-u"><div class="cd-n">'+cd.h+'</div><div class="cd-l">'+cdH+'</div></div><div class="cd-u"><div class="cd-n">'+cd.m+'</div><div class="cd-l">'+cdM+'</div></div><div class="cd-u"><div class="cd-n">'+cd.s+'</div><div class="cd-l">'+cdS+'</div></div></div>' : '') +
        '<div class="evc-ft">' +
          (st!=='ended'&&ev.ticketUrl ? '<a href="'+escapeText(tix)+'" class="btn bt bs ev-get-tickets-btn" data-ev-key="'+escapeText(ev.eventKey)+'" data-ev-city="'+escapeText(ev.city)+'" data-ev-region="'+escapeText(ev.region)+'" data-ev-venue="'+escapeText(ev.venue)+'">'+getT+'</a>' : '') +
          (st==='live'&&ev.waiverUrl ? '<a href="'+escapeText(ev.waiverUrl)+'" class="btn bc bs ev-waiver-btn" data-rd-lang-skip="1">'+signW+'</a>' : '') +
          (st==='ended' ? '<span style="color:var(--soft);font-size:.82rem;font-weight:600;padding:8px 0">'+thx+'</span>' : '') +
        '</div></div>';
    }).join('');
    gsap.fromTo('#evGrid .evc',{opacity:0,y:30,scale:.96},{opacity:1,y:0,scale:1,duration:.55,stagger:.09,ease:'back.out(1.2)'});
    document.querySelectorAll('.evc').forEach(function(c){
      c.addEventListener('mousemove',function(e){ var r=c.getBoundingClientRect();
        gsap.to(c,{rotationY:((e.clientX-r.left)/r.width-.5)*7,rotationX:-((e.clientY-r.top)/r.height-.5)*7,duration:.3}); });
      c.addEventListener('mouseleave',function(){ gsap.to(c,{rotationY:0,rotationX:0,duration:.5,ease:'elastic.out(1,.5)'}); });
    });
  }

  function init(){
    updateHeroBadge();
    renderFilt();
    renderRegionFilt();
    renderEV();
    /* Duck shows when events section is well in view (negative bottom rootMargin = show later, further down from hero) */
    var evSec = document.getElementById('events');
    if (evSec && typeof IntersectionObserver !== 'undefined') {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ document.body.classList.toggle('ev-sec-inview', e.isIntersecting); });
      }, { threshold: 0, rootMargin: '0px 0px -25% 0px' });
      io.observe(evSec);
    } else {
      document.body.classList.add('ev-sec-inview');
    }
    /* Fat pink duck: subtle slow scale pulse */
    gsap.to('.ev-duck', {
      scale: 1.008,
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      transformOrigin: '100% 100%'
    });
    /* "Where We're Bouncing" title: word-by-word entrance + subtle bounce */
    gsap.set('.ev-sec .ev-sh-w', { opacity: 0, y: 35, rotationX: -20, transformOrigin: '50% 100%' });
    gsap.to('.ev-sec .ev-sh-w', {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'back.out(1.15)',
      scrollTrigger: { trigger: '.ev-sec .sh', start: 'top 85%' }
    });
    gsap.fromTo('.ev-sec .ev-sh-w-accent', { scale: 0.92 }, {
      scale: 1,
      duration: 0.5,
      delay: 0.45,
      ease: 'back.out(1.3)',
      scrollTrigger: { trigger: '.ev-sec .sh', start: 'top 85%', once: true }
    });
    /* Bounce "Bouncing!" upward only (2–3 times), never below baseline; starts when user scrolls there */
    gsap.set('.ev-sec .ev-sh-w-accent', { y: 0 });
    var bounceTl = gsap.timeline({
      delay: 2,
      scrollTrigger: { trigger: '.ev-sec .sh', start: 'top 85%', once: true }
    });
    for (var b = 0; b < 3; b++) {
      bounceTl.to('.ev-sec .ev-sh-w-accent', { y: -3, duration: 0.22, ease: 'power2.out' }, b * 0.5);
      bounceTl.to('.ev-sec .ev-sh-w-accent', { y: 0, duration: 0.28, ease: 'power2.in' }, b * 0.5 + 0.22);
    }
    gsap.fromTo('.ev-sec .tag,.ev-sec .sd',{opacity:0,y:35},{opacity:1,y:0,duration:.55,stagger:.08,ease:'power3.out',scrollTrigger:{trigger:'.ev-sec',start:'top 72%'}});
    gsap.fromTo('.ev-flt-wrap',{opacity:0,y:25},{opacity:1,y:0,duration:.45,ease:'power3.out',scrollTrigger:{trigger:'.ev-flt-wrap',start:'top 85%'}});
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  document.addEventListener('rd-locale-change', function () {
    updateHeroBadge();
    renderFilt();
    renderRegionFilt();
    renderEV();
  });

  setInterval(function(){
    document.querySelectorAll('.evc').forEach(function(card){
      var i = parseInt(card.getAttribute('data-i'),10);
      var flt = getFilteredEvents();
      if(!flt[i]) return;
      var ev = flt[i];
      if(getStatus(ev)!=='upcoming') return;
      var diff = (window.getEventStartDate ? window.getEventStartDate(ev) : new Date(ev.start)) - new Date();
      if(diff<=0) return;
      var d=Math.floor(diff/864e5), h=Math.floor(diff%864e5/36e5), m=Math.floor(diff%36e5/6e4), s=Math.floor(diff%6e4/1e3);
      var nums = card.querySelectorAll('.cd-n');
      if(nums.length===4) [d,h,m,s].forEach(function(v,j){ if(nums[j].textContent!=v){ nums[j].textContent=v;
        gsap.fromTo(nums[j],{scale:1.3},{scale:1,duration:.3,ease:'back.out(2)'}); } });
    });
  }, 1000);
})();
