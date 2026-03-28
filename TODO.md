# TODO

## Inschrijvingen?

## Foto galerij?

## Security

- [ ] **Disable unused modules** – `a2dismod` anything you don't need (server-side)
- [ ] **Set proper file permissions** – `chmod 644` for files, `755` for directories (server-side)
- [ ] **Keep Apache updated** – `sudo apt update && sudo apt upgrade` (server-side)
- [ ] **Configure a firewall** – Use `ufw` to only allow ports 80, 443, and SSH (server-side)
- [ ] **Move inline scripts to external JS files** – Allows removing `'unsafe-inline'` from CSP `script-src` (nav active-page script, janneman toggle, error page year)
- [ ] **Remove `fonts.googleapis.com` from CSP `script-src`** – Google Fonts doesn't serve scripts; only needed in `style-src`
- [ ] **Add `object-src 'none'` to CSP** – Blocks plugin content (Flash, etc.)
- [ ] **Add `base-uri 'self'` to CSP** – Prevents base tag injection attacks
- [ ] **Fix 400 error mapping** – Currently maps to 404 page ("Pagina niet gevonden") which is semantically wrong

---

## Performance

- [ ] **Enable HTTP/2** – `a2enmod http2` and add `Protocols h2 http/1.1` (server-side)
- [ ] **Minimize .htaccess use** – Consider moving rules to VirtualHost config (server-side)
- [ ] **Minify CSS/JS** – Use build tools or online minifiers
- [ ] **Add `preconnect` hints for Google Fonts** – Add `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` to all pages
- [ ] **Combine Google Fonts into one request** – Merge Plus Jakarta Sans/Manrope and Material Symbols into a single `<link>`
- [ ] **Add `fetchpriority="high"` on hero LCP images** – Tell the browser to prioritize the main hero image on each page
- [ ] **Preload hero images** – Add `<link rel="preload">` for hero images to improve LCP
- [ ] **Convert Verkenners janneman PNGs to WebP** – Two PNG screenshots on tak-verkenners.html are the only non-WebP images left

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

- [ ] **Fill in `og:description` and `og:image` on all pages** – Social sharing cards currently show no image or description
- [ ] **Fix `og:url` to use clean URLs** – Tak pages still reference old `/pages/*.html` paths
- [ ] **Add `<link rel="canonical">` on all pages**
- [ ] **Add structured data (JSON-LD)** – `Organization` schema with address, phone, social links for rich search results
- [ ] **Add `<lastmod>` dates to sitemap.xml**
- [ ] **Fix Lighthouse CI to scan canonical URLs** – Currently scans `/pages/takken.html` instead of `/takken`
- [ ] **Fill in missing `<meta name="description">` on all pages**

---

## Accessibility

- [ ] **Make desktop "Info" dropdown keyboard-accessible** – Currently hover-only, invisible to keyboard/screen reader users (add `:focus-within` or JS)
- [ ] **Add `aria-label` and `aria-expanded` to mobile hamburger button** – Screen readers currently announce a nameless button
- [ ] **Add `aria-hidden="true"` to decorative Material Symbol icons** – Icons like `arrow_forward` in links get read aloud
- [ ] **Fix low-contrast "Totem wordt aangevuld" text** – `text-secondary/50` likely fails WCAG AA
- [ ] **Fix low-contrast footer copyright text** – `text-[#ffb273]/40` on dark background
- [ ] **Fix heading hierarchy** – h2→h5 jump on index.html, h1→h3 on contact.html
- [ ] **Add `Escape` key handler to close mobile menu**

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

## SSL grade

- Disable TLS 1.0 and 1.1, set preferred for 1.2
- Enable Forward Secrecy
- Add DNS CAA record

## Missing headers (on test site)

- Verify security headers are being served (HSTS, CSP, X-Frame-Options, etc.)
