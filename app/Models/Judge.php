<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Judge extends Model
{
    use HasFactory;

    // 對應 judges 資料表（如果不是預設命名才需要加這行）
    // protected $table = 'judges';

    // 允許批次賦值的欄位
    protected $fillable = [
        'id',   // 關聯作品
        'team_id',
        'title',
        'description',
        'team_name',
        'completed',
        'score1',
        'score2',
        'score3',
        'score4',
    ];

    protected $casts = [
        'completed' => 'boolean',
        'score1' => 'integer',
        'score2' => 'integer',
        'score3' => 'integer',
        'score4' => 'integer',
    ];
}
