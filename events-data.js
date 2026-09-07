/* Shared event data for home (events.js) and tickets page. No GSAP dependency. */
(function() {
  'use strict';

  /**
   * Parse "YYYY-MM-DDTHH:mm" as wall-clock time in IANA timeZone and return the correct UTC Date.
   * (start/end in data are local to the venue, not the visitor's browser.)
   */
  function parseISOInTimeZone(iso, timeZone) {
    if (!timeZone) timeZone = 'UTC';
    var m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/);
    if (!m) return new Date(iso);
    var y = +m[1], mo = +m[2], day = +m[3], h = +m[4], mi = +m[5], sec = m[6] != null ? +m[6] : 0;
    var target = { y: y, mo: mo, d: day, h: h, mi: mi, s: sec };

    function zonedParts(utcMs) {
      try {
        var parts = new Intl.DateTimeFormat('en-CA', {
          timeZone: timeZone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).formatToParts(new Date(utcMs));
        var o = {};
        for (var i = 0; i < parts.length; i++) {
          if (parts[i].type !== 'literal') o[parts[i].type] = parts[i].value;
        }
        return {
          y: +o.year,
          mo: +o.month,
          d: +o.day,
          h: +o.hour,
          mi: +o.minute,
          s: +o.second
        };
      } catch (e) {
        return null;
      }
    }

    function cmp(p, t) {
      if (!p) return 0;
      if (p.y !== t.y) return p.y - t.y;
      if (p.mo !== t.mo) return p.mo - t.mo;
      if (p.d !== t.d) return p.d - t.d;
      if (p.h !== t.h) return p.h - t.h;
      if (p.mi !== t.mi) return p.mi - t.mi;
      return p.s - t.s;
    }

    var lo = Date.UTC(y, mo - 1, day, h, mi, sec) - 48 * 3600 * 1000;
    var hi = Date.UTC(y, mo - 1, day, h, mi, sec) + 48 * 3600 * 1000;
    var iter;
    for (iter = 0; iter < 56; iter++) {
      var mid = Math.floor((lo + hi) / 2);
      var p = zonedParts(mid);
      var c = cmp(p, target);
      if (c === 0) return new Date(mid);
      if (c < 0) lo = mid + 1;
      else hi = mid - 1;
    }
    return new Date(Date.UTC(y, mo - 1, day, h, mi, sec));
  }

  window.getEventStartDate = function (ev) {
    return parseISOInTimeZone(ev.start, ev.timeZone);
  };
  window.getEventEndDate = function (ev) {
    return parseISOInTimeZone(ev.end, ev.timeZone);
  };

  // The build appends validated content/events/*.json to this shared runtime.
  window.EVENTS = [];

  window.getEventStatus = function(ev) {
    var s = window.getEventStartDate(ev);
    var e = window.getEventEndDate(ev);
    var now = new Date();
    if (now >= s && now <= e) return 'live';
    if (now < s) return 'upcoming';
    return 'ended';
  };
})();
