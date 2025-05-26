from fastapi import APIRouter

files = APIRouter(
    prefix="/files",
    tags=["files"],
    dependencies=[],
    responses={404: {"description": "Not found"}}
)


@files.get("/")
async def read_files():
    return [{"file1": "File 1"}, {"file2": "File 2"}]


@files.post("/upload")
async def read_files():
    return [{"upload": "Uploading"}]