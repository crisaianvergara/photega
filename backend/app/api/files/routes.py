from fastapi import APIRouter, Depends, HTTPException, Query, status

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession as Session

from app.api.files.models import File, FileCreate, FilePublic, FileUpdate
from app.api.users.models import User
from app.api.users.user_manager import current_active_user

from app.core.db import get_async_session

files = APIRouter(prefix="/files", tags=["files"])


@files.post("/", status_code=status.HTTP_201_CREATED, response_model=FilePublic)
async def create_file(
    *,
    session: Session = Depends(get_async_session),
    file: FileCreate,
    user: User = Depends(current_active_user)
) -> FilePublic:
    db_file = File.model_validate(file)
    session.add(db_file)
    await session.commit()
    await session.refresh(db_file)
    return db_file


@files.get("/{file_id}", response_model=FilePublic)
async def read_file(
    *,
    session: Session = Depends(get_async_session),
    file_id: str,
    user: User = Depends(current_active_user)
) -> FilePublic:
    file = await session.get(File, file_id)

    if not file:
        raise HTTPException(status_code=404, detail="File not found.")

    return file


@files.get("/", response_model=list[FilePublic])
async def read_files(
    *,
    session: Session = Depends(get_async_session),
    offset: int = 0,
    limit: int = Query(default=100, le=100),
    user: User = Depends(current_active_user)
) -> list[FilePublic]:
    files = await session.exec(select(File).offset(offset).limit(limit))
    return files.all()


@files.patch("/{file_id}", response_model=FilePublic)
async def update_file(
    *,
    session: Session = Depends(get_async_session),
    file_id: str,
    file: FileUpdate,
    user: User = Depends(current_active_user)
) -> FilePublic:
    db_file = await session.get(File, file_id)

    if not db_file:
        raise HTTPException(status_code=404, detail="File not found.")

    file_data = file.model_dump(exclude_unset=True)
    db_file.sqlmodel_update(file_data)
    session.add(db_file)
    await session.commit()
    await session.refresh(db_file)
    return db_file


@files.delete("/{file_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_file(
    *,
    session: Session = Depends(get_async_session),
    file_id: str,
    user: User = Depends(current_active_user)
):
    file = await session.get(File, file_id)

    if not file:
        raise HTTPException(status_code=404, detail="File not found.")

    await session.delete(file)
    await session.commit()
    return {}
