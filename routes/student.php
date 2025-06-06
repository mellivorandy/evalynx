<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Student\SubmissionController;
use App\Http\Controllers\Student\ProfileController;
use App\Http\Controllers\Student\DiscussionController;

Route::middleware(['auth', 'verified', 'role:student'])->prefix('student')->name('student.')->group(function () {

    // Pages rendered with Vue via Inertia
    Route::get('/dashboard', fn() => Inertia::render('Student/Dashboard'))->name('dashboard');
    Route::get('/submission', fn() => Inertia::render('Student/Submission'))->name('submission');
    Route::get('/feedback', fn() => Inertia::render('Student/Feedback'))->name('feedback');
    Route::get('/profile', fn() => Inertia::render('Student/Profile'))->name('profile');
    Route::get('/discussion', fn() => Inertia::render('Student/Discussion'))->name('discussion');

    // POST actions handled by controllers
    Route::post('/submission', [SubmissionController::class, 'store'])->name('submission.store');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/discussion', [DiscussionController::class, 'store'])->name('discussion.store');
});
