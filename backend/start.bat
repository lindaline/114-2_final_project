@echo off
cd /d %~dp0

echo 啟動資料庫...
docker compose -f ..\docker-compose.yml up -d

echo 檢查 conda 環境...
call conda env list | findstr /C:"final_project" >nul
if errorlevel 1 (
    echo 第一次啟動，建立 conda 環境並安裝套件...
    call conda create -n final_project python=3.11 -y
    call conda activate final_project
    pip install -r requirements.txt
) else (
    call conda activate final_project
)

echo 啟動前端（新視窗）...
start "前端 frontend" cmd /k "cd /d %~dp0.. && (if not exist node_modules (npm install)) && npm run dev"

echo 啟動後端...
python -m uvicorn main:app --reload --port 8000