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

        $notices = $query->orderBy('created_at', 'desc')->paginate(5);

        return Inertia::render('NoticeIndex', [
            'notices' => $notices,
            'filters' => $request->only(['search', 'year', 'month']),
        ]);
    }

    public function adminIndex(Request $request)
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

        $notices = $query->orderBy('created_at', 'desc')->paginate(5);

        return Inertia::render('Admin/Notices/Index', [
            'notices' => $notices,
            'auth' => [
                'user' => $request->user(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Notices/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'event_date' => 'nullable|date',
            'prize' => 'nullable|string|max:255',
            'rules' => 'nullable|string',
        ]);

        Notice::create($validated);

        return redirect()->route('admin.notices.index')->with('success', '公告新增成功！');
    }

    public function edit(Notice $notice)
    {
        return Inertia::render('Admin/Notices/Edit', [
            'notice' => $notice,
        ]);
    }

    public function update(Request $request, Notice $notice)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'event_date' => 'nullable|date',
            'prize' => 'nullable|string|max:255',
            'rules' => 'nullable|string',
        ]);

        $notice->update($validated);

        return back()->with('success', '公告已更新！');
    }

    public function destroy(Notice $notice)
    {
        $notice->delete();

        return back()->with('success', '公告已成功刪除。');
    }
}
