chown -R www-data:www-data *
 chown -R www-data:www-data /var/www/html

#directories
sudo find /var/www/html -type d -exec chmod 755 {} \;
sudo find /var/www/html -type d -exec chmod 775 {} \;

#Files: 644
sudo find /var/www/html -type f -exec chmod 644 {} \;
sudo find /var/www/html -type f -exec chmod 664 {} \;
