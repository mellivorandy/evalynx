<?php
namespace App\Http\Controllers;

use App\Models\Works;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class WorksController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $query = Works::query();

        if ($search = $request->input('search')) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('team_name', 'like', "%{$search}%")
                  ->orWhere('year', 'like', "%{$search}%");
        }

        $works = $query->orderBy('year', 'desc')->paginate(12);

        return Inertia::render('Works/Index', [
            'works' => $works,
            'filters' => $request->only('search'),
        ]);
    }
}
