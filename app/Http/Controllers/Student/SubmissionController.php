<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubmissionController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $work = $user->works()->latest()->first();
        return response()->json(['work' => $work]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,zip|max:10240', // 10MB
        ]);

        $path = $request->file('file')->store('submissions');

        $work = $request->user()->works()->create([
            'title' => $request->title,
            'file_path' => $path,
        ]);

        return response()->json(['message' => 'Submission uploaded successfully.']);
    }
}
