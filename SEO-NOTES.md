# SEO setup (Royal Duck static site)

## What was added

- **Meta**: unique `<title>` and `<meta name="description">` on `index.html`, `home.html`, and `tickets.html`
- **`robots.txt`**: allows crawling + points to the sitemap
- **`sitemap.xml`**: lists `home.html`, each major **section** (`#home`, `#events`, `#about`, `#faq`, `#mail`, `#contact`), **`volunteer.html`**, `tickets.html`, and **`privacy.html`**
- **Canonical URLs** + **`hreflang="en"`** on home and tickets
- **Open Graph & Twitter Card** tags for sharing previews
- **JSON-LD**: `Organization` + `WebSite` on home; `WebPage` on tickets, privacy, and volunteer
- **Privacy**: `privacy.html` policy text + bottom **cookie / storage consent** banner (`privacy-banner.css` / `privacy-banner.js`) on `home.html` and `tickets.html`
- **Semantic HTML**: `<main id="main-content">` wraps primary content on the home page
- **Accessibility / SEO**: `aria-label` on nav; improved `alt` text on key images; fixed logo alt on tickets page
- **Performance**: `preconnect` for Google Fonts

## Before you go live

1. **Domain** — All absolute URLs use `https://www.royalduckusa.com`. If your real domain is different (e.g. `royalduck.ca` or no `www`), search/replace across:
   - `home.html` (canonical, OG, JSON-LD)
   - `tickets.html` (same)
   - `index.html` (canonical)
   - `robots.txt` and `sitemap.xml`

2. **Submit sitemap** in Google Search Console and Bing Webmaster Tools:  
   `https://YOUR-DOMAIN/sitemap.xml`

3. **Social image** — `og:image` / `twitter:image` use `The Royal Duck Final_Stacked wordmark.png`. For richer link previews, consider a dedicated 1200×630 social image and update those tags.

4. **Duplicate URLs** — If you serve the same page at `/` and `/home.html`, pick one canonical and redirect the other.

5. **Section URLs (`#events`, `#faq`, …)** — These point to anchors on `home.html`. Search engines may treat them as the same page as `home.html` but still use them to discover deep links. Your in-page nav already links to these IDs.

6. **HTTPS** — Ensure the live site uses valid SSL (required for good SEO and for `https://` in meta tags).
