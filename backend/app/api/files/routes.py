from fastapi import APIRouter

files = APIRouter(prefix="/files", tags=["files"])

fake_database_files = [
    {
        "id": "1",
        "file": "/images/phone.jpg",
        "fileName": "iPhone 11 Pro 256GB Memory",
        "fileSize": "265KB",
        "owner": "Cris-aian Vergara",
        "dateModified": "11-10-1993",
    },
    {
        "id": "2",
        "file": "/images/phone.jpg",
        "fileName": "iPhone 11 Pro 256GB Memory",
        "fileSize": "265KB",
        "owner": "Cris-aian Vergara",
        "dateModified": "11-10-1993",
    },
    {
        "id": "3",
        "file": "/images/phone.jpg",
        "fileName": "iPhone 11 Pro 256GB Memory",
        "fileSize": "265KB",
        "owner": "Cris-aian Vergara",
        "dateModified": "11-10-1993",
    },
    {
        "id": "4",
        "file": "/images/phone.jpg",
        "fileName": "iPhone 11 Pro 256GB Memory",
        "fileSize": "265KB",
        "owner": "Cris-aian Vergara",
        "dateModified": "11-10-1993",
    },
    {
        "id": "5",
        "file": "/images/phone.jpg",
        "fileName": "iPhone 11 Pro 256GB Memory",
        "fileSize": "265KB",
        "owner": "Cris-aian Vergara",
        "dateModified": "11-10-1993",
    },
    {
        "id": "6",
        "file": "/images/phone.jpg",
        "fileName": "iPhone 11 Pro 256GB Memory",
        "fileSize": "265KB",
        "owner": "Cris-aian Vergara",
        "dateModified": "11-10-1993",
    },
]


@files.get("/")
async def read_files():
    return fake_database_files


@files.post("/upload")
async def read_files():
    return [{"upload": "Uploading"}]
