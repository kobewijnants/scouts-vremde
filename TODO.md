# TODO

## Inschrijvingen?

## Foto galerij?

## Security

- [ ] **Disable unused modules** – `a2dismod` anything you don't need (server-side)
- [ ] **Set proper file permissions** – `chmod 644` for files, `755` for directories (server-side)
- [ ] **Keep Apache updated** – `sudo apt update && sudo apt upgrade` (server-side)
- [ ] **Configure a firewall** – Use `ufw` to only allow ports 80, 443, and SSH (server-side)

---

## Performance

- [ ] **Enable HTTP/2** – `a2enmod http2` and add `Protocols h2 http/1.1` (server-side)
- [ ] **Minimize .htaccess use** – Consider moving rules to VirtualHost config (server-side)
- [ ] **Minify CSS/JS** – Use build tools or online minifiers

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

## SSL grade

- Disable TLS 1.0 and 1.1, set preferred for 1.2
- Enable Forward Secrecy
- Add DNS CAA record

## Missing headers (on test site)

- Verify security headers are being served (HSTS, CSP, X-Frame-Options, etc.)
