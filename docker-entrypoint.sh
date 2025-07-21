#!/bin/sh

# Esperar unos segundos para asegurarse de que PostgreSQL esté disponible
sleep 5

# Ejecutar migraciones de Laravel (si falla, continuar para no detener el contenedor)
php artisan migrate --force || true

# Iniciar Apache para servir Laravel
exec apache2-foreground
