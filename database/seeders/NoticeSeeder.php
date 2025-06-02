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
        $notices = [
            // 2025
            [
                'title' => '第12屆激發學生創意競賽報名開始',
                'content' => '請完成線上報名及上傳所有文件資料，始完成報名。檔案請轉為 PDF，大小不超過 10MB。',
                'event_date' => '2025-10-25',
                'prize' => '冠軍獎金 NT$30,000',
                'rules' => '報名後不得更改隊伍資料',
                'created_at' => now()->setDate(2025, 9, 1),
            ],
            [
                'title' => '系列工作坊資訊',
                'content' => "113/09/27：產品開發與市場驗證\n113/09/30：商業計劃書撰寫\n113/10/07：創新創意思維",
                'created_at' => now()->setDate(2025, 9, 5),
            ],
            // 2024
            [
                'title' => '第11屆決賽照片已上傳',
                'content' => '請至活動相簿查看比賽精彩照片。',
                'created_at' => now()->setDate(2024, 11, 30),
            ],
            [
                'title' => '2024年決賽成績公告',
                'content' => '恭喜所有得獎隊伍！詳細成績可下載 PDF 檔查閱。',
                'created_at' => now()->setDate(2024, 11, 23),
            ],
            // 2023
            [
                'title' => '2023 初賽晉級隊伍名單',
                'content' => '共有 15 隊成功晉級，請準備決賽簡報與展示。',
                'created_at' => now()->setDate(2023, 10, 28),
            ],
            [
                'title' => '第10屆競賽流程調整公告',
                'content' => '為因應場地調度，決賽順序將略有異動，請依最新行程參與。',
                'created_at' => now()->setDate(2023, 10, 20),
            ],
            // 2022
            [
                'title' => '2022 冠軍得主專訪影片上架',
                'content' => '觀看學長姐如何走過創意競賽之路！',
                'created_at' => now()->setDate(2022, 12, 15),
            ],
            // 2021
            [
                'title' => '2021 創意競賽總回顧',
                'content' => '高雄大學第8屆創意競賽精華紀錄現已上線。',
                'created_at' => now()->setDate(2021, 12, 1),
            ],
        ];

        foreach ($notices as $data) {
            \App\Models\Notice::create($data);
        }
    }
}
