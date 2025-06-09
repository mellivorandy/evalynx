<?php
// app/Models/Works.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{

    protected $table = 'projects'; // 關鍵！要對應你的資料表名稱
    
    protected $fillable = [
        'team_id',
        'title',
        'proposal_path',
        'poster_path',
        'code_link'
    ];
}
