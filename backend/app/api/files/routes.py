from fastapi import APIRouter, Depends, HTTPException, Query, status

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession as Session

from app.api.files.models import File, FileCreate, FilePublic
from app.core.db import get_async_session

files = APIRouter(prefix="/files", tags=["files"])


@files.get("/{file_id}", response_model=FilePublic)
async def read_file(
    *, session: Session = Depends(get_async_session), file_id: int
) -> FilePublic:
    file = await session.get(File, file_id)
    if not file:
        raise HTTPException(status_code=404, detail="File not found.")
    return files


@files.get("/", response_model=list[FilePublic])
async def read_files(
    *,
    session: Session = Depends(get_async_session),
    offset: int = 0,
    limit: int = Query(default=100, le=100),
) -> list[FilePublic]:
    files = await session.exec(select(File).offset(offset).limit(limit))
    return files.all()


@files.post("/", status_code=status.HTTP_201_CREATED, response_model=FilePublic)
async def create_file(
    *, session: Session = Depends(get_async_session), file: FileCreate
) -> FilePublic:
    db_file = File.model_validate(file)
    session.add(db_file)
    await session.commit()
    await session.refresh(db_file)
    return db_file
