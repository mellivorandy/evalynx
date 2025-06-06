<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Student\DashboardController;
use App\Http\Controllers\Student\SubmissionController;
use App\Http\Controllers\Student\FeedbackController;
use App\Http\Controllers\Student\ProfileController;
use App\Http\Controllers\Student\DiscussionController;

Route::middleware(['auth', 'verified', 'role:student'])->prefix('student')->name('student.')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/submission', [SubmissionController::class, 'index'])->name('submission');
    Route::post('/submission', [SubmissionController::class, 'store'])->name('submission.store');

    Route::get('/feedback', [FeedbackController::class, 'index'])->name('feedback');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('/discussion', [DiscussionController::class, 'index'])->name('discussion');
    Route::post('/discussion', [DiscussionController::class, 'store'])->name('discussion.store');
});
