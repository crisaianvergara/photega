import redis.asyncio
from fastapi_users.authentication import RedisStrategy

from .config import settings

redis = redis.asyncio.from_url(settings.redis_url, decode_responses=True)


def get_redis_strategy() -> RedisStrategy:
    return RedisStrategy(redis, lifetime_seconds=3600)
