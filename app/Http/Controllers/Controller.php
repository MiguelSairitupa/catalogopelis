<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function showHomePage()
    {
        return Inertia::render('Home');
    }
}