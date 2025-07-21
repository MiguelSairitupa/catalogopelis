<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\UserListController;
use App\Http\Controllers\GenreController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('LandingPage');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::resource('movies', MovieController::class);
Route::resource('genres', GenreController::class);

// API routes for user list functionality
Route::middleware(['auth', 'web'])->prefix('api')->group(function () {
    Route::post('/user-list', [UserListController::class, 'store']);
    Route::delete('/user-list/{movie}', [UserListController::class, 'destroy']);
    Route::get('/user-list/check/{movie}', [UserListController::class, 'check']);
});

// User list page route
Route::middleware('auth')->group(function () {
    Route::get('/my-list', [UserListController::class, 'index'])->name('movies.my-list');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingsController::class, 'update'])->name('settings.update');
});

require __DIR__.'/auth.php';
