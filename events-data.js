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

  window.EVENTS = [
    { eventKey: 'sanjose', city: "San Jose", region: "California", emoji: "☀️", venue: "Discovery Meadow Park",
      timeZone: "America/Los_Angeles",
      lat: 37.3301, lng: -121.8926,
      address: "180 Woz Way, San Jose, CA", start: "2026-02-04T09:00", end: "2026-02-08T18:00",
      ticketUrl: "tickets.html?event=sanjose", waiverUrl: "https://royalduck.checkfront.com/reserve/document/?template_id=9&return_url=%2Freserve%2Fdocuments%2Fdirectory%2F&kiosk=1",
      glow: "var(--gold)", note: "" },
    { eventKey: 'miami', city: "Miami", region: "Florida", emoji: "🌴", venue: "Bayfront Park",
      timeZone: "America/New_York",
      lat: 25.7753, lng: -80.1865,
      address: "301 Biscayne Blvd, Miami, FL", start: "2026-02-05T10:00", end: "2026-02-09T20:00",
      ticketUrl: "tickets.html?event=miami", waiverUrl: "https://royalduck.checkfront.com/reserve/document/?template_id=9&return_url=%2Freserve%2Fdocuments%2Fdirectory%2F&kiosk=1",
      glow: "var(--coral)", note: "" },
    { eventKey: 'toronto', city: "Toronto", region: "Ontario", emoji: "🍁", venue: "Harbourfront Centre",
      timeZone: "America/Toronto",
      lat: 43.6419, lng: -79.3794,
      address: "235 Queens Quay W, Toronto, ON", start: "2026-02-14T10:00", end: "2026-02-16T17:00",
      ticketUrl: "tickets.html?event=toronto", waiverUrl: "", glow: "var(--teal)",
      note: "Valentine's Day Weekend Special 💕", cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/72a4f8e0-21fc-4e7a-5664-812828de4000/public" },
    { eventKey: 'ottawa', city: "Ottawa", region: "Ontario", emoji: "🏛️", venue: "Lansdowne Park",
      timeZone: "America/Toronto",
      lat: 45.3972, lng: -75.6836,
      address: "1015 Bank St, Ottawa, ON", start: "2026-02-21T09:00", end: "2026-02-23T18:00",
      ticketUrl: "tickets.html?event=ottawa", waiverUrl: "", glow: "var(--lavender)", note: "", cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/476db8f0-b647-4c7b-1853-b90e3226b400/public" },
    { eventKey: 'hamilton', city: "Hamilton", region: "Ontario", emoji: "⛰️", venue: "Gage Park",
      timeZone: "America/Toronto",
      lat: 43.2463, lng: -79.8542,
      address: "1000 Main St E, Hamilton, ON", start: "2026-01-24T10:00", end: "2026-01-26T17:00",
      ticketUrl: "tickets.html?event=hamilton", waiverUrl: "", glow: "var(--aqua)", note: "" },
    { eventKey: 'niagarafalls', city: "Niagara Falls", region: "Ontario", emoji: "🌊", venue: "Rapidsview Park",
      timeZone: "America/Toronto",
      lat: 43.0962, lng: -79.0377,
      address: "8051 Rapidsview Dr, Niagara Falls, ON", start: "2026-03-07T10:00", end: "2026-03-09T17:00",
      ticketUrl: "tickets.html?event=niagarafalls", waiverUrl: "", glow: "var(--cyan)",
      note: "Spring Break Kickoff 🌸", cardBg: "assets/blue_card.png" },
    { eventKey: 'deerbrook', city: "Humble / Houston", region: "Texas", emoji: "🛒", venue: "Deerbrook Mall",
      timeZone: "America/Chicago",
      lat: 30.0051, lng: -95.2615,
      address: "20131 Highway 59 North, Humble, TX 77338", start: "2026-04-02T10:00", end: "2026-05-10T18:00",
      ticketUrl: "tickets.html?event=deerbrook", waiverUrl: "", glow: "var(--lavender)", note: "", cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/476db8f0-b647-4c7b-1853-b90e3226b400/public" },
    { eventKey: 'coralsquare', city: "Coral Springs", region: "Florida", emoji: "🛒", venue: "Coral Square Mall",
      timeZone: "America/New_York",
      lat: 26.2415, lng: -80.2500,
      address: "9469 W Atlantic Blvd, Coral Springs, FL 33071", start: "2026-03-14T10:00", end: "2026-03-22T18:00",
      ticketUrl: "tickets.html?event=coralsquare", waiverUrl: "", glow: "var(--teal)", note: "", cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/72a4f8e0-21fc-4e7a-5664-812828de4000/public" },
    { eventKey: 'westshore', city: "Tampa", region: "Florida", emoji: "🛒", venue: "WestShore Plaza",
      timeZone: "America/New_York",
      lat: 27.9528, lng: -82.5259,
      address: "250 Westshore Plaza, Tampa, FL 33609, United States", start: "2026-03-27T10:00", end: "2026-04-19T18:00",
      ticketUrl: "tickets.html?event=westshore", waiverUrl: "", glow: "var(--teal)", note: "", cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/72a4f8e0-21fc-4e7a-5664-812828de4000/public" },
    { eventKey: 'arlington', city: "Arlington / Dallas / Fort Worth", region: "Texas", emoji: "🌊", venue: "Hurricane Harbor Arlington",
      timeZone: "America/Chicago",
      lat: 32.7611, lng: -97.0825,
      address: "1800 E Lamar Blvd, Arlington, TX 76006", start: "2026-04-10T10:00", end: "2026-05-03T18:00",
      ticketUrl: "tickets.html?event=arlington", waiverUrl: "", glow: "#c5f84f", note: "", cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/cdf78097-a210-42be-9436-d33fee80a400/public" },
    { eventKey: 'sanantonio', city: "San Antonio", region: "Texas", emoji: "☀️", venue: "Northwest Loop 410",
      timeZone: "America/Chicago",
      lat: 29.4796, lng: -98.5814,
      address: "6813 Northwest Loop 410, San Antonio, TX 78238", start: "2026-03-27T10:00", end: "2026-05-25T18:00",
      ticketUrl: "tickets.html?event=sanantonio", waiverUrl: "", glow: "var(--gold)", note: "", cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/2c9edb26-f682-4fad-4a97-743454e22e00/public" },
    { eventKey: 'greensboro', city: "Greensboro", region: "North Carolina", emoji: "🏟️", venue: "Greensboro Complex",
      timeZone: "America/New_York",
      lat: 36.0726, lng: -79.8286,
      address: "1921 W Gate City Blvd, Greensboro, NC 27403", start: "2026-05-13T15:00", end: "2026-05-31T20:00",
      ticketUrl: "tickets.html?event=greensboro", waiverUrl: "", glow: "var(--teal)", note: "",
      cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/72a4f8e0-21fc-4e7a-5664-812828de4000/public" },
    { eventKey: 'oaklandmall', city: "Troy", region: "Michigan", emoji: "🛒", venue: "Oakland Mall",
      timeZone: "America/Detroit",
      lat: 42.5238, lng: -83.1567,
      address: "412 W 14 Mile Rd, Troy, MI 48083", start: "2026-07-13T10:00", end: "2026-08-30T18:00",
      ticketUrl: "tickets.html?event=oaklandmall", waiverUrl: "", glow: "var(--lavender)", note: "",
      cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/476db8f0-b647-4c7b-1853-b90e3226b400/public" },
    { eventKey: 'woodfield', city: "Schaumburg", region: "Illinois", emoji: "🛒", venue: "Woodfield Mall",
      timeZone: "America/Chicago",
      lat: 42.0464, lng: -88.0377,
      address: "5 Woodfield Mall, Schaumburg, IL 60173<br>Woodfield Rd & N McConnor Parkway", start: "2026-06-06T10:00", end: "2026-07-05T18:00",
      ticketUrl: "tickets.html?event=woodfield", waiverUrl: "", glow: "#c5f84f", note: "",
      cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/cdf78097-a210-42be-9436-d33fee80a400/public" },
    { eventKey: 'franklinpark', city: "Toledo", region: "Ohio", emoji: "🛒", venue: "Franklin Park Mall",
      timeZone: "America/New_York",
      lat: 41.6844, lng: -83.6604,
      address: "5001 Monroe St, Toledo, OH 43623", start: "2026-05-10T15:00", end: "2026-06-07T20:00",
      ticketUrl: "tickets.html?event=franklinpark", waiverUrl: "", glow: "#c5f84f", note: "",
      cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/cdf78097-a210-42be-9436-d33fee80a400/public" },
    { eventKey: 'foxriver', city: "Appleton", region: "Wisconsin", emoji: "🛒", venue: "Fox River Mall",
      timeZone: "America/Chicago",
      lat: 44.2614, lng: -88.4895,
      address: "4301 W Wisconsin Ave, Appleton, WI 54913", start: "2026-07-11T10:00", end: "2026-08-02T18:00",
      ticketUrl: "tickets.html?event=foxriver", waiverUrl: "", glow: "var(--cyan)", note: "",
      cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/72a4f8e0-21fc-4e7a-5664-812828de4000/public" },
    { eventKey: 'forestplaza', city: "Rockford", region: "Illinois", emoji: "🛒", venue: "Forest Plaza",
      timeZone: "America/Chicago",
      lat: 42.2680, lng: -88.9760,
      address: "6282 E State St, Rockford, IL 61108", start: "2026-07-24T10:00", end: "2026-08-23T20:00",
      ticketUrl: "tickets.html?event=forestplaza", waiverUrl: "", glow: "var(--lavender)", note: "",
      cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/cdf78097-a210-42be-9436-d33fee80a400/public" },
    { eventKey: 'crossroads', city: "St. Cloud", region: "Minnesota", emoji: "🛒", venue: "Crossroads Center",
      timeZone: "America/Chicago",
      lat: 45.5540, lng: -94.2247,
      address: "4101 W Division St, St. Cloud, MN 56301", start: "2026-06-26T10:00", end: "2026-07-19T18:00",
      ticketUrl: "tickets.html?event=crossroads", waiverUrl: "", glow: "var(--teal)", note: "",
      cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/72a4f8e0-21fc-4e7a-5664-812828de4000/public" },
    { eventKey: 'vancouvermall', city: "Vancouver", region: "Washington", emoji: "🛒", venue: "Vancouver Mall",
      timeZone: "America/Los_Angeles",
      lat: 45.6726, lng: -122.5742,
      address: "8700 NE Vancouver Mall Dr, Vancouver, WA 98662", start: "2026-07-04T10:00", end: "2026-07-26T18:00",
      ticketUrl: "tickets.html?event=vancouvermall", waiverUrl: "", glow: "var(--gold)", note: "",
      cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/2c9edb26-f682-4fad-4a97-743454e22e00/public" },
    { eventKey: 'southcenter', city: "Seattle", region: "Washington", emoji: "🛒", venue: "Westfield Southcenter",
      timeZone: "America/Los_Angeles",
      lat: 47.4585, lng: -122.2578,
      address: "2800 Southcenter Mall, Tukwila, WA 98188 (near The Cheesecake Factory)", start: "2026-07-31T10:00", end: "2026-08-23T18:00",
      ticketUrl: "tickets.html?event=southcenter", waiverUrl: "", glow: "var(--lavender)", note: "",
      cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/476db8f0-b647-4c7b-1853-b90e3226b400/public" },
    { eventKey: 'mayfair', city: "Wauwatosa", region: "Wisconsin", emoji: "🛒", venue: "Mayfair Mall",
      timeZone: "America/Chicago",
      lat: 43.0616, lng: -88.0489,
      address: "2500 N Mayfair Rd, Wauwatosa, WI 53226", start: "2026-08-08T10:00", end: "2026-09-07T18:00",
      ticketUrl: "tickets.html?event=mayfair", waiverUrl: "", glow: "var(--cyan)", note: "",
      cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/72a4f8e0-21fc-4e7a-5664-812828de4000/public" },
    { eventKey: 'mainplace', city: "Santa Ana", region: "California", emoji: "🛒", venue: "MainPlace Mall",
      timeZone: "America/Los_Angeles",
      lat: 33.7684, lng: -117.8677,
      address: "2800 N Main St, Santa Ana, CA 92705", start: "2026-08-29T10:00", end: "2026-09-27T19:30",
      ticketUrl: "tickets.html?event=mainplace", waiverUrl: "", glow: "var(--coral)", note: "",
      cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/2c9edb26-f682-4fad-4a97-743454e22e00/public" },
    { eventKey: 'edisonmall', city: "Fort Myers", region: "Florida", emoji: "🛒", venue: "Edison Mall",
      timeZone: "America/New_York",
      lat: 26.6098, lng: -81.8662,
      address: "4125 Cleveland Ave, Fort Myers, FL 33901", start: "2026-10-09T10:00", end: "2026-11-01T19:00",
      ticketUrl: "tickets.html?event=edisonmall", waiverUrl: "", glow: "var(--gold)", note: "",
      cardBg: "https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/476db8f0-b647-4c7b-1853-b90e3226b400/public" }
  ];

  window.getEventStatus = function(ev) {
    var s = window.getEventStartDate(ev);
    var e = window.getEventEndDate(ev);
    var now = new Date();
    if (now >= s && now <= e) return 'live';
    if (now < s) return 'upcoming';
    return 'ended';
  };
})();
