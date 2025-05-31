<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notice;
use Inertia\Inertia;

class NoticeController extends Controller
{
    public function show($id)
    {
        $notice = Notice::findOrFail($id);
        return Inertia::render('Notices/Show', [
            'notice' => $notice,
        ]);
    }

    public function index()
    {
        $notices = Notice::latest()->get();

        return Inertia::render('Notices/Index', [
            'notices' => $notices,
        ]);
    }
}
