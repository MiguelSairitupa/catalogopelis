<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class CheckCloudinaryConfig extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cloudinary:check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check Cloudinary configuration and test connection';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔍 Verificando configuración de Cloudinary...');
        $this->newLine();

        // Verificar variables de entorno
        $cloudName = env('CLOUDINARY_CLOUD_NAME');
        $apiKey = env('CLOUDINARY_API_KEY');
        $apiSecret = env('CLOUDINARY_API_SECRET');

        if (!$cloudName) {
            $this->error('❌ CLOUDINARY_CLOUD_NAME no está configurado');
        } else {
            $this->info("✅ CLOUDINARY_CLOUD_NAME: {$cloudName}");
        }

        if (!$apiKey) {
            $this->error('❌ CLOUDINARY_API_KEY no está configurado');
        } else {
            $this->info("✅ CLOUDINARY_API_KEY: " . substr($apiKey, 0, 6) . "...");
        }

        if (!$apiSecret) {
            $this->error('❌ CLOUDINARY_API_SECRET no está configurado');
        } else {
            $this->info("✅ CLOUDINARY_API_SECRET: " . substr($apiSecret, 0, 6) . "...");
        }

        $this->newLine();

        if (!$cloudName || !$apiKey || !$apiSecret) {
            $this->error('🚫 Configuración incompleta. Por favor, configura todas las variables de Cloudinary en tu archivo .env');
            $this->newLine();
            $this->info('📝 Agrega estas líneas a tu archivo .env:');
            $this->line('CLOUDINARY_CLOUD_NAME=tu_cloud_name');
            $this->line('CLOUDINARY_API_KEY=tu_api_key');
            $this->line('CLOUDINARY_API_SECRET=tu_api_secret');
            $this->newLine();
            $this->info('🌐 Obtén estas credenciales desde: https://cloudinary.com/console');
            return 1;
        }

        // Probar conexión
        try {
            $this->info('🔗 Probando conexión con Cloudinary...');
            
            // Configurar Cloudinary explícitamente
            \Cloudinary\Configuration\Configuration::instance([
                'cloud' => [
                    'cloud_name' => $cloudName,
                    'api_key' => $apiKey,
                    'api_secret' => $apiSecret
                ],
                'url' => [
                    'secure' => true
                ]
            ]);

            // Probar con una imagen de prueba (crear un pixel transparente)
            $testImage = imagecreate(1, 1);
            imagecolortransparent($testImage, imagecolorallocate($testImage, 0, 0, 0));
            
            $tempFile = tempnam(sys_get_temp_dir(), 'cloudinary_test') . '.png';
            imagepng($testImage, $tempFile);
            imagedestroy($testImage);

            $result = Cloudinary::upload($tempFile, [
                'folder' => 'movie-catalog/test',
                'public_id' => 'connection_test_' . time(),
                'tags' => ['test', 'connection-check']
            ]);

            unlink($tempFile);

            $this->info('✅ Conexión exitosa con Cloudinary!');
            $this->info("🖼️  URL de prueba: " . $result->getSecurePath());
            
            // Limpiar imagen de prueba
            try {
                Cloudinary::destroy($result->getPublicId());
                $this->info('🧹 Imagen de prueba eliminada');
            } catch (\Exception $e) {
                $this->warn('⚠️  No se pudo eliminar la imagen de prueba: ' . $e->getMessage());
            }

            $this->newLine();
            $this->info('🎉 Cloudinary está configurado correctamente y listo para usar!');
            
            return 0;

        } catch (\Exception $e) {
            $this->error('❌ Error al conectar con Cloudinary: ' . $e->getMessage());
            $this->newLine();
            $this->info('🔧 Posibles soluciones:');
            $this->line('1. Verifica que las credenciales sean correctas');
            $this->line('2. Asegúrate de tener conexión a internet');
            $this->line('3. Verifica que tu cuenta de Cloudinary esté activa');
            $this->line('4. Revisa los logs para más detalles');
            
            return 1;
        }
    }
}
