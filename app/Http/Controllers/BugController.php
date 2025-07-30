<?php

namespace App\Http\Controllers;

use App\Models\Bug;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BugController extends Controller
{
    public function store(Request $request)
    {
        // Validate inputs
            $validated = $request->validate([
                'title' => 'required|max:100',
                'description' => 'nullable|max:500',
                'severity' => 'in:low,medium,high',
            ]);

        // Create record in DB
            $bug = Bug::create([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'severity' => $validated['severity'] ?? 'medium',
            ]);
        // Success response
            return response()->json(['msg' => 'Bug reported!'], 201);
    }
}
