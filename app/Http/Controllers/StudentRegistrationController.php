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

    public function edit()
    {
        $user = Auth::user();

        $team = Team::with(['advisor', 'members.user', 'project'])
            ->whereHas('members', fn($q) => $q->where('user_id', $user->id))
            ->first();

        return Inertia::render('Student/Edit', [
            'team' => $team,
            'self_id' => Auth::id(),
            'self_email' => Auth::user()->email,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'team_name' => 'required|string|max:255',
            'advisor_email' => 'required|email',
            'title' => 'required|string|max:255',
            'code_link' => 'nullable|url',
            'proposal_path' => 'nullable|file|mimes:pdf',
            'poster_path' => 'nullable|file|mimes:png,jpg,jpeg',
            'teammates' => 'array',
            'teammates.*' => 'nullable|email',
        ]);

        $team = Team::whereHas('members', fn($q) => $q->where('user_id', Auth::id()))->first();

        // 更新基本資料
        $team->update([
            'name' => $request->team_name,
            'advisor_id' => User::where('email', $request->advisor_email)->value('id'),
        ]);

        $project = $team->project->first();
        if ($project) {
            $project->update([
                'title' => $request->title,
                'code_link' => $request->code_link,
            ]);

            if ($request->hasFile('proposal_path')) {
                $path = $request->file('proposal_path')->store('proposals', 'public');
                $project->update(['proposal_path' => $path]);
            }

            if ($request->hasFile('poster_path')) {
                $path = $request->file('poster_path')->store('posters', 'public');
                $project->update(['poster_path' => $path]);
            }
        }

        // 更新隊員名單
        $emails = collect($request->teammates)->filter();
        $existing = User::whereIn('email', $emails)->get();

        $team->members()->where('user_id', '!=', Auth::id())->delete();
        foreach ($existing as $user) {
            $team->members()->updateOrCreate([
                'user_id' => $user->id,
            ]);
        }

        return redirect()->route('student.team')->with('success', '更新成功');
    }
}
