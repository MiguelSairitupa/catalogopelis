<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    /**
     * Display the settings page.
     */
    public function index(): Response
    {
        return Inertia::render('Settings');
    }

    /**
     * Update the user's settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'theme' => 'required|in:dark,light,auto',
            'language' => 'required|in:es,en',
            'notifications' => 'boolean',
            'autoplay' => 'boolean',
            'quality' => 'required|in:auto,hd,fhd,4k',
        ]);

        // Here you would typically save the settings to the database
        // For now, we'll just return a success response
        
        return redirect()->route('settings.index')->with('success', 'Configuración actualizada correctamente');
    }
}
