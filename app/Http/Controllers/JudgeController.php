<?php

namespace App\Http\Controllers;

use App\Models\Judge;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class JudgeController extends Controller
{
    public function index(): InertiaResponse
    {
        $judges = Judge::orderBy('created_at', 'desc')->get();
        return Inertia::render('Judges/Index', [
            'judges' => $judges,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('Judges/Create'); 
    }

    public function store(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'nullable|boolean',
            'score1' => 'nullable|integer|min:0', 
            'score2' => 'nullable|integer|min:0',
            'score3' => 'nullable|integer|min:0',
            'score4' => 'nullable|integer|min:0',
        ]);

        $validatedData['completed'] = $request->boolean('completed');
        $validatedData['score1'] = $request->input('score1', 0); 
        $validatedData['score2'] = $request->input('score2', 0);
        $validatedData['score3'] = $request->input('score3', 0);
        $validatedData['score4'] = $request->input('score4', 0);


        Judge::create($validatedData);

        return redirect()->route('judges.index')->with('success', '評審項目及評分已成功新增！');
    }

    public function show(Judge $judge): InertiaResponse
    {
        return Inertia::render('Judges/Show', [ 
            'judge' => $judge,
        ]);
    }

    public function edit(Judge $judge): InertiaResponse
    {
        // Edit.jsx 表單也需要包含 score 欄位
        return Inertia::render('Judges/Edit', [ // 假設您有 Edit.jsx
            'judge' => $judge,
        ]);
    }

    public function update(Request $request, Judge $judge): RedirectResponse
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'nullable|boolean',
            'score1' => 'nullable|integer|min:0',
            'score2' => 'nullable|integer|min:0',
            'score3' => 'nullable|integer|min:0',
            'score4' => 'nullable|integer|min:0',
        ]);

        if ($request->has('completed')) {
            $validatedData['completed'] = $request->boolean('completed');
        } else {
            $validatedData['completed'] = $request->boolean('completed');
        }
        
        // 處理 score 欄位的更新
        if ($request->has('score1')) $validatedData['score1'] = $request->input('score1');
        if ($request->has('score2')) $validatedData['score2'] = $request->input('score2');
        if ($request->has('score3')) $validatedData['score3'] = $request->input('score3');
        if ($request->has('score4')) $validatedData['score4'] = $request->input('score4');


        $judge->update($validatedData);

        return redirect()->route('judges.index')->with('success', '評審項目及評分已成功更新！');
    }

    public function destroy(Judge $judge): RedirectResponse
    {
        $judge->delete();
        return redirect()->route('judges.index')->with('success', '評審項目已成功刪除！');
    }


}
