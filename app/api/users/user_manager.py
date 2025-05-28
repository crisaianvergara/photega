import uuid

from fastapi import Depends, Request

from sqlalchemy.ext.asyncio import AsyncSession

from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin, models
from fastapi_users.db import SQLAlchemyUserDatabase
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    JWTStrategy
)

from app.api.users.models import User
from app.core.config import settings
from app.core.db import get_async_session


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = settings.SECRET
    verification_token_secret = settings.SECRET


    async def on_after_register(self, user: User, request: Request | None = None):
        print(f"User {user.id} has registered.")
    

    async def on_after_forgot_password(self, user: User, token: str, request: Request | None = None):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    
    async def on_after_request_verify(self, user: User, token: str, request: Request| None = None):
        print(f"Verification requested for user {user.id}. Verification: {token}")


bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)


async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)


def get_jwt_strategy() -> JWTStrategy[models.UP, models.ID]:
    return JWTStrategy(secret=settings.SECRET, lifetime_seconds=3600)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy
)

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])
current_active_user = fastapi_users.current_user(active=True)