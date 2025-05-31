<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    protected $fillable = [
        'title',
        'content',
        'poster_path',
        'event_date',
        'prize',
        'rules',
    ];

    protected $casts = [
        'event_date' => 'date',
    ];
}
