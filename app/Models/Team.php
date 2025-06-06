<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'id', 'name', 'advisor_id', 'award', 'created_at', 'updated_at'
    ];

    public function projects()
    {
        return $this->hasMany(Project::class, 'team_id', 'id');
    }

    public function teamMembers()
    {
        return $this->hasMany(Team_members::class, 'team_id', 'id');
    }
}
