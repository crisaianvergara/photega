import uuid
from datetime import datetime

from sqlmodel import Column, Field, SQLModel
from sqlalchemy.dialects import postgresql as pg


class FileBase(SQLModel):
    file_name: str = Field(index=True, nullable=False)
    file_path: str = Field(nullable=False)
    file_size: str = Field(nullable=False)
    owner: str = Field(nullable=False)
    created_at: datetime = Field(sa_column=Column(pg.TIMESTAMP, default=datetime.now))
    updated_at: datetime = Field(sa_column=Column(pg.TIMESTAMP, default=datetime.now))


class File(FileBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, nullable=False)


class FileCreate(FileBase):
    pass


class FileUpdate(SQLModel):
    file_name: str | None = None
    file_path: str | None = None
    file_size: str | None = None
    owner: str | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None


class FilePublic(FileBase):
    id: uuid.UUID