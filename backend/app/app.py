import os

from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from mangum import Mangum

from app.api.files.routes import files
from app.api.users.routes import users

from app.core.config import settings
from app.core.db import create_db_and_tables

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     """Not needed if you setup a migration system like Alembic"""
#     await create_db_and_tables()
#     yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="File storage application.",
    # lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.all_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

base_dir = os.path.dirname(__file__)
static_path = os.path.join(base_dir, "static")
templates_path = os.path.join(base_dir, "templates")

app.mount("/static", StaticFiles(directory=static_path), name="static")
templates = Jinja2Templates(directory=templates_path)

app.include_router(files)
app.include_router(users)


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={
            "title": "Home"
        }
    )


handler = Mangum(app)