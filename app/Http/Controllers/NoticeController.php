<?php

namespace App\Http\Controllers;

use App\Models\Notice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoticeController extends Controller
{
    public function index(Request $request)
    {
        $query = Notice::query();

        if ($search = $request->search) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('content', 'like', "%{$search}%");
        }

        if ($year = $request->year) {
            $query->whereYear('created_at', $year);
        }

        if ($month = $request->month) {
            $query->whereMonth('created_at', $month);
        }

        $notices = $query->orderBy('created_at', 'desc')->get();

        return Inertia::render('NoticeIndex', [
            'notices' => $notices,
            'filters' => $request->only(['search', 'year', 'month']),
        ]);
    }
}
