# TODO

## Inschrijvingen?

## Foto galerij?

## Security

- [x] **Enable HTTPS** – Redirect HTTP→HTTPS via `.htaccess`
- [x] **Disable directory listing** – `Options -Indexes` in `.htaccess`
- [x] **Hide Apache version info** – `ServerSignature Off` in `.htaccess` (`ServerTokens Prod` needs server config)
- [x] **Set security headers** – All set in `.htaccess` (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- [ ] **Disable unused modules** – `a2dismod` anything you don't need (server-side)
- [ ] **Set proper file permissions** – `chmod 644` for files, `755` for directories (server-side)
- [ ] **Keep Apache updated** – `sudo apt update && sudo apt upgrade` (server-side)
- [ ] **Configure a firewall** – Use `ufw` to only allow ports 80, 443, and SSH (server-side)
- [x] **Disable TRACE method** – Blocked via RewriteRule in `.htaccess`
- [x] **Block access to hidden files** – Added in `.htaccess` (except `.well-known`)

---

## ⚡ Performance

- [x] **Enable compression** – Deflate configured in `.htaccess` (HTML, CSS, JS, JSON, SVG, fonts)
- [x] **Enable browser caching** – Expires configured in `.htaccess` (1 week for assets)
- [ ] **Enable HTTP/2** – `a2enmod http2` and add `Protocols h2 http/1.1` (server-side)
- [x] **Enable KeepAlive** – Connection keep-alive header set in `.htaccess`
- [ ] **Minimize .htaccess use** – Consider moving rules to VirtualHost config (server-side)
- [x] **Optimize images** – Converted to WebP, resized oversized logos, added lazy loading
- [ ] **Minify CSS/JS** – Use build tools or online minifiers

---

## 📁 Configuration

- **Use Virtual Hosts** – Even for a single site, configure properly:
  ```apache
  <VirtualHost *:443>
      ServerName example.com
      ServerAlias www.example.com
      DocumentRoot /var/www/example.com/public
      ErrorLog ${APACHE_LOG_DIR}/example-error.log
      CustomLog ${APACHE_LOG_DIR}/example-access.log combined
  </VirtualHost>
  ```
- **Redirect HTTP to HTTPS:**
  ```apache
  <VirtualHost *:80>
      ServerName example.com
      Redirect permanent / https://example.com/
  </VirtualHost>
  ```
- **Redirect www to non-www** (or vice versa) for canonical URLs
- [x] **Custom error pages** – `errors/404.html` and `errors/500.html` created, referenced in `.htaccess`

---

## 📊 Monitoring & Logging

- **Enable logging** and rotate logs with `logrotate`
- **Monitor logs** – Use tools like `GoAccess` for real-time analytics
- **Set up fail2ban** – Protect against brute force and bad bots
- **Enable `mod_status`** for server monitoring (restrict to your IP only)

---

## 🌐 SEO & Accessibility

- [x] **Add a `robots.txt`** file
- [x] **Create a sitemap.xml**
- [x] **Set proper MIME types**
- [x] **Ensure mobile responsiveness** in your HTML/CSS
- [x] **Use clean URLs** with `mod_rewrite`

---

## 🔄 Backup & Maintenance

- **Automate backups** of your site files and configs
- **Set up automatic security updates** – `unattended-upgrades`
- **Auto-renew SSL certs** – Certbot usually sets up a cron job, but verify it works

---

## Quick Wins Checklist

```bash
# Enable essential modules
sudo a2enmod ssl rewrite headers expires deflate http2

# Restart Apache
sudo systemctl restart apache2

# Test your config
sudo apache2ctl configtest
```

**Test your site with:**
- [SSL Labs](https://www.ssllabs.com/ssltest/) – SSL grade
- [SecurityHeaders.com](https://securityheaders.com) – Header analysis
- [PageSpeed Insights](https://pagespeed.web.dev/) – Performance
- [GTmetrix](https://gtmetrix.com/) – Performance details

Would you like me to dive deeper into any of these areas?

## SSL grade

https://www.ssllabs.com/ssltest/

This server does not support Forward Secrecy with the reference browsers. https://blog.qualys.com/ssllabs/2018/02/02/forward-secrecy-authenticated-encryption-and-robot-grading-update

This server supports TLS 1.0 and TLS 1.1. https://blog.qualys.com/ssllabs/2018/11/19/grade-change-for-tls-1-0-and-tls-1-1-protocols

This site works only in browsers with SNI support. 

DNS CAA: no https://blog.qualys.com/ssllabs/2017/03/13/caa-mandated-by-cabrowser-forum

disable TLS 1.0 and 1.1, set preferred for 1.2


## Missing headers

https://securityheaders.com/?q=scoutsvremde.kobecloud.be&followRedirects=on

Strict-Transport-Security	HTTP Strict Transport Security is an excellent feature to support on your site and strengthens your implementation of TLS by getting the User Agent to enforce the use of HTTPS. Recommended value "Strict-Transport-Security: max-age=31536000; includeSubDomains".
Content-Security-Policy	Content Security Policy is an effective measure to protect your site from XSS attacks. By whitelisting sources of approved content, you can prevent the browser from loading malicious assets.

X-Frame-Options	X-Frame-Options tells the browser whether you want to allow your site to be framed or not. By preventing a browser from framing your site you can defend against attacks like clickjacking. Recommended value "X-Frame-Options: SAMEORIGIN".

X-Content-Type-Options	X-Content-Type-Options stops a browser from trying to MIME-sniff the content type and forces it to stick with the declared content-type. The only valid value for this header is "X-Content-Type-Options: nosniff".

Referrer-Policy	Referrer Policy is a new header that allows a site to control how much information the browser includes with navigations away from a document and should be set by all sites.

Permissions-Policy	Permissions Policy is a new header that allows a site to control which features and APIs can be used in the browser.

## Pagespeed

https://pagespeed.web.dev/
https://gtmetrix.com/
