from fastapi import Depends

from app.api.users.models import User
from app.api.users.user_manager import (
    auth_backend,
    current_active_user,
    fastapi_users
) 
from app.api.users.schemas import (
    UserCreate,
    UserRead,
    UserUpdate,
)

from fastapi import APIRouter

users = APIRouter()

users.include_router(
    fastapi_users.get_auth_router(
        auth_backend,
        # requires_verification=True
    ),
    prefix="/auth/jwt",
    tags=["auth"]
)

users.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)

users.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)

users.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)

users.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

@users.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}