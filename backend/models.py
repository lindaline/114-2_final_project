from datetime import date, datetime
from sqlalchemy import String, Text, Date, DateTime, Integer
from sqlalchemy.orm import Mapped, mapped_column
from database import Base


class Diary(Base):
    __tablename__ = "diaries"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    date: Mapped[date] = mapped_column(Date, index=True)
    title: Mapped[str] = mapped_column(String(200))
    body: Mapped[str] = mapped_column(Text, default="")
    color: Mapped[str] = mapped_column(String(20), default="#FFB3C6")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)