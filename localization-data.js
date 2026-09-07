/**
 * Long-form FAQ payloads (English + español).
 * Loads before i18n.js — attach to RD_LOCALE_DATA.
 */
(function () {
  'use strict';

  var EN_FAQ = [
    {
      q: "What's included in my ticket?",
      a:
        '<ul><li>3-hour admissions pass, inclusive of entry to all bounce attractions.</li><li>Some venues include dedicated time slots for main inflatables.</li></ul>'
    },
    {
      q: 'What happens in bad weather?',
      a:
        '<p>Outdoor pop-ups are weather dependent. If canceled/postponed, tickets can be redeemed at future dates through the tour period.</p>'
    },
    {
      q: 'Can I get a refund?',
      a:
        '<p>We do not offer refunds. If you cannot make it on your selected date, your ticket is still valid for any date in the future.</p>'
    },
    {
      q: 'Is special attire required?',
      a:
        '<ul><li>Socks: Non-slip socks mandatory on all inflatables; can be purchased on-site.</li><li>No pets allowed at venues.</li><li>Pregnancy caution: Expectant guests are advised against inflatable use.</li></ul>'
    },
    {
      q: 'Is there an age limit?',
      a:
        '<p>No. Children who are mobile enough to explore the bounce park need paid admission. Babies who must be carried in to enter—they aren’t independently mobile yet—are admitted free.</p>'
    },
    {
      q: 'Can I bring food, drinks, or camera gear?',
      a:
        '<ul><li>Food/drink policies vary by venue—check your event page or ask onsite.</li><li>Cameras allowed, but please use caution.</li></ul>'
    },
    {
      q: 'Where can I buy Royal non-slip socks on-site?',
      a: '<p>Available on site for $5.99.</p>'
    },
    {
      q: 'How long are lost items retained, and where can I collect them?',
      a: '<p>Lost items will be retained for the duration of our event at the given location.</p>'
    },
    {
      q: 'How do I qualify as a Royal advertiser or social-media partner?',
      a: '<p>TBD</p>'
    },
    {
      q: 'Chargeback policy',
      a:
        '<p>Submitting a chargeback after receiving tickets for a delivered or postponed (not cancelled) event may be considered misuse of the chargeback process and may result in removal of credits, voiding of tickets and permanent denial of future Royal Duck USA.</p>'
    },
    {
      q: 'How can vendors join Royal Duck events?',
      a:
        '<p>Looking to be part of the royal experience? We welcome food trucks, merch vendors, entertainers, and more.</p><p>Apply on our <a href="vendor-register.html" style="color:var(--teal);font-weight:800">Royal Vibe vendor form</a>. Early-bird and vendor inquiry deadlines are often about 8 weeks before tour dates—plan ahead.</p><p>Vendors can be featured in email promos and social posts as "Fit for Royalty" partners.</p>'
    },
    {
      q: 'Can vendors offer discounts or loyalty deals?',
      a:
        '<p>Absolutely! We encourage vendor partnerships by allowing VIP discount bundles, loyalty punch cards, and Wix promocode integration.</p><ul><li>Example: "Royal Duck + Vendor bundle = 10% off at Vendor X."</li></ul>'
    },
    {
      q: 'Is the venue accessible for guests with disabilities?',
      a:
        '<p>Accessibility and inclusion are part of our mission at The Royal Duck. While our locations are still being finalized, we are thoughtfully planning venues to support mobility, sensory, and neurodivergent needs—including explorations around sensory-friendly sessions, spacious layouts, and quiet zones. Our team is also working on staff training to better assist guests with visible and invisible disabilities.</p><p>If you or a family member have specific accessibility needs, we\'d love to hear from you—your input helps shape a more inclusive experience from day one.</p>'
    },
    {
      q: 'What are the rules for a tour pass?',
      a:
        '<p>A tour pass may only be used at the Royal Duck tour location where it was purchased. It is not transferable to another city or stop.</p><p>Your tour pass expires when activation for that same calendar year\'s Royal Duck tour dates ends at your location.</p>'
    },
    {
      q: 'Can I transfer my booking to a different person?',
      a:
        '<p>Yes, subject to availability. Get in touch with our team and have the following ready:</p><ul><li>The name and email address on the original booking</li><li>Your booking reference number (found on your confirmation email)</li><li>Which city you are attending</li><li>The session date and time you would like to move into</li></ul><p>Our customer service team will do our best to accommodate you. Tickets can only be transferred by notifying us.</p>'
    },
    {
      q: 'My event was cancelled or postponed — what happens now?',
      a:
        '<p>Check your inbox — you’ll have an email from us with your options laid out clearly. If a refund was offered, our team will be hard at work processing those and will be in touch once it’s done. If you held onto your tickets, new ones for the rescheduled date will follow shortly.</p>'
    },
    {
      q: 'Do all children need to be accompanied by an adult?',
      a:
        '<p>No. Only children aged 9 &amp; under must be accompanied onto the inflatables by a parent or carer who has their own Jumper Ticket — they cannot enter the inflatables alone.</p>'
    },
    {
      q: 'I’m a parent, do I need a ticket?',
      a:
        '<p>All that plan to go inside the castle need to purchase a ticket.</p><p><strong>Important:</strong> Children aged 9 &amp; under must be accompanied onto the inflatables by a parent or carer who has their own Jumper Ticket (included in the bundled ticket price) — they cannot enter the inflatables alone.</p>'
    },
    {
      q: 'I’ll be wearing my infant, do they require a ticket?',
      a:
        '<p>Very young infants being worn in a carrier or sling on the inflatables don’t need their own ticket.</p>'
    },
    {
      q: 'Do I need to be super fit to attend?',
      a:
        '<p>Not even close. There’s no required fitness level — just find a pace that works for you.</p><p>Go all out on every obstacle, or relax on a giant inflatable sofa and watch the fun unfold. There’s zero pressure — come as you are and do as much or as little as feels right.</p>'
    },
    {
      q: 'What do I need to wear to take part?',
      a:
        '<p>Anti-slip socks are mandatory on all inflatables — no bare feet, no shoes. We sell our branded anti-slip socks on site, or bring your own. Packing a spare pair is a good move so you’ve got a fresh set for after.</p><p>Beyond socks, just dress for the weather and your own comfort. Nothing too restrictive.</p>'
    },
    {
      q: 'What happens if it is raining — will the event still go ahead?',
      a:
        '<p>We keep a very close eye on the forecast and take safety seriously. Light rain isn’t usually a problem. In the case of thunderstorms, high winds, or genuinely unsafe conditions, we may need to postpone, cancel, or adjust individual sessions.</p><p>If anything changes, you’ll hear from us via our website, social media and — if you have booked tickets — we will do our best to reach you via phone as soon as a decision is made.</p>'
    },
    {
      q: 'Does it get too hot in the sun?',
      a:
        '<p>Most of our events run through the summer, so it pays to come prepared. Sunscreen, water, and lightweight clothing are all sensible.</p>'
    },
    {
      q: 'I’m pregnant, can I still bounce?',
      a:
        '<p>While we do allow those who are pregnant to take part, you do so at your own discretion. Be mindful that the surface of any inflatable can be unpredictable, and you may lose your footing at points.</p>'
    }
  ];

  var ES_FAQ = [
    {
      q: '¿Qué incluye mi boleto?',
      a:
        '<ul><li>Pase de admisión por 3 horas, con acceso a todas las zonas hinchables del parque.</li><li>En algunos recintos se asignan franjas para los inflables principales.</li></ul>'
    },
    {
      q: '¿Qué pasa si hay mal tiempo?',
      a:
        '<p>Los montajes al aire libre dependen del clima. Si un día se suspende o se reprograma, los boletos pueden utilizarse en otras fechas dentro del período del tour según disponibilidad.</p>'
    },
    {
      q: '¿Puedo obtener un reembolso?',
      a:
        '<p>No realizamos devoluciones. Si no puedes asistir en la fecha elegida, tu boleto sigue siendo válido para cualquier otra fecha en el futuro.</p>'
    },
    {
      q: '¿Hay requisitos de vestimenta especiales?',
      a:
        '<ul><li>Calcetines antideslizantes obligatorios en todos los inflables; pueden comprarse en el lugar.</li><li>Mascotas no permitidas dentro del evento.</li><li>Gestantes: recomendamos no utilizar atracciones inflables.</li></ul>'
    },
    {
      q: '¿Hay edad límite?',
      a:
        '<p>No. Quienes ya pueden desplazarse solos dentro del parque hinchable requieren boleto con costo. Los bebés que solo ingresan en brazos (aún sin movilidad por sí solos) acceden gratis.</p>'
    },
    {
      q: '¿Puedo llevar comida, bebida o equipo de fotografía?',
      a:
        '<ul><li>La política de alimentos y bebidas varía por sede: revisa la página de tu ciudad o consulta el personal.</li><li>Se permite cámara; úsala con precaución y respetando a otros visitantes.</li></ul>'
    },
    {
      q: '¿Dónde compro calcetines antideslizantes Royal en sitio?',
      a: '<p>Los vendemos en cada parada por $5.99 USD.</p>'
    },
    {
      q: '¿Cuánto tiempo guardan objetos perdidos y dónde los recojo?',
      a:
        '<p>Los hallazgos se custodian hasta el último día de la gira Royal Duck en esa misma ubicación; acércate a la entrada o al puesto informado onsite.</p>'
    },
    {
      q: '¿Cómo califico como anunciante o socio en redes?',
      a: '<p>Estamos desarrollando criterios; publicaremos información pronto aquí mismo.</p>'
    },
    {
      q: 'Política ante contracargos',
      a:
        '<p>Solicitar un contracargo en el sistema bancario después de haber recibido tus boletos para un evento que se efectuó o solo se aplazó (no cancelado) puede considerarse abuso del mecanismo. Consecuencias posibles: anulación de créditos, invalidación de entradas y restricciones permanentes con Royal Duck USA.</p>'
    },
    {
      q: '¿Cómo pueden unirse proveedores a Royal Duck?',
      a:
        '<p>¿Quieres formar parte de la experiencia? Recibimos propuestas de camiones de comida, puntos de venta de mercancía, artistas para animar cada jornada y otros formatos de ocio compatibles.</p><p>Completa tus datos en el <a href="vendor-register.html" style="color:var(--teal);font-weight:800">formulario Royal Vibe</a>. Como referencia, las últimos cupos suelen ocuparse hasta unas <strong>ocho semanas</strong> antes de cada ciudad—envía tu solicitud con antelación.</p><p>Las marcas seleccionadas pueden tener visibilidad en correos y redes sociales como socias del programa Fit&nbsp;for&nbsp;Royalty.</p>'
    },
    {
      q: '¿Los proveedores pueden ofrecer descuentos o programas de fidelización?',
      a:
        '<p>Por supuesto: impulsamos alianzas con paquetes VIP, tarjetas físicas tipo sellos de puntos/lealtad, integración digital con cupones desde el punto de venta.</p><ul><li>Ejemplo: “Royal Duck + tu marca = 10 % menos en ese pedido combinado.”</li></ul>'
    },
    {
      q: '¿El lugar es accesible para personas con discapacidad?',
      a:
        '<p>Accesibilidad e inclusión forman parte de nuestra misión en The Royal Duck. Mientras cerramos sedes definimos rutas prácticas, espacios con menor sobrecarga sensorial cuando aplique, recorridos amplios y zonas de descanso con poco estimulación ambiental.</p><p>Nuestro personal recibe capacitación para ayudar a visitantes con necesidades evidentes u ocultas. Si tú o alguien de tu familia requiere ajustes, escríbenos: tus aportaciones guían mejoras desde el primer día.</p>'
    },
    {
      q: '¿Cuáles son las reglas del Tour Pass?',
      a:
        '<p>El Tour Pass solo puede usarse en la sede donde lo compraste: no vale en otra ciudad ni para otras paradas del circuito Royal Duck.</p><p>Expira al finalizar la activación de ese mismo año en esa ubicación, es decir cuando concluye la temporada Royal Duck anunciada para ese local en ese ciclo.</p>'
    }
  ];

  var EN_VOL = [
    {
      q: 'How do I sign up to volunteer?',
      a:
        '<p>Head to our <a href="volunteer.html" style="color:var(--teal);font-weight:800">volunteer page</a> and submit the interest form with your name, contact info, city, and shift preference. Our team will reach out when we’re planning a stop near you.</p>'
    },
    {
      q: 'You must be 18 or older',
      a: '<p>Yes.</p>'
    },
    {
      q: 'What are the requirements to volunteer?',
      a:
        '<ul><li>Each volunteer needs to sign up individually, and you can only claim one spot per shift.</li><li>A signed waiver is required for everyone.</li><li>When you check in for your shift, you’ll leave your photo ID with the on-site volunteer coordinator.</li><li>Your passes must be used during the same weekend you volunteer.</li><li><em>Please note: event session times are subject to change.</em></li></ul>'
    },
    {
      q: 'What kinds of volunteer shifts are there?',
      a:
        '<p>We typically need help during <strong>morning</strong> load-in, <strong>noon</strong> and <strong>afternoon</strong> peak guest hours, and <strong>evening</strong> wrap-up. You can note your preference on the form; final assignments depend on each tour stop’s needs.</p>'
    },
    {
      q: 'What should I wear and bring?',
      a:
        '<p>Come dressed for fun and comfort! While we don’t have a strict shoe requirement, we do recommend closed-toe shoes. We do require socks, since you’ll be stepping into the inflatables. Wear clothes you’re comfortable in and don’t mind getting a little dirty. Since this is a family-friendly event, we ask that outfits stay cool and appropriate (so save the short shorts and spaghetti straps for another day). And don’t forget sunscreen! Bring some along and reapply during your shift—you’ll thank yourself later.</p>'
    },
    {
      q: 'Is training provided?',
      a:
        '<p>Yes. You’ll get a short orientation before your shift covering safety basics, guest flow, and where to check in. Lead volunteers and staff are available throughout the event.</p>'
    },
    {
      q: 'When and how do I get my passes?',
      a:
        '<p>You’ll receive your passes after your volunteer shift ends, when you show up for the event session you want to use them for. Here’s how it works depending on when you volunteer:</p><ul><li><strong>Saturday morning shift</strong> → Use your passes Saturday afternoon or any time Sunday.</li><li><strong>Saturday afternoon shift</strong> → Use your passes anytime Sunday.</li><li><strong>Sunday morning shift</strong> → Grab your passes after your shift ends.</li><li><strong>Sunday 12:00 PM – 4:00 PM shift</strong> → Plan to enjoy the bounce session before your shift starts. Arrive 30–45 minutes early to meet the on-site coordinator, and bring your driver’s license or photo ID—you’ll hand it over in exchange for your passes. Once your shift is done, you’ll get your ID back.</li></ul><p><em>A quick heads-up: event session times are subject to change.</em></p>'
    },
    {
      q: 'What if I need to cancel my shift?',
      a:
        '<p>Life happens! Please reply to your volunteer confirmation email or message us as early as you can so we can adjust staffing. Last-minute no-shows make it harder to keep the park safe and fun for families.</p>'
    }
  ];

  var ES_VOL = [
    {
      q: '¿Cómo me registro como voluntario?',
      a:
        '<p>Ve a nuestra <a href="volunteer.html" style="color:var(--teal);font-weight:800">página de voluntarios</a> y envía el formulario con nombre, contacto, ciudad y preferencia de turno. El equipo escribe cuando haya una parada cerca.</p>'
    },
    {
      q: 'Debes ser mayor de 18 años',
      a: '<p>Sí.</p>'
    },
    {
      q: '¿Cuáles son los requisitos?',
      a:
        '<ul><li>Cada voluntario debe registrarse de forma individual; un cupo por turno.</li><li>Se requiere exención firmada.</li><li>Al llegar entregas identificación oficial al coordinador de voluntarios.</li><li>Las entradas se usan el mismo fin de semana que voluntariado.</li><li><em>Los horarios de sesión pueden cambiar.</em></li></ul>'
    },
    {
      q: '¿Qué tipos de turnos hay?',
      a:
        '<p>Solidario en <strong>carga mañana</strong>, picos del <strong>mediodía</strong> y la <strong>tarde</strong>, y <strong>cierre nocturno</strong>. Anota tu preferencia; la asignación final depende de cada ciudad.</p>'
    },
    {
      q: '¿Qué me pongo y qué llevo?',
      a:
        '<p>Ven cómodo. Recomendamos zapato cerrado; calcetines obligatorios en inflables. Ropa divertida y práctica apta ambiente familiar. Protector solar y reaplicarlo en turno ayuda bastante.</p>'
    },
    {
      q: '¿Hay capacitación?',
      a:
        '<p>Sí — orientación breve antes del turno: seguridad, flujo de invitados y registro.</p>'
    },
    {
      q: '¿Cuándo recibo mis pases?',
      a:
        '<p>Luego de tu turno, al acudir a la sesión que quieras disfrutar. Reglas ejemplo:</p><ul><li><strong>Sábado mañana</strong> → pases esa tarde sábado o cualquier momento domingo.</li><li><strong>Sábado tarde</strong> → pases domingo.</li><li><strong>Domingo mañana</strong> → pases al terminar tu turno.</li><li><strong>Domingo mediodía (12–16h)</strong> → disfruta la sesión antes del turno; llega con 30–45 minutos de margen con identificación.</li></ul><p><em>Horarios sujetos a cambio.</em></p>'
    },
    {
      q: '¿Y si necesito cancelar?',
      a:
        '<p>Avísanos cuanto antes respondiendo tu correo de confirmación. Las ausencias de último minuto ponen difícil operar seguro y divertido.</p>'
    }
  ];

  window.RD_LOCALE_DATA = window.RD_LOCALE_DATA || {};
  window.RD_LOCALE_DATA.faqItems = { en: EN_FAQ, es: ES_FAQ };
  window.RD_LOCALE_DATA.volunteerFaqItems = { en: EN_VOL, es: ES_VOL };
})();
