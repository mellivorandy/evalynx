<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'id',
        'name',
        'advisor_id',
        'award',
        'created_at',
        'updated_at'
    ];

    public function project()
    {
        return $this->hasMany(Project::class, 'team_id', 'id');
    }

    public function members()
    {
        return $this->hasMany(TeamMember::class, 'team_id', 'id');
    }

    public function advisor()
    {
        return $this->belongsTo(User::class, 'advisor_id');
    }
}
