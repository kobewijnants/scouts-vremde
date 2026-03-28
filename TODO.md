# TODO

## Inschrijvingen?

## Foto galerij?

## Security

- [ ] **Disable unused modules** – `a2dismod` anything you don't need (server-side)
- [ ] **Set proper file permissions** – `chmod 644` for files, `755` for directories (server-side)
- [ ] **Keep Apache updated** – `sudo apt update && sudo apt upgrade` (server-side)
- [ ] **Configure a firewall** – Use `ufw` to only allow ports 80, 443, and SSH (server-side)
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
- **Redirect www to non-www** (or vice versa) for canonical URLs

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

- [ ] **Fix `href="#"` dead link on Kapoenen CTA** – "Schrijf nu in" does nothing; should link to `/contact`
- [ ] **Add Info sub-pages to the footer** – Scouting, Subsidies, Uniform, etc. are only in the nav dropdown
- [ ] **Fix empty Kabouters janneman section** – Contains only blank `<p>` tags
- [ ] **Standardize janneman content format** – Currently a mix of images, plain text, blank sections, and PNG screenshots

---

## UI / Code Quality

- [ ] **Add `<html class="light">` consistently** – Only on index.html currently
- [ ] **Standardize `body` class tokens** – Some pages use `bg-background`, others `bg-surface` (same value, inconsistent semantics)
- [ ] **Add `antialiased` to all pages** – Only on janneman.html currently
- [ ] **Add `selection:` classes to janneman.html body** – Missing text selection styling
- [ ] **Fix hero alt text** – Currently AI-generated generic descriptions that don't match actual image content

---

## Animations

- [ ] **Scroll reveal animations** – Fade/slide elements in as they enter the viewport (hero text, cards, sections)
- [ ] **Hover interactions** – Richer hover effects on cards, buttons, and links (scale, color shifts, icon movement)
- [ ] **Page transitions** – Smooth transitions when navigating between pages

---

## SSL grade

- Disable TLS 1.0 and 1.1, set preferred for 1.2
- Enable Forward Secrecy
- Add DNS CAA record

## Missing headers (on test site)

- Verify security headers are being served (HSTS, CSP, X-Frame-Options, etc.)

## Kabouter leiding toevoegen

- [x] Kabouter leiding toegevoegd (Trix, Flobe, Marie, Danae, Floor, Gina)
- [x] Trix Slaets telefoonnummer gecorrigeerd naar 0468516456
