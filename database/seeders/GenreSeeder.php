<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Genre;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genres = [
            [
                'name' => 'Acción',
                'description' => 'Películas llenas de aventura, persecuciones y escenas de combate'
            ],
            [
                'name' => 'Comedia',
                'description' => 'Películas diseñadas para hacer reír y entretener'
            ],
            [
                'name' => 'Drama',
                'description' => 'Películas que exploran emociones profundas y situaciones realistas'
            ],
            [
                'name' => 'Terror',
                'description' => 'Películas diseñadas para asustar y crear suspense'
            ],
            [
                'name' => 'Ciencia Ficción',
                'description' => 'Películas que exploran conceptos futuristas y tecnológicos'
            ],
            [
                'name' => 'Romance',
                'description' => 'Películas centradas en historias de amor y relaciones'
            ],
            [
                'name' => 'Thriller',
                'description' => 'Películas de suspense que mantienen al espectador en tensión'
            ],
            [
                'name' => 'Fantasía',
                'description' => 'Películas con elementos mágicos y mundos imaginarios'
            ],
            [
                'name' => 'Aventura',
                'description' => 'Películas con viajes épicos y exploraciones emocionantes'
            ],
            [
                'name' => 'Animación',
                'description' => 'Películas creadas mediante técnicas de animación'
            ],
            [
                'name' => 'Documental',
                'description' => 'Películas que documentan la realidad y hechos verídicos'
            ],
            [
                'name' => 'Musical',
                'description' => 'Películas que incorporan música y baile como elementos centrales'
            ],
            [
                'name' => 'Western',
                'description' => 'Películas ambientadas en el Viejo Oeste americano'
            ],
            [
                'name' => 'Crimen',
                'description' => 'Películas centradas en actividades criminales y policiales'
            ],
            [
                'name' => 'Biografía',
                'description' => 'Películas basadas en la vida de personas reales'
            ]
        ];

        foreach ($genres as $genre) {
            Genre::firstOrCreate(
                ['name' => $genre['name']],
                ['description' => $genre['description']]
            );
        }
    }
}
