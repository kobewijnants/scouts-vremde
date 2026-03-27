# TODO

## Inschrijvingen?

## Foto galerij?

## Security

- **Enable HTTPS** – Use Let's Encrypt (free) with `certbot` for SSL/TLS certificates
- **Disable directory listing** – `Options -Indexes`
- **Hide Apache version info** – `ServerTokens Prod` and `ServerSignature Off`
- **Set security headers:**
  ```apache
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Content-Security-Policy "default-src 'self'"
  Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "geolocation=(), camera=(), microphone=()"
  ```
- **Disable unused modules** – `a2dismod` anything you don't need
- **Set proper file permissions** – `chmod 644` for files, `755` for directories
- **Keep Apache updated** – `sudo apt update && sudo apt upgrade`
- **Configure a firewall** – Use `ufw` to only allow ports 80, 443, and SSH
- **Disable TRACE method** – `TraceEnable Off`

---

## ⚡ Performance

- **Enable compression:**
  ```apache
  a2enmod deflate
  # Compress HTML, CSS, JS, XML, JSON, fonts, SVGs
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
  ```
- **Enable browser caching:**
  ```apache
  a2enmod expires
  <IfModule mod_expires.c>
      ExpiresActive On
      ExpiresByType image/jpeg "access plus 1 year"
      ExpiresByType image/png "access plus 1 year"
      ExpiresByType text/css "access plus 1 month"
      ExpiresByType application/javascript "access plus 1 month"
  </IfModule>
  ```
- **Enable HTTP/2** – `a2enmod http2` and add `Protocols h2 http/1.1`
- **Enable KeepAlive:**
  ```apache
  KeepAlive On
  MaxKeepAliveRequests 100
  KeepAliveTimeout 5
  ```
- **Minimize .htaccess use** – Put rules in the VirtualHost config instead (`AllowOverride None`) since `.htaccess` is checked on every request
- **Optimize images** – Use WebP format, compress with tools like `imagemagick`
- **Minify CSS/JS** – Use build tools or online minifiers

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
- **Custom error pages:**
  ```apache
  ErrorDocument 404 /errors/404.html
  ErrorDocument 500 /errors/500.html
  ```

---

## 📊 Monitoring & Logging

- **Enable logging** and rotate logs with `logrotate`
- **Monitor logs** – Use tools like `GoAccess` for real-time analytics
- **Set up fail2ban** – Protect against brute force and bad bots
- **Enable `mod_status`** for server monitoring (restrict to your IP only)

---

## 🌐 SEO & Accessibility

- **Add a `robots.txt`** file
- **Create a sitemap.xml**
- **Set proper MIME types**
- **Ensure mobile responsiveness** in your HTML/CSS
- **Use clean URLs** with `mod_rewrite`

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
