<?php

namespace App\Http\Controllers;

use App\Models\UserList;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserListController extends Controller
{
    /**
     * Add a movie to user's list
     */
    public function store(Request $request)
    {
        $request->validate([
            'movie_id' => 'required|exists:movies,id'
        ]);

        $userList = UserList::firstOrCreate([
            'user_id' => Auth::id(),
            'movie_id' => $request->movie_id
        ]);

        // For Inertia requests, we don't need to return JSON
        return back()->with('success', 'Película agregada a tu lista');
    }

    /**
     * Remove a movie from user's list
     */
    public function destroy(Movie $movie)
    {
        UserList::where('user_id', Auth::id())
                ->where('movie_id', $movie->id)
                ->delete();

        // For Inertia requests, we don't need to return JSON
        return back()->with('success', 'Película removida de tu lista');
    }

    /**
     * Check if movie is in user's list
     */
    public function check(Movie $movie)
    {
        $inList = UserList::where('user_id', Auth::id())
                         ->where('movie_id', $movie->id)
                         ->exists();

        return response()->json([
            'in_list' => $inList
        ]);
    }

    /**
     * Get user's movie list
     */
    public function index()
    {
        $movies = Auth::user()->myMovies()->with('genres')->get();
        
        return inertia('Movies/MyList', [
            'movies' => $movies
        ]);
    }
}
