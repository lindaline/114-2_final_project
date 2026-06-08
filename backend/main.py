from contextlib import asynccontextmanager
from datetime import date as DateType, datetime

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func, select
from sqlalchemy.orm import Session

import models
import schemas
from database import Base, SessionLocal, engine, get_db

from auth import User, verify_password, seed_users

PALETTE = ["#FFB3C6", "#C9B8FF", "#B8E8D0", "#FFD6A0", "#FF8FAB"]


def seed() -> None:
    """資料庫為空時放入範例資料（以當月為基準，前端月曆才看得到點點）。"""
    db = SessionLocal()
    try:
        total = db.scalar(select(func.count()).select_from(models.Diary))
        if total and total > 0:
            return
        today = DateType.today()
        y, m = today.year, today.month
        samples = [
            (today, "今天的開始", "新的一天，先寫下第一筆甜甜的記憶。"),
            (today, "傍晚的小確幸", "回家路上買了一束小雛菊，插在窗邊。"),
            (DateType(y, m, 5), "週末的草莓鬆餅", "奶油在嘴裡化開的瞬間覺得一切都值得了。"),
            (DateType(y, m, 12), "雨後的傍晚散步", "和一隻流浪貓相遇，它的眼睛像是裝了整個傍晚。"),
            (DateType(y, m, 18), "想念遠方的朋友", "翻到以前的合照，忽然好想念那些日子。"),
        ]
        for i, (d, title, body) in enumerate(samples):
            db.add(models.Diary(date=d, title=title, body=body, color=PALETTE[i % len(PALETTE)]))
        db.commit()
    finally:
        db.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # 啟動時建表 + 灌範例資料
    Base.metadata.create_all(bind=engine)
    seed()
    seed_users()
    yield


app = FastAPI(title="糖衣記憶 API", lifespan=lifespan)

# 允許 Next.js 前端跨網域呼叫
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 列表（可用 ?date=YYYY-MM-DD 過濾）
@app.get("/api/diaries", response_model=list[schemas.DiaryOut])
def list_diaries(date: DateType | None = None, db: Session = Depends(get_db)):
    stmt = select(models.Diary)
    if date is not None:
        stmt = stmt.where(models.Diary.date == date)
    stmt = stmt.order_by(models.Diary.date.desc(), models.Diary.id.desc())
    return db.scalars(stmt).all()


# 有日記的日期與筆數（給月曆畫點點）
@app.get("/api/diaries/dates", response_model=list[schemas.DateCount])
def diary_dates(db: Session = Depends(get_db)):
    rows = db.execute(
        select(models.Diary.date, func.count().label("count")).group_by(models.Diary.date)
    ).all()
    return [{"date": r.date, "count": r.count} for r in rows]


# 單筆
@app.get("/api/diaries/{diary_id}", response_model=schemas.DiaryOut)
def get_diary(diary_id: int, db: Session = Depends(get_db)):
    item = db.get(models.Diary, diary_id)
    if not item:
        raise HTTPException(status_code=404, detail="找不到日記")
    return item


# 新增
@app.post("/api/diaries", response_model=schemas.DiaryOut, status_code=201)
def create_diary(payload: schemas.DiaryCreate, db: Session = Depends(get_db)):
    total = db.scalar(select(func.count()).select_from(models.Diary)) or 0
    item = models.Diary(
        date=payload.date,
        title=payload.title,
        body=payload.body,
        color=PALETTE[total % len(PALETTE)],
        created_at=datetime.utcnow(),
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


# 修改
@app.put("/api/diaries/{diary_id}", response_model=schemas.DiaryOut)
def update_diary(diary_id: int, payload: schemas.DiaryUpdate, db: Session = Depends(get_db)):
    item = db.get(models.Diary, diary_id)
    if not item:
        raise HTTPException(status_code=404, detail="找不到日記")
    if payload.date is not None:
        item.date = payload.date
    if payload.title is not None:
        item.title = payload.title
    if payload.body is not None:
        item.body = payload.body
    db.commit()
    db.refresh(item)
    return item


# 刪除
@app.delete("/api/diaries/{diary_id}")
def delete_diary(diary_id: int, db: Session = Depends(get_db)):
    item = db.get(models.Diary, diary_id)
    if not item:
        raise HTTPException(status_code=404, detail="找不到日記")
    db.delete(item)
    db.commit()
    return {"ok": True}

# 登入
@app.post("/api/login", response_model=schemas.LoginResponse)
def login(payload: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.username == payload.username))
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="帳號或密碼錯誤")
    return {"ok": True, "username": user.username}