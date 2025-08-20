# Imagen base con PHP 8.2 y Apache
FROM php:8.2-apache

# Instalar extensiones y dependencias necesarias
RUN apt-get update && apt-get install -y \
    libpq-dev zip unzip git curl libzip-dev npm \
    && docker-php-ext-install pdo pdo_pgsql pdo_mysql

# Configurar Apache para que use /public como raíz
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf \
    && sed -i 's|/var/www/|/var/www/html/public|g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
    && a2enmod rewrite

# Copiar todo el proyecto
COPY ./ /var/www/html/
WORKDIR /var/www/html/

# Instalar Composer (desde imagen oficial)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Instalar dependencias de Laravel
RUN composer install --optimize-autoloader --no-dev

# Compilar assets (React + Inertia)
RUN npm install && npm run build

# Ajustar permisos de Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Copiar script de arranque para migraciones
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Usar el script como entrypoint
# ENTRYPOINT ["docker-entrypoint.sh"]

# Exponer puerto 80
EXPOSE 80
