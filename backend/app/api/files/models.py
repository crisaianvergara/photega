import uuid
from datetime import datetime, timezone

from sqlmodel import Column, Field, SQLModel
from sqlalchemy.dialects import postgresql as pg
from sqlalchemy.dialects.postgresql import TIMESTAMP


class FileBase(SQLModel):
    file_name: str = Field(index=True, nullable=False)
    file_path: str = Field(nullable=False)
    file_size: str = Field(nullable=False)
    owner: str = Field(nullable=False)


class File(FileBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, nullable=False)
    created_at: datetime = Field(
        sa_column=Column(
            TIMESTAMP(timezone=True),
            default=lambda: datetime.now(timezone.utc),
            nullable=False,
        )
    )
    updated_at: datetime = Field(
        sa_column=Column(
            TIMESTAMP(timezone=True),
            default=lambda: datetime.now(timezone.utc),
            nullable=False,
        )
    )


class FileCreate(FileBase):
    created_at: datetime | None = None
    updated_at: datetime | None = None


class FileUpdate(SQLModel):
    file_name: str | None = None
    file_path: str | None = None
    file_size: str | None = None
    owner: str | None = None


class FilePublic(FileBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
