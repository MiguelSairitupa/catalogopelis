<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Genre;
use Illuminate\Http\Request;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class MovieController extends Controller
{
    // Mostrar listado de películas
    public function index()
    {
        $movies = Movie::with('genres')->get();
        $genres = Genre::all();
        return inertia('Movies/Index', compact('movies', 'genres'));
    }

    // Mostrar formulario de creación
    public function create()
    {
        $genres = Genre::all();
        return inertia('Movies/Create', compact('genres'));
    }

    // Almacenar nueva película
    public function store(Request $request)
    {
        try {
            // Validación básica primero
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'release_date' => 'required|date',
                'duration' => 'required|integer|min:1',
                'poster' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
                'trailer_url' => 'nullable|url',
                'rating' => 'nullable|numeric|between:1,10',
                'genres' => 'required|array|min:1'
            ]);

            // Verificar géneros individualmente
            $genreIds = $request->input('genres', []);
            foreach ($genreIds as $genreId) {
                if (!Genre::find($genreId)) {
                    return back()->withErrors(['genres' => 'Uno o más géneros seleccionados no son válidos.']);
                }
            }

            // Verificar archivo
            if (!$request->hasFile('poster') || !$request->file('poster')->isValid()) {
                return back()->withErrors(['poster' => 'El archivo de póster es requerido y debe ser válido.']);
            }

            // Crear datos de película
            $movieData = [
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'release_date' => $request->input('release_date'),
                'duration' => (int) $request->input('duration'),
                'trailer_url' => $request->input('trailer_url'),
                'rating' => $request->input('rating') ? (float) $request->input('rating') : null,
            ];

            // Verificar configuración de Cloudinary
            if (!env('CLOUDINARY_CLOUD_NAME') || !env('CLOUDINARY_API_KEY') || !env('CLOUDINARY_API_SECRET')) {
                return back()->withErrors([
                    'poster' => 'Cloudinary no está configurado correctamente. Por favor, configura las variables CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET en tu archivo .env'
                ]);
            }

            // Subir imagen a Cloudinary usando cURL directo para evitar errores de la librería
            try {
                $posterFile = $request->file('poster');
                $cloudName = env('CLOUDINARY_CLOUD_NAME');
                $apiKey = env('CLOUDINARY_API_KEY');
                $apiSecret = env('CLOUDINARY_API_SECRET');
                
                // Preparar datos para la subida
                $timestamp = time();
                $publicId = 'movie_' . $timestamp . '_' . uniqid();
                $folder = 'movie-catalog/posters';
                
                // Crear signature para autenticación
                $paramsToSign = [
                    'folder' => $folder,
                    'public_id' => $publicId,
                    'timestamp' => $timestamp,
                    'transformation' => 'c_fill,h_750,q_auto,w_500'
                ];
                
                ksort($paramsToSign);
                $stringToSign = '';
                foreach ($paramsToSign as $key => $value) {
                    $stringToSign .= $key . '=' . $value . '&';
                }
                $stringToSign = rtrim($stringToSign, '&') . $apiSecret;
                $signature = sha1($stringToSign);
                
                // Preparar datos para cURL
                $postData = [
                    'file' => new \CURLFile($posterFile->getRealPath(), $posterFile->getMimeType(), $posterFile->getClientOriginalName()),
                    'api_key' => $apiKey,
                    'timestamp' => $timestamp,
                    'signature' => $signature,
                    'folder' => $folder,
                    'public_id' => $publicId,
                    'transformation' => 'c_fill,h_750,q_auto,w_500'
                ];
                
                // Realizar subida con cURL
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, "https://api.cloudinary.com/v1_1/{$cloudName}/image/upload");
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                
                $response = curl_exec($ch);
                $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                curl_close($ch);
                
                if ($httpCode !== 200) {
                    throw new \Exception('Error HTTP ' . $httpCode . ': ' . $response);
                }
                
                $result = json_decode($response, true);
                if (!$result || !isset($result['secure_url'])) {
                    throw new \Exception('Respuesta inválida de Cloudinary: ' . $response);
                }
                
                $movieData['poster_path'] = $result['secure_url'];
                
            } catch (\Exception $e) {
                \Log::error('Cloudinary upload error: ' . $e->getMessage(), [
                    'file' => $e->getFile(),
                    'line' => $e->getLine()
                ]);
                return back()->withErrors([
                    'poster' => 'Error al subir la imagen a Cloudinary: ' . $e->getMessage()
                ]);
            }

            // Crear película
            $movie = Movie::create($movieData);
            
            // Sincronizar géneros
            $movie->genres()->sync($genreIds);

            return redirect()->route('movies.index')
                ->with('success', 'Película creada exitosamente.');
                
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            \Log::error('Error creating movie: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);
            return back()->withErrors(['error' => 'Error inesperado al crear la película. Por favor, inténtalo de nuevo.'])
                        ->withInput();
        }
    }

    // Mostrar detalles de película
    public function show(Movie $movie)
    {
        return inertia('Movies/Show', compact('movie'));
    }

    // Mostrar formulario de edición
    public function edit(Movie $movie)
    {
        $genres = Genre::all();
        $movie->load('genres');
        return inertia('Movies/Edit', compact('movie', 'genres'));
    }

    // Actualizar película
    public function update(Request $request, Movie $movie)
    {
        try {
            // Validación básica
            $request->validate([
                'title' => 'required|string|max:255|unique:movies,title,' . $movie->id,
                'description' => 'required|string',
                'release_date' => 'required|date',
                'duration' => 'required|integer|min:1',
                'poster' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
                'trailer_url' => 'nullable|url',
                'rating' => 'nullable|numeric|between:1,10',
                'genres' => 'required|array|min:1'
            ]);

            // Verificar géneros individualmente
            $genreIds = $request->input('genres', []);
            foreach ($genreIds as $genreId) {
                if (!Genre::find($genreId)) {
                    return back()->withErrors(['genres' => 'Uno o más géneros seleccionados no son válidos.']);
                }
            }

            // Crear datos de película
            $movieData = [
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'release_date' => $request->input('release_date'),
                'duration' => (int) $request->input('duration'),
                'trailer_url' => $request->input('trailer_url'),
                'rating' => $request->input('rating') ? (float) $request->input('rating') : null,
            ];

            // Actualizar imagen si se proporciona
            if ($request->hasFile('poster') && $request->file('poster')->isValid()) {
                // Verificar configuración de Cloudinary
                if (!env('CLOUDINARY_CLOUD_NAME') || !env('CLOUDINARY_API_KEY') || !env('CLOUDINARY_API_SECRET')) {
                    return back()->withErrors([
                        'poster' => 'Cloudinary no está configurado correctamente. Por favor, configura las variables CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET en tu archivo .env'
                    ]);
                }

                // Subir imagen a Cloudinary usando cURL directo
                try {
                    $posterFile = $request->file('poster');
                    $cloudName = env('CLOUDINARY_CLOUD_NAME');
                    $apiKey = env('CLOUDINARY_API_KEY');
                    $apiSecret = env('CLOUDINARY_API_SECRET');
                    
                    // Preparar datos para la subida
                    $timestamp = time();
                    $publicId = 'movie_' . $timestamp . '_' . uniqid();
                    $folder = 'movie-catalog/posters';
                    
                    // Crear signature para autenticación
                    $paramsToSign = [
                        'folder' => $folder,
                        'public_id' => $publicId,
                        'timestamp' => $timestamp,
                        'transformation' => 'c_fill,h_750,q_auto,w_500'
                    ];
                    
                    ksort($paramsToSign);
                    $stringToSign = '';
                    foreach ($paramsToSign as $key => $value) {
                        $stringToSign .= $key . '=' . $value . '&';
                    }
                    $stringToSign = rtrim($stringToSign, '&') . $apiSecret;
                    $signature = sha1($stringToSign);
                    
                    // Preparar datos para cURL
                    $postData = [
                        'file' => new \CURLFile($posterFile->getRealPath(), $posterFile->getMimeType(), $posterFile->getClientOriginalName()),
                        'api_key' => $apiKey,
                        'timestamp' => $timestamp,
                        'signature' => $signature,
                        'folder' => $folder,
                        'public_id' => $publicId,
                        'transformation' => 'c_fill,h_750,q_auto,w_500'
                    ];
                    
                    // Realizar subida con cURL
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, "https://api.cloudinary.com/v1_1/{$cloudName}/image/upload");
                    curl_setopt($ch, CURLOPT_POST, true);
                    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                    
                    $response = curl_exec($ch);
                    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                    curl_close($ch);
                    
                    if ($httpCode !== 200) {
                        throw new \Exception('Error HTTP ' . $httpCode . ': ' . $response);
                    }
                    
                    $result = json_decode($response, true);
                    if (!$result || !isset($result['secure_url'])) {
                        throw new \Exception('Respuesta inválida de Cloudinary: ' . $response);
                    }
                    
                    $movieData['poster_path'] = $result['secure_url'];
                    
                } catch (\Exception $e) {
                    \Log::error('Cloudinary upload error: ' . $e->getMessage(), [
                        'file' => $e->getFile(),
                        'line' => $e->getLine()
                    ]);
                    return back()->withErrors([
                        'poster' => 'Error al subir la imagen a Cloudinary: ' . $e->getMessage()
                    ]);
                }
            }

            $movie->update($movieData);
            
            // Sincronizar géneros
            $movie->genres()->sync($genreIds);

            return redirect()->route('movies.index')
                ->with('success', 'Película actualizada exitosamente.');
                
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            \Log::error('Error updating movie: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);
            return back()->withErrors(['error' => 'Error inesperado al actualizar la película. Por favor, inténtalo de nuevo.'])
                        ->withInput();
        }
    }

    // Eliminar película
    public function destroy(Movie $movie)
    {
        $movie->delete();
        return redirect()->route('movies.index');
    }
}
