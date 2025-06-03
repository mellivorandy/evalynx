<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Judge extends Model // 確保類名是 Judge
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'team_name' ,
        'completed',
        'score1',
        'score2', 
        'score3', 
        'score4', 
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'completed' => 'boolean',
        'score1' => 'integer', // 建議轉換類型
        'score2' => 'integer',
        'score3' => 'integer',
        'score4' => 'integer',
    ];
}
