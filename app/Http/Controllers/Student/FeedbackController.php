<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class FeedbackController extends Controller
{
    public function index()
    {
        $feedback = Auth::user()->works()->with('feedback')->get();
        return response()->json(['feedback' => $feedback]);
    }
}
