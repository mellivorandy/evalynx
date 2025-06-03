<?php

use App\Http\Controllers\JudgeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NoticeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'notices' => \App\Models\Notice::orderBy('created_at', 'desc')->paginate(5),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/judges', [JudgeController::class, 'index'])->name('judges');
Route::get('/judges/create', [JudgeController::class, 'create'])->name('judges.create');
Route::post('/scores', [JudgeController::class, 'store'])->name('scores.store');
Route::post('/edit', [JudgeController::class, 'edit'])->name('scores.edit');
Route::post('/judge', [JudgeController::class, 'apiStore']);
Route::resource('judges', JudgeController::class);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
