# 🌤️ Configuración de Cloudinary para Movie Catalog

Este proyecto utiliza **Cloudinary** exclusivamente para el almacenamiento y gestión de imágenes de películas. Las imágenes se almacenan en la nube y son accesibles desde cualquier lugar del mundo.

## 📋 Requisitos Previos

1. **Cuenta de Cloudinary** (gratuita): [Registrarse aquí](https://cloudinary.com/users/register/free)
2. **Credenciales de API** de tu dashboard de Cloudinary

## 🔧 Configuración Paso a Paso

### 1. Obtener Credenciales de Cloudinary

1. Ve a tu [Dashboard de Cloudinary](https://cloudinary.com/console)
2. En la sección **Account Details**, encontrarás:
   - **Cloud Name** (nombre de tu nube)
   - **API Key** (clave de API)
   - **API Secret** (secreto de API - haz clic en "Show" para verlo)

### 2. Configurar Variables de Entorno

Agrega estas líneas a tu archivo `.env`:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=tu_cloud_name_aqui
CLOUDINARY_API_KEY=tu_api_key_aqui
CLOUDINARY_API_SECRET=tu_api_secret_aqui
```

**⚠️ IMPORTANTE:** Reemplaza los valores con tus credenciales reales de Cloudinary.

### 3. Verificar Configuración

Ejecuta el comando de verificación:

```bash
php artisan cloudinary:check
```

Este comando:
- ✅ Verifica que todas las variables estén configuradas
- 🔗 Prueba la conexión con Cloudinary
- 🖼️ Sube una imagen de prueba y la elimina
- 📊 Muestra el estado de la configuración

### 4. Ejemplo de Salida Exitosa

```
🔍 Verificando configuración de Cloudinary...

✅ CLOUDINARY_CLOUD_NAME: mi-proyecto
✅ CLOUDINARY_API_KEY: 123456...
✅ CLOUDINARY_API_SECRET: abcdef...

🔗 Probando conexión con Cloudinary...
✅ Conexión exitosa con Cloudinary!
🖼️  URL de prueba: https://res.cloudinary.com/mi-proyecto/image/upload/v1234567890/movie-catalog/test/connection_test_1234567890.png
🧹 Imagen de prueba eliminada

🎉 Cloudinary está configurado correctamente y listo para usar!
```

## 🎬 Características de Subida de Imágenes

### Configuración Automática
- **Carpeta organizada**: `movie-catalog/posters/`
- **Nombres únicos**: `movie_{timestamp}_{unique_id}`
- **Transformaciones automáticas**:
  - Redimensionado: 500x750px
  - Recorte inteligente: `fill`
  - Calidad optimizada: `auto`
  - Formato optimizado: `auto`
- **Tags**: `movie-poster`, `catalog`
- **URLs seguras**: HTTPS por defecto

### Ejemplo de URL Generada
```
https://res.cloudinary.com/tu-cloud-name/image/upload/c_fill,f_auto,h_750,q_auto,w_500/v1234567890/movie-catalog/posters/movie_1234567890_abc123.jpg
```

## 🚨 Solución de Problemas

### Error: "Cloudinary no está configurado correctamente"
- Verifica que las 3 variables estén en tu `.env`
- Ejecuta `php artisan config:clear` para limpiar caché
- Reinicia tu servidor local

### Error: "Trying to access array offset on null"
- Este error se resuelve con la configuración explícita implementada
- Asegúrate de tener las credenciales correctas
- Verifica tu conexión a internet

### Error: "Invalid API credentials"
- Revisa que las credenciales sean exactas (sin espacios extra)
- Verifica que tu cuenta de Cloudinary esté activa
- Regenera las credenciales si es necesario

## 🔒 Seguridad

- ✅ **API Secret** nunca se expone al frontend
- ✅ **Configuración explícita** en cada subida
- ✅ **URLs seguras** (HTTPS) por defecto
- ✅ **Validación de archivos** antes de subir
- ✅ **Logging detallado** para debugging

## 📊 Límites de Cuenta Gratuita

- **Almacenamiento**: 25GB
- **Transformaciones**: 25,000/mes
- **Ancho de banda**: 25GB/mes
- **Imágenes**: Ilimitadas

Para proyectos grandes, considera actualizar a un plan de pago.

## 🎯 Beneficios de Usar Cloudinary

1. **🌍 Acceso global**: CDN mundial para carga rápida
2. **🔄 Transformaciones automáticas**: Optimización en tiempo real
3. **📱 Responsive**: Imágenes adaptativas por dispositivo
4. **⚡ Performance**: Carga optimizada y caché inteligente
5. **🛡️ Seguridad**: Almacenamiento seguro en la nube
6. **📈 Escalabilidad**: Crece con tu proyecto

---

**¿Necesitas ayuda?** Ejecuta `php artisan cloudinary:check` para diagnosticar problemas.
