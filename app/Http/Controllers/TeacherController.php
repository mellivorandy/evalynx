<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class TeacherController extends Controller
{
    public function index(): InertiaResponse
    {
        $teacherId = Auth::id();

        $teams = Team::where('advisor_id', $teacherId)
            ->with([
                'projects:id,team_id,title,proposal_path,poster_path,code_link,created_at,updated_at',
                'teammembers.user:id,name,email'
            ])
            ->select('id', 'name', 'advisor_id')
            ->get();

        return Inertia::render('Teacher/Index', [
            'teams' => $teams,
        ]);
    }
}
