<?php

namespace Database\Seeders;

use App\Models\Notice;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NoticeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Notice::create([
            'title' => '第12屆激發學生創意競賽報名開始',
            'content' => '請完成線上報名及上傳所有文件資料，始完成報名。檔案請轉為 PDF，大小不超過 10MB。',
            'event_date' => '2025-10-25',
            'prize' => '冠軍獎金 NT$30,000',
            'rules' => '報名後不得更改隊伍資料',
        ]);

        Notice::create([
            'title' => '系列工作坊資訊',
            'content' => <<<EOT
            113/09/27：產品開發與市場驗證  
            113/09/30：商業計劃書撰寫  
            113/10/07：創新創意思維
            EOT,
        ]);

        Notice::create([
            'title' => '競賽時程公告',
            'content' => <<<EOT
            報名截止：113/10/25  
            初賽結果：113/11/01  
            決賽日期：113/11/22
            EOT,
        ]);

        Notice::create([
            'title' => '聯絡方式與備註',
            'content' => <<<EOT
            聯絡人：詹小姐 / 施小姐  
            電話：07-591-9584 分機 8456 / 8452  
            信箱：wwchan419@nuk.edu.tw
            EOT,
        ]);
    }
}
