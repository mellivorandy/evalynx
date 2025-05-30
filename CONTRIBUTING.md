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

# 4. 複製 .env 並建立資料庫
copy .env.example .env         # Windows 用 copy；mac/Linux 用 cp

# 5. 編輯 .env 設定你的資料庫帳密
php artisan config:clear

# 6. 執行資料表 migration
php artisan migrate

# 7. 啟動 Laravel 開發伺服器
php artisan serve

# 8. 啟動前端 Vite（熱重載）
npm run dev
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

# 6. 產生 Laravel 應用金鑰
php artisan key:generate

# 7. 清除快取與建立資料表
php artisan config:clear
php artisan migrate

# 8. 啟動 Laravel + React 開發伺服器
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
每次功能完成後，請在本機執行以下流程，確認無誤再提交：

```bash
# 啟動後端 Laravel
php artisan serve

# 啟動前端 Vite 開發伺服器
npm run dev

# 執行 Laravel 測試（包含單元與功能測試）
php artisan test
```

- 提醒：此專案已有自動化測試，若 php artisan test 出現錯誤（FAIL），代表本次功能未正確實作，請先修正通過所有測試後再提交。

- 請開兩個終端機同時執行 `php artisan serve` 和 `npm run dev`，前後端需要分開啟動才能正確顯示網頁。

<br>

## 其他說明
- 若遇到問題請使用 GitHub Issues 回報

- 討論用 Google Meet，每週五晚上 8 點

## 附註

### Windows 使用者首次執行 npm 相關指令可能出現錯誤
如果你在執行 npm install 或 npm run dev 時遇到這類錯誤：

```bash
npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

這是因為 Windows PowerShell 預設不允許執行 JavaScript 套件安裝腳本。

解法：解除執行權限限制，請依下列步驟操作：

- 以系統管理員身份開啟 PowerShell（在開始選單搜尋「PowerShell」-> 右鍵「以系統管理員執行」）

- 輸入以下指令後按 Enter：

```bash
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

接著系統會詢問是否變更設定，請輸入 Y ，這樣就可以正常執行 npm install、npm run dev 等前端開發指令了。
