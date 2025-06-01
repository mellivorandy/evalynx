<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 管理員
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'phone' => '0911222333',
            'title' => '系統管理員',
            'role' => 'admin',
            'password' => Hash::make('admin123'),
            'email_verified_at' => now(),
        ]);

        // 評審
        for ($i = 1; $i <= 5; $i++) {
            User::create([
                'name' => "Judge $i",
                'email' => "judge{$i}@example.com",
                'phone' => '09' . rand(10000000, 99999999),
                'title' => '教授',
                'role' => 'judge',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]);
        }

        // 指導老師
        for ($i = 1; $i <= 3; $i++) {
            User::create([
                'name' => "Teacher $i",
                'email' => "teacher{$i}@example.com",
                'phone' => '09' . rand(10000000, 99999999),
                'title' => '助理教授',
                'role' => 'teacher',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]);
        }

        // 學生
        for ($i = 1; $i <= 5; $i++) {
            User::create([
                'name' => "Student $i",
                'email' => "student{$i}@example.com",
                'phone' => '09' . rand(10000000, 99999999),
                'title' => null,
                'role' => 'student',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]);
        }
    }
}
