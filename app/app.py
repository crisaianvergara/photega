import os

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from mangum import Mangum

from .api.files.routes import files
from .core import config, redis

app = FastAPI()

base_dir = os.path.dirname(__file__)
static_path = os.path.join(base_dir, "static")
templates_path = os.path.join(base_dir, "templates")

app.mount("/static", StaticFiles(directory=static_path), name="static")
templates = Jinja2Templates(directory=templates_path)

app.include_router(files)


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