# TODO

## Inschrijvingen?

## Security

- [x] **Move inline scripts to external JS files** – Allows removing `'unsafe-inline'` from CSP `script-src` (nav active-page script, janneman toggle, error page year)
- [x] **Remove `fonts.googleapis.com` from CSP `script-src`** – Google Fonts doesn't serve scripts; only needed in `style-src`
- [x] **Add `object-src 'none'` to CSP** – Blocks plugin content (Flash, etc.)
- [x] **Add `base-uri 'self'` to CSP** – Prevents base tag injection attacks
- [x] **Fix 400 error mapping** – Currently maps to 404 page ("Pagina niet gevonden") which is semantically wrong

---

## Performance

- [ ] **Enable HTTP/2** – `a2enmod http2` and add `Protocols h2 http/1.1` (server-side)
- [ ] **Minimize .htaccess use** – Consider moving rules to VirtualHost config (server-side)
- [ ] **Minify CSS/JS** – Use build tools or online minifiers
- [x] **Add `preconnect` hints for Google Fonts** – Add `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` to all pages
- [x] **Combine Google Fonts into one request** – Merge Plus Jakarta Sans/Manrope and Material Symbols into a single `<link>`
- [x] **Add `fetchpriority="high"` on hero LCP images** – Tell the browser to prioritize the main hero image on each page
- [x] **Preload hero images** – Add `<link rel="preload">` for hero images to improve LCP
- [x] **Convert Verkenners janneman PNGs to WebP** – Two PNG screenshots on tak-verkenners.html are the only non-WebP images left

---

## Configuration

- **Use Virtual Hosts** – Even for a single site, configure properly
- [x] **Redirect www to non-www** (or vice versa) for canonical URLs – Vhost already redirects apex → `www`; aligned `sitemap.xml`, `robots.txt`, and all `canonical`/`og:url` tags to `https://www.scoutsvremde.be` to match (2026-09-26)
- [ ] **Remove `/subsidies` → `/tegemoetkomingen` redirect** (not before 2026-10-26) – Page was renamed 2026-09-26; once Google reindexes the new URL and traffic to the old one drops off, delete the `RewriteRule ^subsidies$ /tegemoetkomingen` line from `.htaccess`

---

## Monitoring & Logging

- **Enable logging** and rotate logs with `logrotate`
- **Monitor logs** – Use tools like `GoAccess` for real-time analytics
- **Set up fail2ban** – Protect against brute force and bad bots
- **Enable `mod_status`** for server monitoring (restrict to your IP only)

---

## Backup & Maintenance

- **Automate backups** of your site files and configs
- **Set up automatic security updates** – `unattended-upgrades`
- **Auto-renew SSL certs** – Certbot usually sets up a cron job, but verify it works

---

## SEO

- [x] **Fill in `og:description` and `og:image` on all pages** – Social sharing cards currently show no image or description
- [x] **Fix `og:url` to use clean URLs** – Uses SSI `SITE_URL` variable from .htaccess
- [x] **Add `<link rel="canonical">` on all pages**
- [x] **Add structured data (JSON-LD)** – `Organization` schema on homepage with address, email, social links
- [x] **Add `<lastmod>` dates to sitemap.xml** – Also added missing tak-leiding entry
- [x] **Fix Lighthouse CI to scan canonical URLs** – Now scans `/takken` instead of `/pages/takken.html`
- [x] **Fill in missing `<meta name="description">` on all pages**
- [ ] **Import site into Bing Webmaster Tools** – Use the "Import from Google Search Console" feature (~2 min once GSC is verified) to speed up Bing/DuckDuckGo indexing, since DuckDuckGo sources much of its index from Bing

---

## Accessibility

- [x] **Make desktop "Info" dropdown keyboard-accessible** – Added `group-focus-within` classes for keyboard access
- [x] **Add `aria-label` and `aria-expanded` to mobile hamburger button** – Dynamic aria-expanded + label updates in nav.js
- [x] **Add `aria-hidden="true"` to decorative Material Symbol icons** – 162 icons updated across 23 files
- [x] **Fix low-contrast "Totem wordt aangevuld" text** – Changed from `text-secondary/50` to `text-on-surface-variant`
- [x] **Fix low-contrast footer copyright text** – Changed from `/40` to `/70` opacity
- [x] **Fix heading hierarchy** – h5→h3 on index.html events, h3→h2 on contact.html groepsleiding
- [x] **Add `Escape` key handler to close mobile menu** – Closes menu and returns focus to hamburger button

---

## UX

- [x] **Fix `href="#"` dead link on Kapoenen CTA** – Now links to `/contact`
- [x] **Add Info sub-pages to the footer** – Added Scouting, Nieuwe leden, Uniform, Subsidies, Scouting op maat
- [x] **Fix empty Kabouters janneman section** – Now uses uploaded janneman images
- [x] **Standardize janneman content format** – All tak pages now use consistent webp image format

---

## UI / Code Quality

- [x] **Add `<html class="light">` consistently** – Added to all 24 pages
- [x] **Standardize `body` class tokens** – All pages now use `bg-surface text-on-surface`
- [x] **Add `antialiased` to all pages** – Added to all 24 pages
- [x] **Add `selection:` classes consistently** – Added to janneman.html and takken.html
- [x] **Fix hero alt text** – Rewritten based on actual image content for all 10 hero images

---

## Animations

- [x] **Scroll reveal animations** – Fade/slide elements in as they enter the viewport (hero text, cards, sections)
- [x] **Hover interactions** – Richer hover effects on cards, buttons, and links (scale, color shifts, icon movement)
- [x] **Page transitions** – Smooth transitions when navigating between pages

---

## SSL grade

- Disable TLS 1.0 and 1.1, set preferred for 1.2
- Enable Forward Secrecy
- Add DNS CAA record

## Missing headers (on test site)

- Verify security headers are being served (HSTS, CSP, X-Frame-Options, etc.)

## My TODO's

- [x] review apache browser caching settings
- setup inschrijvingen pagina + homepagina link

## Kabouter leiding toevoegen

- [x] Kabouter leiding toegevoegd (Trix, Flobe, Marie, Danae, Floor, Gina)
- [x] Trix Slaets telefoonnummer gecorrigeerd naar 0468516456
