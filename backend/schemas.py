from datetime import date as DateType
from pydantic import BaseModel


class DiaryCreate(BaseModel):
    date: DateType
    title: str
    body: str = ""


class DiaryUpdate(BaseModel):
    date: DateType | None = None
    title: str | None = None
    body: str | None = None


class DiaryOut(BaseModel):
    id: int
    date: DateType
    title: str
    body: str
    color: str

    model_config = {"from_attributes": True}


class DateCount(BaseModel):
    date: DateType
    count: int

class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    ok: bool
    username: str