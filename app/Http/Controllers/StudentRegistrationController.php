<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\TeamMember;
use App\Models\Project;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class StudentRegistrationController extends Controller
{
    public function create()
    {
        return Inertia::render('Student/Register');
    }

    public function index()
    {
        $user = Auth::user();

        $team = $user->teams()->with(['project', 'members.user', 'advisor'])->first();

        return Inertia::render('Student/TeamInfo', [
            'team' => $team,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'team_name' => 'required|string|max:255|unique:teams,name',
            'advisor_email' => 'required|email',
            'title' => 'required|string|max:255',
            'proposal_path' => 'nullable|file|mimes:pdf',
            'poster_path' => 'nullable|file|mimes:png,jpg,jpeg',
            'code_link' => 'nullable|url',
            'teammates' => 'array',
            'teammates.*' => 'nullable|email',
        ]);

        $advisor = User::where('email', $request->advisor_email)->first();
        if (!$advisor) {
            return Redirect::back()->withErrors(['advisor_email' => '找不到此指導老師 Email'])->withInput();
        }

        $team = Team::create([
            'name' => $request->team_name,
            'advisor_id' => $advisor->id,
        ]);

        $project = Project::create([
            'team_id' => $team->id,
            'title' => $request->title,
            'proposal_path' => $request->file('proposal_path') ?
                $request->file('proposal_path')->store('proposals') : null,
            'poster_path' => $request->file('poster_path') ?
                $request->file('poster_path')->store('posters') : null,
            'code_link' => $request->code_link,
        ]);

        // 報名者自己加入
        TeamMember::firstOrCreate([
            'team_id' => $team->id,
            'user_id' => Auth::id(),
        ]);

        // 其他隊員
        if (is_array($request->teammates)) {
            foreach ($request->teammates as $email) {
                if (!$email) continue;
                $user = User::where('email', $email)->first();
                if ($user && $user->id !== Auth::id()) {
                    TeamMember::firstOrCreate([
                        'team_id' => $team->id,
                        'user_id' => $user->id,
                    ]);
                }
            }
        }

        return redirect()->route('student.team')->with('success', '報名成功！');
    }
}
