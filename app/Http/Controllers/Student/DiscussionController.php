<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Discussion;

class DiscussionController extends Controller
{
    public function index()
    {
        $messages = Discussion::with('user')->latest()->get();
        return response()->json(['messages' => $messages]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        Discussion::create([
            'user_id' => Auth::id(),
            'message' => $request->message,
        ]);

        return response()->json(['message' => 'Message posted.']);
    }
}
