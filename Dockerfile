# Imagen base con PHP 8.2 y Apache
FROM php:8.2-apache

# Instalar extensiones y dependencias
RUN apt-get update && apt-get install -y \
    libpq-dev zip unzip git curl libzip-dev npm \
    && docker-php-ext-install pdo pdo_pgsql

# Configurar Apache para Laravel (activar mod_rewrite)
RUN a2enmod rewrite
COPY ./ /var/www/html/
WORKDIR /var/www/html/

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install --optimize-autoloader --no-dev

# Instalar Node y compilar React (Inertia)
RUN npm install && npm run build

# Configurar Apache para que use /var/www/html/public como raíz
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf \
    && sed -i 's|/var/www/|/var/www/html/public|g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Establecer permisos de storage y cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Exponer puerto 80
EXPOSE 80

CMD ["apache2-foreground"]