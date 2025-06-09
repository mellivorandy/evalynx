<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Past_projects;

class PastProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Past_projects::insert([
            [
                'team_name' => 'Alpha Team',
                'members' => json_encode(['alice@example.com', 'bob@example.com']),
                'title' => 'AI Smart Trash Can',
                'description' => 'An intelligent trash can that uses AI to sort waste.',
                'poster_path' => 'posters/alpha.png',
                'code_link' => 'https://github.com/example/alpha-trash-can',
                'year' => 2023,
                'prize' => 'Gold',
                'judge_snapshot' => json_encode([
                    ['judge' => 'Dr. Lee', 'score' => 92],
                    ['judge' => 'Prof. Wang', 'score' => 89],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team_name' => 'Beta Squad',
                'members' => json_encode(['charlie@example.com', 'dana@example.com']),
                'title' => 'Smart Farming Assistant',
                'description' => 'A system for monitoring soil and crop conditions using IoT.',
                'poster_path' => 'posters/beta.png',
                'code_link' => 'https://github.com/example/smart-farming',
                'year' => 2022,
                'prize' => 'Silver',
                'judge_snapshot' => json_encode([
                    ['judge' => 'Dr. Hsu', 'score' => 88],
                    ['judge' => 'Prof. Chen', 'score' => 90],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
