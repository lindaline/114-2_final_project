@echo off
cd /d %~dp0

echo 啟動資料庫...
docker compose -f ..\docker-compose.yml up -d

if errorlevel 1 (
    echo 第一次啟動，建立 conda 環境並安裝套件...
    call conda create -n final_project python=3.12 -y
    call conda activate final_project
    pip install -r requirements.txt
) else (
    call conda activate final_project
)
uvicorn main:app --reload --port 8000