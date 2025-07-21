<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $genres = Genre::withCount('movies')->orderBy('name')->get();
        return Inertia::render('Genres/Index', compact('genres'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Genres/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:genres',
            'description' => 'nullable|string|max:500'
        ]);

        Genre::create($validated);

        return redirect()->route('genres.index')
            ->with('success', 'Género creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Genre $genre)
    {
        $genre->load(['movies' => function($query) {
            $query->with('genres')->latest()->take(12);
        }]);
        
        return Inertia::render('Genres/Show', compact('genre'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Genre $genre)
    {
        return Inertia::render('Genres/Edit', compact('genre'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Genre $genre)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:genres,name,' . $genre->id,
            'description' => 'nullable|string|max:500'
        ]);

        $genre->update($validated);

        return redirect()->route('genres.index')
            ->with('success', 'Género actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Genre $genre)
    {
        $genre->delete();

        return redirect()->route('genres.index')
            ->with('success', 'Género eliminado exitosamente.');
    }
}
