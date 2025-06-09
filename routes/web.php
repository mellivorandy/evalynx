<?php

use App\Http\Controllers\TeacherController;
use App\Http\Controllers\WorksController;
use App\Http\Controllers\JudgeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NoticeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Notice;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'notices' => \App\Models\Notice::orderBy('created_at', 'desc')->paginate(5),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/api/notices/all', function () {
    return Notice::orderBy('created_at', 'desc')->get();
});

Route::get('/teacher/my-teams', [TeacherController::class, 'index'])->name('teacher.my-teams');
Route::get('/teacher/dashboard', [TeacherController::class, 'dashboard'])->name('teacher.dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// 建議只保留 resource 路由
Route::resource('judges', JudgeController::class);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/works', [WorksController::class, 'index'])->name('works.index');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('Admin/Dashboard', [
            'notices' => Notice::orderBy('created_at', 'desc')->get(),
        ]);
    })->name('admin.dashboard');

    Route::get('/admin/notices', [NoticeController::class, 'adminIndex'])->name('admin.notices.index');
    Route::get('/notices/create', [NoticeController::class, 'create'])->name('notices.create');
    Route::post('/notices', [NoticeController::class, 'store'])->name('notices.store');
    Route::get('/notices/{notice}/edit', [NoticeController::class, 'edit'])->name('notices.edit');
    Route::put('/notices/{notice}', [NoticeController::class, 'update'])->name('notices.update');
    Route::delete('/notices/{notice}', [NoticeController::class, 'destroy'])->name('notices.destroy');

    Route::resource('teacher', TeacherController::class);
});

require __DIR__ . '/auth.php';
require __DIR__ . '/student.php';
