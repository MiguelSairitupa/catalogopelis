<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Movie;

class Genre extends Model
{
    protected $fillable = ['name', 'description'];

    public function movies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, 'movie_genre');
    }
}
