from fastapi import APIRouter

router = APIRouter(
    prefix="/files",
    tags=["files"],
    dependencies=[],
    responses={404: {"description": "Not found"}}
)


@router.get("/")
async def read_files():
    return [{"file1": "File 1"}, {"file2": "File 2"}]


@router.post("/upload")
async def read_files():
    return [{"upload": "Uploading"}]