<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
     protected $fillable = [
            'id','name','advisor_id','award','created_at','updated_at'
        ];
}
