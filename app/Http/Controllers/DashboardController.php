<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Movie;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $newReleases = Movie::with('genres')->latest()->take(10)->get();
        $trending = Movie::with('genres')->inRandomOrder()->take(10)->get();
        
        // Get user's movie list if authenticated
        $myList = [];
        if (Auth::check()) {
            $myList = Auth::user()->myMovies()->with('genres')->get();
        }

        return Inertia::render('Dashboard', [
            'newReleases' => $newReleases,
            'trending' => $trending,
            'myList' => $myList,
        ]);
    }
}
