/**
 * Client-side localization (English / español).
 * Load localization-data.js first for FAQ accordion content when available.
 */
(function () {
  'use strict';

  var STORAGE = 'rd-lang';
  var SUPPORTED = { en: 1, es: 1 };

  /** Base UI strings merged with RD_LOCALE_DATA.strings when present */
  var STRINGS = {
    en: {
      lang_en: 'EN',
      lang_es: 'ES',
      lang_switch_aria: 'Language',
      'nav.primary_aria': 'Primary',
      'nav.region_aria': 'Choose your country site',
      'nav.home': 'Home',
      'nav.events': 'Events',
      'nav.about': 'About',
      'nav.faq': 'FAQ',
      'nav.contact': 'Contact',
      'nav.more': 'More',
      'nav.join_list': 'Join Royal List',
      'nav.volunteer': 'Volunteer',
      'nav.affiliate': 'Affiliate Program',
      'nav.vendors': 'Vendors',
      'nav.buy': 'Buy Tickets',
      'nav.back_home_aria': 'Back to home',
      'nav.toggle_open': 'Open menu',
      'nav.toggle_close': 'Close menu',
      'home.meta.title': 'The Royal Duck Bounce House | Pop-Up Inflatable Bounce Park USA',
      'home.meta.description':
        'The Royal Duck Bounce House is a traveling pop-up bounce park with giant inflatables, music, and family fun across the USA. Book tickets, see tour dates, and join the royal list.',

      'hero.title_html':
        'Welcome To<br>the World\'s<br><span class="hl-t">Largest and Tallest<br>Bounce House</span>',
      'hero.book': 'Book Now',
      'hero.waiver': 'Sign Waiver',
      'hero.video_title': 'Royal Duck bounce park video',

      'events.title_where': 'Where',
      'events.title_we': "We're",
      'events.title_bouncing': 'Bouncing!',
      'events.status_live': 'Live',
      'events.status_upcoming': 'Upcoming',
      'events.filter_status_aria': 'Event status',
      'events.filter_regions_aria': 'Filter by state or province',
      'events.region_all': 'All regions',
      'events.live_badge': 'LIVE NOW',
      'events.upcoming_badge': 'UPCOMING',
      'events.ended_badge': 'ENDED',
      'events.local_time_caption': 'Local time at venue',
      'events.get_tickets': 'Get Tickets',
      'events.sign_waiver': 'Sign Waiver',
      'events.thanks_ended': 'Thanks for bouncing with us!',
      'events.empty': 'No events in this category. Follow us for updates!',
      'events.cta_live_one': '$1 Live Event Right Now!',
      'events.cta_live_many': '$1 Live Events Right Now!',
      'events.cta_up_one': '$1 Upcoming Event!',
      'events.cta_up_many': '$1 Upcoming Events!',
      'events.cta_fallback': 'New Events Coming Soon!',
      'events.cd_days': 'Days',
      'events.cd_hrs': 'Hrs',
      'events.cd_min': 'Min',
      'events.cd_sec': 'Sec',

      'about.title_html':
        'What Is <span style="color:#ffcd2e">The Royal Duck?</span>',
      'about.intro':
        'A travelling pop-up bounce park bringing big fun and nostalgic vibes to families, kids and playful adults across North America and beyond.',
      'about.card1_t': 'Giant Bounce Castles',
      'about.card1_p':
        "Huge inflatable castles where you can jump, bounce and play until you're wonderfully tired out!",
      'about.card2_t': 'Music & Royal Vibes',
      'about.card2_p': 'Dance to awesome tunes while you bounce! The party never stops at Royal Duck!',
      'about.card3_t': 'Curated Photo Ops',
      'about.card3_p':
        'Strike your best pose at our royalty-themed photo areas — perfect for making memories!',
      'about.alt_castle': 'Castle icon',
      'about.alt_music': 'Music notes icon',
      'about.alt_camera': 'Camera icon',

      'faq.title': 'Got Questions?',
      'faq.sub': "Here's what you need to know before you bounce!",

      'volsec.title_html':
        '<span style="color:var(--coral)">VOLUNTEER &amp; SCORE FREE ADMISSIONS!</span>',
      'volsec.intro1':
        'Think the world\'s largest bounce park runs on magic? Not a bad guess—but the real answer is <strong>Volunteers</strong>. Truth is, we simply couldn\'t do it without you!',
      'volsec.intro2':
        'Our volunteers jump in right alongside the crew: checking guests in, hyping up the crowd, managing the inflatables, and keeping a sharp eye on safety so everyone has a blast.',
      'volsec.intro3':
        'So what\'s in it for you? A four-hour shift = <strong>three passes</strong> to share with family and friends. That\'s <strong>four hours of access</strong> to the <strong>World\'s Biggest Bounce Park</strong>—all on us!',
      'volsec.intro4': 'Come for the fun, stay for the perks. We\'ve got your spot!',
      'volsec.cta': 'Apply on the volunteer page',

      'mail.title_html':
        'Join the <span style="color:var(--gold)">Royal List!</span>',
      'mail.sub':
        'Be the first to know when and where we pop up next. Exclusive event drops & vendor call-outs!',
      'mail.name_ph': 'Full name',
      'mail.email_ph': 'Email',
      'mail.submit': 'Join the Royal List!',

      'contact.title': 'Contact Royal Duck',
      'contact.sub': 'Have questions or want to book The Royal Duck for your next event?',
      'contact.facebook_label': 'Facebook',
      'contact.privacy': 'Privacy Policy',
      'contact.norefunds': 'No-refund policy',
      'contact.copy':
        '© 2025 The Royal Duck USA. All rights reserved. All dates and offers subject to change.',

      'privacy_banner.aria': 'Privacy and cookies',
      'privacy_banner.text_html':
        'We use cookies and similar technologies as described in our <a href="privacy.html">Privacy Policy</a>. Choose how we may store optional preferences on your device.',
      'privacy_banner.accept': 'Accept',
      'privacy_banner.essential': 'Essential only',

      'duck.label': 'Quacks:',
      'photos.alt1': 'Royal Duck bounce house photo',
      'photos.alt2': 'Royal Duck family fun at the bounce park',
      'photos.alt3': 'Royal Duck bounce park atmosphere',
      'photos.alt4': 'Royal Duck inflatable fun',
      'photos.alt5': 'Royal Duck event photo',

      'logo.alt': 'The Royal Duck',

      'forms.submitting': 'Submitting…',
      'royal.alert_demo':
        '🐥👑 Welcome to the Royal List! Consider this your royal invitation to bounce like never before.',
      'royal.msg_success': 'You\'ve signed up successfully!',
      'royal.msg_on_list': 'You\'re already on the Royal List!',
      'royal.err_generic': 'Something went wrong. Please try again.',
      'royal.err_network': 'Network error. Please try again.',

      'tickets.meta.title': 'Get Tickets | The Royal Duck Bounce House — Book Your Visit',
      'tickets.meta.description':
        'Book tickets for The Royal Duck Bounce House. Choose your city or region, pick a date, and reserve your bounce park visit online.',
      'tickets.h1': 'Get Tickets',
      'tickets.intro':
        'Book your visit to The Royal Duck Bounce House. Choose a location, then select your date and complete your booking below.',
      'tickets.geo.region_aria': 'Location helper',
      'tickets.geo.strong': 'Find your nearest stop',
      'tickets.geo.p':
        'We can use your device location once to select the closest booking page. Your coordinates are not stored on our servers—only your browser shares them with us for this pick.',
      'tickets.geo.allow': 'Use my location',
      'tickets.geo.later': 'Not now',
      'tickets.geo.never': 'Don\'t ask again',
      'tickets.hint': 'Choose a location above (or use location services) to load availability.',
      'tickets.iframe_title': 'Royal Duck – Book your visit',
      'tickets.footer_back': '← Back to Home',
      'tickets.loc_all': 'All',
      'tickets.loc_geo_err_browser': 'Location isn’t available in this browser.',
      'tickets.geo_no_match': 'No matching tour stop found for your area.',
      'tickets.geo_could_not': 'Could not get your location.',
      'tickets.geo_denied':
        'Location permission was denied. You can still pick a stop below.',
      'tickets.geo_unavail': 'Location unavailable. Pick a stop below.',
      'tickets.geo_timeout':
        'Location request timed out. Try again or pick a stop below.',

      'norefund.h1': 'No-refund policy',

      'vol.meta.title': 'Be Part of the Magic – Royal Duck America 2026 | The Royal Duck',
      'vol.meta.desc':
        'Be part of the magic with Royal Duck America 2026 — volunteer at load-in, guest welcome, and special activations at our traveling bounce park.',
      'vol.h1_before': 'Be Part of the Magic ',
      'vol.h1_sub': '– Royal Duck America 2026',
      'vol.lead':
        'Want to help families bounce, laugh, and make memories? Join our volunteer crew—we’d love extra hands at load-in, guest welcome, and keeping the park humming.',
      'vol.form_intro': 'Tell us a bit about you—we’ll reach out when we’re headed your way.',
      'vol.label_name': 'Full name',
      'vol.ph_name': 'Your full name',
      'vol.label_phone': 'Phone number',
      'vol.ph_phone': '(555) 555-5555',
      'vol.label_email': 'Email address',
      'vol.ph_email': 'you@example.com',
      'vol.label_over18': 'Are you over 18?',
      'vol.opt_placeholder': 'Select…',
      'vol.opt_yes': 'Yes',
      'vol.opt_no': 'No',
      'vol.lbl_tour': 'Tour city / township',
      'vol.hint_city': 'Please type the location closest to you.',
      'vol.ph_city': 'e.g. Arlington, TX or nearest town',
      'vol.label_shift': 'Shift preference',
      'vol.shift_ph': 'Select shift…',
      'vol.shift_morning': 'Morning',
      'vol.shift_noon': 'Noon',
      'vol.shift_afternoon': 'Afternoon',
      'vol.shift_evening': 'Evening',
      'vol.footnote_html':
        '<span class="vol-req">*</span> Required fields. By submitting, you agree we may contact you about volunteer opportunities.',
      'vol.submit': 'Submit volunteer interest',
      'vol.demo_ok':
        'Thank you! Your volunteer interest has been received. We’ll reach out when we’re near your area.\n\n(Configure volunteer-signup-url meta to save to the server.)',
      'vol.msg_already': 'You\'ve already signed up with this email.',
      'vol.msg_success': 'You\'ve signed up successfully!',

      'aff.meta.title': 'Affiliate Program | The Royal Duck',
      'aff.meta.desc':
        'Partner with The Royal Duck USA — affiliate and social media collaboration opportunities for our traveling bounce park tour.',
      'aff.h1': 'Affiliate Program',
      'aff.lead_html':
        'We\'re building our <strong>affiliate</strong> and <strong>social-media partner</strong> program for The Royal Duck tour—so creators, local voices, and aligned brands can help spread the word when we bounce into new cities.',
      'aff.body':
        'Program details, tiers, and application steps will be posted here as we finalize them. If you’d like to collaborate or get on our partner radar early, we’d love to hear from you.',
      'aff.touch_title': 'Get in touch',
      'aff.touch_body_html':
        'Reach us through the <a class="partner-link" href="home.html#contact">Contact</a> section on our homepage, or connect via <a class="partner-link" href="https://www.instagram.com/theroyalduckbh" target="_blank" rel="noopener noreferrer">Instagram</a> and <a class="partner-link" href="https://www.facebook.com/profile.php?id=61581698462349" target="_blank" rel="noopener noreferrer">Facebook</a>.',


      'vendor.meta.title': 'Apply for the Royal Vibe – Vendors & Food | The Royal Duck',
      'vendor.meta.desc':
        'Local vendors, food trucks, and creatives: partner with The Royal Duck traveling bounce park. Apply for the Royal Vibe.',
      'vendor.h1_main': 'Are you a local vendor or food creator?',
      'vendor.h1_sub': 'Apply for the Royal Vibe',
      'vendor.lead':
        'We\'re always looking to bring in local vendors, creatives, and small businesses to help us create a vibe at each stop. Let\'s build playful magic together.',
      'vendor.intro':
        'Tell us about your setup and where you operate—we\'ll reach out when we\'re planning a stop near you.',
      'vendor.lbl_business': 'Business or brand name',
      'vendor.ph_business': 'e.g. Royal Tacos Co.',
      'vendor.lbl_contact': 'Your name',
      'vendor.ph_contact': 'Primary contact',
      'vendor.lbl_email': 'Email',
      'vendor.lbl_phone': 'Phone',
      'vendor.lbl_type': 'What best describes you?',
      'vendor.opt_pick': 'Select…',
      'vendor.opt_food_truck': 'Food truck',
      'vendor.opt_food_creator': 'Food creator / maker',
      'vendor.opt_merch': 'Merch & retail',
      'vendor.opt_ent': 'Entertainment / activation',
      'vendor.opt_other': 'Other',
      'vendor.lbl_region': 'City or region you can serve',
      'vendor.hint_region': 'Where should we picture you when we roll into town?',
      'vendor.ph_region': 'e.g. DFW metro, GTA, nearest city',
      'vendor.lbl_offer': 'What do you bring to the Royal Vibe?',
      'vendor.hint_offer': 'Menu, lineup, vibe, or setup—a few sentences is perfect.',
      'vendor.ph_offer': 'Describe what you sell or offer at events…',
      'vendor.lbl_web': 'Website or social (optional)',
      'vendor.ph_web': 'Website, @handle, or Instagram link',
      'vendor.footnote_html':
        '<span class="vendor-req">*</span> Required. By submitting, you agree we may contact you about vending and partnerships.',
      'vendor.submit': 'Submit vendor interest',
      'vendor.submit_btn': 'Submit — Royal Vibe',
      'vendor.demo_alert':
        'Thanks! Your Royal Vibe interest is noted. Configure vendor-signup-url meta to save to the server.',
      'vendor.msg_dup': 'We already have this email on file.',
      'vendor.msg_success': 'Signed up successfully!',

      'privacy.meta.title': 'Privacy Policy | The Royal Duck',
      'privacy.meta.desc': 'How The Royal Duck USA collects and uses information when you use our website, tickets page, and booking tools.',
      'privacy.h1': 'Privacy Policy',
      'privacy.notice_html': '',
      'norefund.meta.title': 'No-refund policy | The Royal Duck',
      'norefund.meta.desc':
        'Ticket and purchase terms for The Royal Duck Bounce House pop-up tour — refunds and exchanges.',

      'legal.privacy_intro': '',

      'common.back_home': '← Back to Home'
    },
    es: {
      lang_en: 'EN',
      lang_es: 'ES',
      lang_switch_aria: 'Idioma',
      'nav.primary_aria': 'Principal',
      'nav.region_aria': 'Elige el sitio de tu país',
      'nav.home': 'Inicio',
      'nav.events': 'Eventos',
      'nav.about': 'Nosotros',
      'nav.faq': 'Preguntas',
      'nav.contact': 'Contacto',
      'nav.more': 'Más',
      'nav.join_list': 'Únete a la Royal List',
      'nav.volunteer': 'Voluntarios',
      'nav.affiliate': 'Programa de afiliados',
      'nav.vendors': 'Proveedores',
      'nav.buy': 'Boletos',
      'nav.back_home_aria': 'Volver al inicio',
      'nav.toggle_open': 'Abrir menú',
      'nav.toggle_close': 'Cerrar menú',
      'home.meta.title': 'The Royal Duck Bounce House | Parque inflable pop-up EE.UU.',
      'home.meta.description':
        'The Royal Duck Bounce House es un parque inflable itinerante con inflables gigantes, música y diversión familiar en EE.UU. Compra boletos, consulta fechas del tour y únete a la Royal List.',

      'hero.title_html':
        'Bienvenido al<br>más grande y<br><span class="hl-t">más alto del mundo:<br>casa inflable</span>',
      'hero.book': 'Reservar',
      'hero.waiver': 'Firmar exención',
      'hero.video_title': 'Video del parque inflable Royal Duck',

      'events.title_where': 'Dónde',
      'events.title_we': 'nos',
      'events.title_bouncing': '¡Saltamos!',
      'events.status_live': 'En vivo',
      'events.status_upcoming': 'Próximos',
      'events.filter_status_aria': 'Estado del evento',
      'events.filter_regions_aria': 'Filtrar por estado o provincia',
      'events.region_all': 'Todas las regiones',
      'events.live_badge': 'EN VIVO',
      'events.upcoming_badge': 'PRÓXIMO',
      'events.ended_badge': 'FINALIZÓ',
      'events.local_time_caption': 'Hora local en el lugar',
      'events.get_tickets': 'Comprar boletos',
      'events.sign_waiver': 'Firmar exención',
      'events.thanks_ended': '¡Gracias por saltar con nosotros!',
      'events.empty': 'No hay eventos en esta categoría. ¡Síguenos para novedades!',
      'events.cta_live_one': '¡$1 evento en vivo ahora!',
      'events.cta_live_many': '¡$1 eventos en vivo ahora!',
      'events.cta_up_one': '¡$1 evento próximo!',
      'events.cta_up_many': '¡$1 eventos próximos!',
      'events.cta_fallback': '¡Pronto nuevos eventos!',
      'events.cd_days': 'Días',
      'events.cd_hrs': 'Hrs',
      'events.cd_min': 'Min',
      'events.cd_sec': 'Seg',

      'about.title_html': '¿Qué es <span style="color:#ffcd2e">The Royal Duck</span>?',
      'about.intro':
        'Un parque inflable itinerante que lleva diversión grande y buena energía a familias, niños y adultos juguetones en Norteamérica y más allá.',
      'about.card1_t': 'Castillos inflables gigantes',
      'about.card1_p':
        '¡Inflables enormes donde puedes saltar, rebotar y jugar hasta quedar felizmente cansado!',
      'about.card2_t': 'Música y ambiente royal',
      'about.card2_p': '¡Baila con buena música mientras saltas! ¡La fiesta no para en Royal Duck!',
      'about.card3_t': 'Spots fotográficos',
      'about.card3_p':
        'Pon tu mejor pose en nuestras zonas tema realeza — perfectas para buenos recuerdos.',
      'about.alt_castle': 'Ícono de castillo',
      'about.alt_music': 'Ícono de música',
      'about.alt_camera': 'Ícono de cámara',

      'faq.title': '¿Preguntas?',
      'faq.sub': 'Esto es lo que debes saber antes de venir.',

      'volsec.title_html':
        '<span style="color:var(--coral)">¡VOLUNTARIOS Y BOLETOS GRATIS!</span>',
      'volsec.intro1':
        '¿Crees que el parque inflable más grande funciona solo con magia? Casi—but la verdadera respuesta son los <strong>voluntarios</strong>. Sin ustedes, no podemos.',
      'volsec.intro2':
        'Saltan con el equipo: recibir invitados, animar la multitud, apoyar en inflables y vigilar seguridad para que todos la pasen bien.',
      'volsec.intro3':
        '¿Qué ganas? Un turno de cuatro horas = <strong>tres pases</strong> para familia y amigos. Son <strong>cuatro horas de acceso</strong> al <strong>Parque inflable más grande del mundo</strong>: ¡nosotros invitamos!',
      'volsec.intro4': 'Ven por la diversión, quédate por los beneficios. ¡Te esperamos!',
      'volsec.cta': 'Aplica en la página de voluntarios',

      'mail.title_html':
        'Únete a la <span style="color:var(--gold)">Royal List!</span>',
      'mail.sub':
        'Entérate primero cuándo y dónde aparecemos. Avisos de eventos y convocatorias a proveedores.',
      'mail.name_ph': 'Nombre completo',
      'mail.email_ph': 'Correo electrónico',
      'mail.submit': '¡Unirme a la Royal List!',

      'contact.title': 'Contacto Royal Duck',
      'contact.sub': '¿Dudas o quieres The Royal Duck en tu próximo evento?',
      'contact.facebook_label': 'Facebook',
      'contact.privacy': 'Privacidad',
      'contact.norefunds': 'Política sin reembolsos',
      'contact.copy':
        '© 2025 The Royal Duck USA. Todos los derechos reservados. Fechas y promociones sujetos a cambio.',

      'privacy_banner.aria': 'Privacidad y cookies',
      'privacy_banner.text_html':
        'Usamos cookies y tecnologías similares como se describe en nuestra <a href="privacy.html">Política de privacidad</a>. Elige cómo guardar preferencias opcionales en tu dispositivo.',
      'privacy_banner.accept': 'Aceptar',
      'privacy_banner.essential': 'Solo esenciales',

      'duck.label': 'Quacks:',
      'photos.alt1': 'Foto del inflable Royal Duck',
      'photos.alt2': 'Familias Royal Duck divirtiéndose',
      'photos.alt3': 'Ambiente del parque Royal Duck',
      'photos.alt4': 'Inflable Royal Duck',
      'photos.alt5': 'Foto del evento Royal Duck',

      'logo.alt': 'The Royal Duck',

      'forms.submitting': 'Enviando…',
      'royal.alert_demo':
        '🐥👑 ¡Bienvenido a la Royal List! Tu invitación real para botar como nunca.',
      'royal.msg_success': '¡Te registraste correctamente!',
      'royal.msg_on_list': '¡Ya estás en la Royal List!',
      'royal.err_generic': 'Algo salió mal. Intenta de nuevo.',
      'royal.err_network': 'Error de red. Intenta de nuevo.',

      'tickets.meta.title': 'Boletos | The Royal Duck Bounce House — Reserva tu visita',
      'tickets.meta.description':
        'Compra boletos para The Royal Duck Bounce House. Elige tu ciudad o región, fecha y reserva tu visita en línea.',
      'tickets.h1': 'Boletos',
      'tickets.intro':
        'Reserva tu visita a The Royal Duck Bounce House. Elige una ubicación, luego fecha y completa tu reserva abajo.',
      'tickets.geo.region_aria': 'Ubicación cercana',
      'tickets.geo.strong': 'Encuentra la parada más cercana',
      'tickets.geo.p':
        'Podemos usar la ubicación de tu dispositivo una vez para abrir la reserva más cercana. Tus coordenadas no se guardan en nuestros servidores: solo tu navegador nos las comparte para esta selección.',
      'tickets.geo.allow': 'Usar mi ubicación',
      'tickets.geo.later': 'Ahora no',
      'tickets.geo.never': 'No volver a preguntar',
      'tickets.hint': 'Elige una ubicación arriba (o usa ubicación) para ver disponibilidad.',
      'tickets.iframe_title': 'Royal Duck – Reserva tu visita',
      'tickets.footer_back': '← Volver al inicio',
      'tickets.loc_all': 'Todo',
      'tickets.loc_geo_err_browser': 'La ubicación no está disponible en este navegador.',
      'tickets.geo_no_match': 'No encontramos una parada cercana a tu zona.',
      'tickets.geo_could_not': 'No pudimos obtener tu ubicación.',
      'tickets.geo_denied':
        'Permiso de ubicación denegado. Aún puedes elegir una sede abajo.',
      'tickets.geo_unavail': 'Ubicación no disponible. Elige una sede abajo.',
      'tickets.geo_timeout':
        'Se agotó el tiempo. Intenta de nuevo o elige una sede abajo.',

      'norefund.h1': 'Política sin reembolsos',

      'vol.meta.title': 'Súmate a la magia – Royal Duck América 2026 | The Royal Duck',
      'vol.meta.desc':
        'Voluntariado Royal Duck América 2026: montaje, bienvenida e impulso especial en el parque inflable itinerante.',
      'vol.h1_before': 'Súmate a la magia ',
      'vol.h1_sub': '– Royal Duck América 2026',
      'vol.lead':
        '¿Ayudar a que familias salten y rían? Únete al equipo voluntario — necesitamos manos extra en montaje, bienvenida y operación.',
      'vol.form_intro': 'Cuéntanos de ti — te contactamos cuando lleguemos por tu ciudad.',
      'vol.label_name': 'Nombre completo',
      'vol.ph_name': 'Tu nombre completo',
      'vol.label_phone': 'Teléfono',
      'vol.ph_phone': '(555) 555-5555',
      'vol.label_email': 'Correo electrónico',
      'vol.ph_email': 'tu@ejemplo.com',
      'vol.label_over18': '¿Tienes más de 18 años?',
      'vol.opt_placeholder': 'Elige…',
      'vol.opt_yes': 'Sí',
      'vol.opt_no': 'No',
      'vol.lbl_tour': 'Ciudad / municipio del tour',
      'vol.hint_city': 'Escribe la ubicación más cercana a ti.',
      'vol.ph_city': 'p. ej. Arlington, TX o ciudad cercana',
      'vol.label_shift': 'Preferencia de turno',
      'vol.shift_ph': 'Elige turno…',
      'vol.shift_morning': 'Mañana',
      'vol.shift_noon': 'Mediodía',
      'vol.shift_afternoon': 'Tarde',
      'vol.shift_evening': 'Noche',
      'vol.footnote_html':
        '<span class="vol-req">*</span> Campos obligatorios. Al enviar, aceptas que podamos escribirte sobre voluntariado.',
      'vol.submit': 'Enviar interés como voluntario',
      'vol.demo_ok':
        '¡Gracias! Recibimos tu interés. Te contactamos cuando estemos cerca de tu zona.\n\n(Configura volunteer-signup-url en meta para guardar en el servidor.)',
      'vol.msg_already': 'Ya te registraste con este correo.',
      'vol.msg_success': '¡Registro exitoso!',

      'aff.meta.title': 'Programa de afiliados | The Royal Duck',
      'aff.meta.desc':
        'Alianzas con The Royal Duck USA — colaboradores y redes para el tour del parque inflable.',
      'aff.h1': 'Programa de afiliados',
      'aff.lead_html':
        'Estamos construyendo un programa de <strong>afiliados</strong> y <strong>partners en redes</strong> para el tour Royal Duck — creadores, voces locales y marcas aliadas pueden ayudar a difundir cuando llegamos a nuevas ciudades.',
      'aff.body':
        'Detalle de niveles y pasos de aplicación se publicarán cuando estén listos. Si quieres colaborar o entrar antes al radar de partners, escríbenos.',
      'aff.touch_title': 'Contacto',
      'aff.touch_body_html':
        'Escríbenos desde <a class="partner-link" href="home.html#contact">Contacto</a> en la página principal o por <a class="partner-link" href="https://www.instagram.com/theroyalduckbh" target="_blank" rel="noopener noreferrer">Instagram</a> y <a class="partner-link" href="https://www.facebook.com/profile.php?id=61581698462349" target="_blank" rel="noopener noreferrer">Facebook</a>.',


      'vendor.meta.title': 'Postúlate al Royal Vibe – Proveedores y comida | The Royal Duck',
      'vendor.meta.desc':
        'Proveedores locales, food trucks y creativos: alíate con el parque inflable itinerante The Royal Duck. Postúlate al Royal Vibe.',
      'vendor.h1_main': '¿Eres proveedor local o creador de comida?',
      'vendor.h1_sub': 'Postúlate al Royal Vibe',
      'vendor.lead':
        'Nos encanta sumar proveedores locales, creativos y pequeños negocios para crear ambiente en cada parada. Construyamos magia juntos.',
      'vendor.intro':
        'Cuéntanos tu operación y dónde trabajas; te contactamos cuando planifiquemos una parada cerca.',
      'vendor.lbl_business': 'Negocio o marca',
      'vendor.ph_business': 'p. ej. Royal Tacos Co.',
      'vendor.lbl_contact': 'Tu nombre',
      'vendor.ph_contact': 'Contacto principal',
      'vendor.lbl_email': 'Correo',
      'vendor.lbl_phone': 'Teléfono',
      'vendor.lbl_type': '¿Qué te describe mejor?',
      'vendor.opt_pick': 'Elige…',
      'vendor.opt_food_truck': 'Food truck',
      'vendor.opt_food_creator': 'Creador de comida / maker',
      'vendor.opt_merch': 'Mercancía y retail',
      'vendor.opt_ent': 'Entretenimiento / activación',
      'vendor.opt_other': 'Otro',
      'vendor.lbl_region': 'Ciudad o región que cubres',
      'vendor.hint_region': '¿Dónde te imaginamos cuando llegamos a la ciudad?',
      'vendor.ph_region': 'p. ej. metro DFW, GTA, ciudad cercana',
      'vendor.lbl_offer': '¿Qué aportas al Royal Vibe?',
      'vendor.hint_offer': 'Menú, propuesta, ambiente o montaje — unas frases bastan.',
      'vendor.ph_offer': 'Describe qué ofreces en eventos…',
      'vendor.lbl_web': 'Web o redes (opcional)',
      'vendor.ph_web': 'Sitio, @usuario o enlace de Instagram',
      'vendor.footnote_html':
        '<span class="vendor-req">*</span> Obligatorio. Al enviar, aceptas que podamos contactarte sobre ventas y alianzas.',
      'vendor.submit': 'Enviar interés de proveedor',
      'vendor.submit_btn': 'Enviar — Royal Vibe',
      'vendor.demo_alert':
        '¡Gracias! Tomamos nota de tu interés Royal Vibe. Configura vendor-signup-url en meta para guardar en el servidor.',
      'vendor.msg_dup': 'Ya tenemos este correo registrado.',
      'vendor.msg_success': '¡Registro exitoso!',

      'privacy.meta.title': 'Política de privacidad | The Royal Duck',
      'privacy.meta.desc':
        'Cómo The Royal Duck USA recopila y usa información cuando usas el sitio, boletos y herramientas de reserva.',
      'privacy.h1': 'Política de privacidad',
      'privacy.notice_html': '',
      'norefund.meta.title': 'Política sin reembolsos | The Royal Duck',
      'norefund.meta.desc':
        'Condiciones de boletos y compras del tour pop-up The Royal Duck Bounce House — reembolsos e intercambios.',

      'legal.privacy_intro':
        '(La versión jurídica completa aparece más abajo en inglés; puedes cambiar la interfaz a español con el selector en el menú.)',

      'common.back_home': '← Volver al inicio'
    }
  };

  var merge = window.RD_LOCALE_DATA && window.RD_LOCALE_DATA.stringsMerge;
  if (merge && typeof merge === 'object') {
    ['en', 'es'].forEach(function (lng) {
      if (merge[lng] && STRINGS[lng]) {
        for (var k in merge[lng]) {
          if (Object.prototype.hasOwnProperty.call(merge[lng], k)) STRINGS[lng][k] = merge[lng][k];
        }
      }
    });
  }

  /** Map URL ?lang=?lng= fragments to canon, or null if absent / unrecognized. Avoid indexOf('es') on user text (false positives). */
  function langFromUrlParam(fragment) {
    if (!fragment) return null;
    var r = String(fragment).toLowerCase().trim();
    if (!r) return null;
    if (r === 'es' || r === 'spa' || r.indexOf('es-') === 0 || r.indexOf('es_') === 0) return 'es';
    if (r === 'en' || r.indexOf('en-') === 0 || r.indexOf('en_') === 0) return 'en';
    return null;
  }

  /** If multiple lang params exist (pixels, rewires), last recognized value wins. */
  function resolveLangFromSearchParams(q) {
    var resolved = null;
    function bump(v) {
      var canon = langFromUrlParam(v);
      if (canon) resolved = canon;
    }
    ['lang', 'lng'].forEach(function (k) {
      q.getAll(k).forEach(bump);
    });
    return resolved;
  }

  /** URL overrides storages (shareable locale); localStorage then sessionStorage; then browser hints. Default en. */
  function resolveLang() {
    try {
      var q = new URLSearchParams(location.search || '');
      var fromUrl = resolveLangFromSearchParams(q);
      if (fromUrl === 'es' || fromUrl === 'en') return fromUrl;

      var ls = localStorage.getItem(STORAGE);
      if (ls === 'es' || ls === 'en') return ls;

      try {
        var ss = sessionStorage.getItem(STORAGE);
        if (ss === 'es' || ss === 'en') return ss;
      } catch (eSs) {}

      var nav = (navigator.language || '').toLowerCase();
      if (nav.indexOf('es') === 0) return 'es';
    } catch (e) {}
    return 'en';
  }

  /** Collapse variants (es-US, trims) to canonical 'es' | 'en'. */
  function normalizeLang(c) {
    if (c == null || c === '') return 'en';
    var s = String(c).trim().toLowerCase();
    if (s === 'es' || s === 'spa' || s.indexOf('es-') === 0 || s.indexOf('es_') === 0) return 'es';
    return 'en';
  }

  var current = normalizeLang(resolveLang());

  function setHtmlLang() {
    if (document.documentElement) document.documentElement.lang = current === 'es' ? 'es' : 'en';
  }

  setHtmlLang();

  function interpolate(str, map) {
    if (!map) return str;
    return String(str).replace(/\$([0-9]+)/g, function (_, num) {
      return map[num] !== undefined && map[num] !== null ? String(map[num]) : '';
    });
  }

  function t(key, mapOrNum, maybeNum2) {
    var map =
      typeof mapOrNum === 'object' && mapOrNum !== null
        ? mapOrNum
        : typeof mapOrNum === 'number' || typeof mapOrNum === 'string'
          ? { 1: String(mapOrNum), 2: maybeNum2 != null ? String(maybeNum2) : '' }
          : {};
    var lng = normalizeLang(current);
    var pack = STRINGS[lng] || STRINGS.en;
    var fall = STRINGS.en;
    var raw = (pack[key] !== undefined ? pack[key] : fall[key]) ?? key;
    return interpolate(raw, map);
  }

  function applyTextNode(el, text) {
    var ch = Array.prototype.slice.call(el.childNodes);
    ch.forEach(function (n) {
      if (n.nodeType === 3) el.removeChild(n);
    });
    el.insertBefore(document.createTextNode(text), el.firstChild);
  }

  function applyDom(root) {
    root = root || document;

    root.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!key) return;
      var v = t(key);
      if (el.hasAttribute('data-i18n-allow-html')) el.innerHTML = v;
      else el.textContent = v;
    });

    root.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (key) el.innerHTML = t(key);
    });

    ['placeholder', 'title', 'aria-label', 'alt'].forEach(function (attr) {
      var sel = '[data-i18n-' + attr + ']';
      root.querySelectorAll(sel).forEach(function (el) {
        var key = el.getAttribute('data-i18n-' + attr);
        if (key) el.setAttribute(attr, t(key));
      });
    });
  }

  function sameHost(hostname) {
    return !hostname || hostname === location.hostname;
  }

  function hrefWithLang(rel) {
    if (!rel || rel.indexOf('mailto:') === 0 || rel.indexOf('tel:') === 0) return rel;
    if (rel.indexOf('checkfront') >= 0 || rel.indexOf('cloudflarestream') >= 0) return rel;
    var u;
    try {
      u = new URL(rel, location.href);
    } catch (e) {
      return rel;
    }
    if (!sameHost(u.hostname)) return rel;
    var file = u.pathname.replace(/^.*\//, '') || '';
    if (!file) return rel;
    if (current === 'es') u.searchParams.set('lang', 'es');
    else u.searchParams.set('lang', 'en');
    return file + u.search + (u.hash || '');
  }

  function localizeHrefAttrs(root) {
    root = root || document;
    root.querySelectorAll('a[href]').forEach(function (a) {
      if (a.getAttribute('data-rd-lang-skip')) return;
      var raw = a.getAttribute('href');
      if (!raw || raw.startsWith('javascript:')) return;
      var out = hrefWithLang(raw);
      if (out !== raw) a.setAttribute('href', out);
    });
  }

  function localizeMeta(pageKey) {
    var tk = STRINGS[normalizeLang(current)] || STRINGS.en;
    var tf = STRINGS.en;
    function pick(pk) {
      return tk[pk] !== undefined ? tk[pk] : tf[pk];
    }
      if (pageKey) {
      var title = pick(pageKey + '.meta.title');
      var desc = pick(pageKey + '.meta.desc') || pick(pageKey + '.meta.description');
      if (title) document.title = title;
      if (desc) {
        var m = document.querySelector('meta[name="description"]');
        if (m) m.setAttribute('content', desc);
      }
    }
  }

  function shouldShowLangSwitcher() {
    /* Long-scroll home only. Subpages keep nav compact; locale still follows ?lang= / storage. */
    return !!(document.body && document.body.classList.contains('site-home'));
  }

  function injectSwitcher(nav) {
    if (!shouldShowLangSwitcher()) return;
    if (!nav || nav.querySelector('.rd-lang-switch')) return;
    var wrap = document.createElement('div');
    wrap.className = 'rd-lang-switch';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', t('lang_switch_aria'));

    function mkBtn(lang, lab) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'rd-lang-btn' + (current === lang ? ' is-active' : '');
      b.textContent = lab;
      b.setAttribute('aria-pressed', current === lang ? 'true' : 'false');
      b.addEventListener('click', function () {
        setLang(lang);
      });
      return b;
    }

    var pack = STRINGS[normalizeLang(current)] || STRINGS.en;
    wrap.appendChild(mkBtn('en', pack.lang_en || 'EN'));
    wrap.appendChild(mkBtn('es', pack.lang_es || 'ES'));

    var links = nav.querySelector('ul.n-links');
    var logoOnly = document.body && document.body.classList.contains('nav-logo-only');

    /**
     * Full nav: last item inside the purple pill beside Buy Tickets.
     * Logo-only: `.n-links` is display:none — mount on `.nav-inner` so bar + fullscreen grid stay stable.
     */
    if (links && !logoOnly) {
      var li = document.createElement('li');
      li.className = 'rd-lang-li';
      li.appendChild(wrap);
      links.appendChild(li);
      return;
    }

    var inner = nav.querySelector('.nav-inner');
    if (inner) {
      inner.appendChild(wrap);
      return;
    }

    if (links) {
      var liFallback = document.createElement('li');
      liFallback.className = 'rd-lang-li';
      liFallback.appendChild(wrap);
      links.appendChild(liFallback);
    } else {
      nav.appendChild(wrap);
    }
  }

  function refreshSwitcher() {
    document.querySelectorAll('.rd-lang-switch').forEach(function (w) {
      var p = w.parentNode;
      if (!p) return;
      if (p.classList && p.classList.contains('rd-lang-li')) {
        p.parentNode.removeChild(p);
      } else {
        p.removeChild(w);
      }
    });
    if (!shouldShowLangSwitcher()) return;
    var nav = document.getElementById('mainNav');
    injectSwitcher(nav);
  }

  function setLang(next) {
    if (!SUPPORTED[next]) return;
    current = normalizeLang(next);
    try {
      localStorage.setItem(STORAGE, current);
    } catch (e) {}
    try {
      sessionStorage.setItem(STORAGE, current);
    } catch (eSs) {}
    try {
      var nu = new URL(location.href);
      if (current === 'es') nu.searchParams.set('lang', 'es');
      else nu.searchParams.set('lang', 'en');
      history.replaceState({}, '', nu.pathname + nu.search + nu.hash);
    } catch (e2) {}

    setHtmlLang();
    applyDom(document);
    localizeHrefAttrs(document);

    refreshSwitcher();

    var page = document.documentElement.getAttribute('data-i18n-page');
    localizeMeta(page);

    document.dispatchEvent(
      new CustomEvent('rd-locale-change', { detail: { lang: current }, bubbles: true })
    );
  }

  window.I18n = {
    STORAGE_KEY: STORAGE,
    getLang: function () {
      return current;
    },
    setLang: setLang,
    t: t,
    applyDom: applyDom,
    localizeLinks: localizeHrefAttrs,
    /** FAQ / Volunteer FAQ payloads from localization-data.js */
    getFAQItems: function () {
      var pack = window.RD_LOCALE_DATA && window.RD_LOCALE_DATA.faqItems;
      if (!pack) return [];
      var lng = normalizeLang(current);
      var preferred = pack[lng];
      if (Array.isArray(preferred) && preferred.length) return preferred;
      // Missing Spanish rows → fall back to English. Never substitute Spanish when UI is EN.
      if (lng === 'es') {
        var enFAQ = pack.en;
        if (Array.isArray(enFAQ) && enFAQ.length) return enFAQ;
      }
      return [];
    },
    getVolunteerFAQItems: function () {
      var pack = window.RD_LOCALE_DATA && window.RD_LOCALE_DATA.volunteerFaqItems;
      if (!pack) return [];
      var lng = normalizeLang(current);
      var preferred = pack[lng];
      if (Array.isArray(preferred) && preferred.length) return preferred;
      if (lng === 'es') {
        var enVol = pack.en;
        if (Array.isArray(enVol) && enVol.length) return enVol;
      }
      return [];
    },

    localizeHrefAttrs: localizeHrefAttrs,
    hrefWithLang: hrefWithLang,
    interpolate: interpolate,

    init: function () {
      current = normalizeLang(resolveLang());
      setHtmlLang();

      localizeMeta(document.documentElement.getAttribute('data-i18n-page'));

      applyDom(document);
      localizeHrefAttrs(document);

      injectSwitcher(document.getElementById('mainNav'));

      document.dispatchEvent(
        new CustomEvent('rd-locale-change', { detail: { lang: current }, bubbles: true })
      );
    }
  };

  /** Non-blocking: defer until DOM parsing so markup exists */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      window.I18n.init();
    });
  } else {
    window.I18n.init();
  }
})();
