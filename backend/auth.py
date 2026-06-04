import bcrypt
from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import select
from database import Base, SessionLocal

# 預設帳密（寫死）
DEFAULT_USERS = [
    ("admin", "1234"),
]


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(80), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(200))


def hash_password(plain: str) -> str:
    return bcrypt.hashpw(plain.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def seed_users() -> None:
    """資料庫沒有使用者時，建立預設帳號。"""
    db = SessionLocal()
    try:
        for username, password in DEFAULT_USERS:
            exists = db.scalar(select(User).where(User.username == username))
            if not exists:
                db.add(User(username=username, password_hash=hash_password(password)))
        db.commit()
    finally:
        db.close()