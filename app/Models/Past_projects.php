<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Past_projects extends Model
{
    use HasFactory;

    protected $fillable = [
        'team_name',
        'members',
        'title',
        'description',
        'poster_path',
        'code_link',
        'year',
        'prize',
        'judge_snapshot',
    ];
}
