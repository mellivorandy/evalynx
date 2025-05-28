# 專案貢獻指南

歡迎加入本專題！本專案使用 Laravel + React + Breeze 開發，請依照下列步驟完成安裝與啟動。

---

## 開發前需安裝的工具

所有組員需先安裝以下應用程式（請使用官方最新版）：

| 工具名稱       | 建議版本  | 用途                        | 下載連結                                      |
|---------------|--------------|-----------------------------|------------------------------------------------|
| PHP           | ≥ 8.1        | Laravel 核心語言             | https://www.php.net/downloads.php           |
| Composer      | 最新         | PHP 套件管理器               | https://getcomposer.org/download/          |
| Node.js + npm | LTS 版本     | 前端建構、執行 React         | https://nodejs.org/en/download             |
| XAMPP         | ≥ 8.2        | 本地伺服器 + MySQL 資料庫    | https://www.apachefriends.org/download.html  |
| Git           | 最新         | 版本控制                     | https://git-scm.com/downloads              |
| VS Code (或你喜歡的) |        | 開發用 IDE，推薦安裝         | https://code.visualstudio.com/     |

## 可選工具（推薦）

| 工具             | 用途                           |
|------------------|--------------------------------|
| Postman          | 測試 API 請求                   |
| GitHub Desktop   | GUI 操作 Git 用                |

---

## 套件環境依賴
專案會自動安裝這些套件（不需手動安裝）：

- Laravel Breeze
- Tailwind CSS
- React
- Vite

## 建立專案（已由組長建立完成）

```bash
# 1. 建立 Laravel 專案
composer create-project laravel/laravel evalynx
cd evalynx

# 2. 安裝 Breeze（React 版）
composer require laravel/breeze --dev
php artisan breeze:install react

# 3. 安裝 Node.js 套件（React 前端）
npm install

# 4. 啟動 Laravel 開發伺服器
php artisan serve

# 5. 啟動前端 Vite（熱重載）
npm run dev

# 6. 複製 .env 並建立資料庫
copy .env.example .env         # Windows 用 copy；mac/Linux 用 cp

# 編輯 .env 設定你的資料庫帳密
php artisan config:clear

# 7. 執行資料表 migration
php artisan migrate
```

## 組員安裝步驟

```bash
# 1. 複製專案
git clone https://github.com/mellivorandy/evalynx.git
cd evalynx

# 2. 複製環境變數設定
copy .env.example .env         # Windows
cp .env.example .env           # Linux/macOS

# 3. 安裝 PHP 依賴
composer install

# 4. 安裝 Node.js 依賴套件
npm install

# 5. 設定資料庫（請先用 phpMyAdmin 建立資料庫 evalynx 並設定 .env）

# 6. 清除快取與建立資料表
php artisan config:clear
php artisan migrate

# 7. 啟動 Laravel + React 開發伺服器
php artisan serve              # 啟動後端
npm run dev                    # 啟動前端
```

## 開發規範
- 使用 Git 分支協作（例如 feature/form, fix/login-bug）

- 每次提交請使用清楚的 commit message，例如：
```bash
feat: 新增競賽建立功能
fix: 修正登入錯誤提示
```
- 提交前請 pull 最新 main 並測試無誤

<br>

## 測試
每次功能完成後，請本機跑一次以下流程確認無誤：

```bash
php artisan serve
npm run dev
```

## 其他說明
- 若遇到問題請使用 GitHub Issues 回報

- 討論用 Google Meet，每週五晚上 8 點
