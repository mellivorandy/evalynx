<?php

namespace App\Http\Controllers;

use App\Models\Past_projects;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorksController extends Controller
{
    public function index(Request $request)
    {
        $query = Past_projects::query();

        if ($search = $request->input('search')) {
            $query->where('title', 'like', "%{$search}%");
        }

        $pastWorks = $query->orderBy('id', 'desc')->paginate(10);

        return Inertia::render('Works/Index', [
            'pastWorks' => $pastWorks,
            'filters' => $request->only('search'),
        ]);
    }

    public function showByYear($year)
    {
        $projects = \App\Models\Past_projects::where('year', $year)->get();

        return Inertia::render('Works/YearlyWorks', [
            'projects' => $projects,
            'year' => $year,
        ]);
    }
}
