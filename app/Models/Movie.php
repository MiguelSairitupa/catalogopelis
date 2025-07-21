<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Genre;

class Movie extends Model
{
    protected $fillable = [
        'title',
        'description',
        'release_date',
        'duration',
        'poster_path',
        'trailer_url',
        'rating'
    ];

    protected $casts = [
        'release_date' => 'date',
        'rating' => 'float'
    ];

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class, 'movie_genre');
    }
}
