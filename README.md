# 糖衣記憶 · Sugar Memory

> 生活偶爾微酸，但這裡只留微甜。

一個以資料庫為基礎、具有前端介面的線上日記系統。使用者透過互動式月曆瀏覽與記錄每日心情，完整支援日記的新增、查詢、修改與刪除（CRUD），所有資料儲存於 PostgreSQL 資料庫。

**114-2 資料庫設計與應用 ｜ 期末專題**
作者：連家菱（B11223210 四資管AI技優專班三A）

---

## 功能特色

- **互動式月曆**：左側月曆顯示有日記的日期，點選即可檢視當天記錄。
- **日記 CRUD**：新增、查詢、修改、刪除日記，資料即時存入資料庫。

## 技術架構

| 層級 | 技術 |
|------|------|
| 前端 | Next.js（React） |
| 後端 | Python FastAPI |
| 資料存取 | SQLAlchemy（ORM） |
| 資料庫 | PostgreSQL（Docker 容器） |

## 環境需求

- Node.js
- Python 3.11（建議使用 Conda 環境）
- Docker Desktop

## 安裝與啟動

系統由「資料庫、後端、前端」三部分組成，需依序啟動。

### 1. 啟動資料庫（Docker）

於專案根目錄執行：

```bash
docker compose up -d
```

首次啟動會自動建立資料庫 `sugar_memory`（帳號 / 密碼皆為 `postgres`）。

### 2. 啟動後端

```bash
cd backend
conda activate final_project
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

啟動後可於 http://localhost:8000/docs 查看自動產生的 API 文件。

### 3. 啟動前端

```bash
npm install
npm run dev
```

開啟 http://localhost:3000 即可使用。

## 專案結構

```
sugar-memory/
├── docker-compose.yml      # PostgreSQL 容器設定
├── app/                    # 前端頁面（首頁、登入、儀表板）
├── components/             # 前端共用元件（月曆、彈窗、背景）
└── backend/                # 後端
    ├── main.py             # FastAPI 入口與 CRUD API
    ├── models.py           # 資料表定義
    ├── database.py         # 資料庫連線
    └── schemas.py          # 輸入 / 輸出格式
```

## API 概覽

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/api/diaries` | 查詢日記（可加 `?date=` 過濾） |
| POST | `/api/diaries` | 新增日記 |
| PUT | `/api/diaries/{id}` | 修改日記 |
| DELETE | `/api/diaries/{id}` | 刪除日記 |
| POST | `/api/login` | 帳號登入 |

## 備註

- 三項服務需同時運行；資料庫須先於後端啟動。
- 日記資料儲存於 PostgreSQL 的 `diaries` 資料表，使用者帳號儲存於 `users` 資料表。