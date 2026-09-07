(function(){
  'use strict';
  /* GSAP animations are optional; FAQ content + rd-locale-change must always work. */

  /* Fallback if localization-data.js / i18n.js omitted */
  var FALLBACK_FAQ = [
    { q:"What's included in my ticket?", a:"<ul><li>3-hour admissions pass, inclusive of entry to all bounce attractions.</li><li>Some venues include dedicated time slots for main inflatables.</li></ul>" },
    { q:"What happens in bad weather?", a:"<p>Outdoor pop-ups are weather dependent. If canceled/postponed, tickets can be redeemed at future dates through the tour period.</p>" },
    { q:"Can I get a refund?", a:"<p>We do not offer refunds. If you cannot make it on your selected date, your ticket is still valid for any date in the future.</p>" },
    { q:"Is special attire required?", a:"<ul><li>Socks: Non-slip socks mandatory on all inflatables; can be purchased on-site.</li><li>No pets allowed at venues.</li><li>Pregnancy caution: Expectant guests are advised against inflatable use.</li></ul>" },
    { q:"Can I bring food, drinks, or camera gear?", a:"<ul><li>Food/drink policies vary by venue—check your event page or ask onsite.</li><li>Cameras allowed, but please use caution.</li></ul>" },
    { q:"Where can I buy Royal non-slip socks on-site?", a:"<p>Available on site for $5.99.</p>" },
    { q:"How long are lost items retained, and where can I collect them?", a:"<p>Lost items will be retained for the duration of our event at the given location.</p>" },
    { q:"How do I qualify as a Royal advertiser or social-media partner?", a:"<p>TBD</p>" },
    { q:"Chargeback policy", a:"<p>Submitting a chargeback after receiving tickets for a delivered or postponed (not cancelled) event may be considered misuse of the chargeback process and may result in removal of credits, voiding of tickets and permanent denial of future Royal Duck USA.</p>" },
    { q:"How can vendors join Royal Duck events?", a:"<p>Looking to be part of the royal experience? We welcome food trucks, merch vendors, entertainers, and more.</p><p>Apply on our <a href=\"vendor-register.html\" style=\"color:var(--teal);font-weight:800\">Royal Vibe vendor form</a>. Early-bird and vendor inquiry deadlines are often about 8 weeks before tour dates—plan ahead.</p><p>Vendors can be featured in email promos and social posts as \"Fit for Royalty\" partners.</p>" },
    { q:"Can vendors offer discounts or loyalty deals?", a:"<p>Absolutely! We encourage vendor partnerships by allowing VIP discount bundles, loyalty punch cards, and Wix promocode integration.</p><ul><li>Example: \"Royal Duck + Vendor bundle = 10% off at Vendor X.\"</li></ul>" },
    { q:"Is the venue accessible for guests with disabilities?", a:"<p>Accessibility and inclusion are part of our mission at The Royal Duck. While our locations are still being finalized, we're thoughtfully planning to ensure our venues support a wide range of needs—including mobility, sensory, and neurodivergent accessibility. We're exploring ways to offer features like sensory-friendly sessions, spacious layouts and quiet zones to help guests feel comfortable and supported. Our team is also working on staff training to better assist guests with both visible and invisible disabilities.</p><p>If you or a family member have specific accessibility needs, we'd love to hear from you—your input helps shape a more inclusive experience from day one.</p>" },
    { q:'What are the rules for a tour pass?', a:'<p>A tour pass may only be used at the Royal Duck tour location where it was purchased. It is not transferable to another city or stop.</p><p>Your tour pass expires when activation for that same calendar year\'s Royal Duck tour dates ends at your location.</p>' }
  ];

  function faqRows() {
    var pack = window.RD_LOCALE_DATA && window.RD_LOCALE_DATA.faqItems;
    if (window.I18n && typeof window.I18n.getFAQItems === 'function') {
      var rows = window.I18n.getFAQItems();
      if (rows && rows.length) return rows;
    }
    var lng = window.I18n && window.I18n.getLang ? window.I18n.getLang() : 'en';
    if (lng === 'es' && pack && pack.es && pack.es.length) return pack.es;
    if (lng !== 'es' && pack && pack.en && pack.en.length) return pack.en;
    return FALLBACK_FAQ;
  }

  function render(){
    var faqEl = document.getElementById('faqList');
    if (!faqEl) return;
    faqEl.innerHTML = '';
    faqRows().forEach(function(f){
      var item = document.createElement('div');
      item.className = 'faq-item';
      item.innerHTML = '<div class="faq-q"><h4>'+f.q+'</h4><span class="faq-arrow">▼</span></div><div class="faq-a">'+f.a+'</div>';
      item.querySelector('.faq-q').onclick = function(){
        var open = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function(x){ x.classList.remove('open'); var a=x.querySelector('.faq-a'); if(a) a.style.maxHeight='0'; });
        if(!open){ item.classList.add('open'); var a=item.querySelector('.faq-a'); if(a) a.style.maxHeight=a.scrollHeight+'px'; }
      };
      faqEl.appendChild(item);
    });
  }

  function initAnimations(){
    if (!window.gsap || !window.gsap.registerPlugin || !window.ScrollTrigger) return;
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    gsap.fromTo('.faq-sec .tag,.faq-sec .sh,.faq-sec .sd',{opacity:0,y:35},{opacity:1,y:0,duration:.55,stagger:.08,ease:'power3.out',scrollTrigger:{trigger:'.faq-sec',start:'top 72%'}});
    gsap.fromTo('.faq-item',{opacity:0,x:-40},{opacity:1,x:0,duration:.4,stagger:.06,ease:'power3.out',scrollTrigger:{trigger:'.faq-list',start:'top 80%'}});
  }

  function init(){
    render();
    initAnimations();
  }

  document.addEventListener('rd-locale-change', render);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
