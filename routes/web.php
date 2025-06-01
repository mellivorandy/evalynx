<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NoticeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'notices' => \App\Models\Notice::latest()->take(5)->get(),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/notices', function () {
    return Inertia::render('Notices/Index', [
        'notices' => \App\Models\Notice::orderBy('created_at', 'desc')->get(),
    ]);
});

require __DIR__.'/auth.php';
