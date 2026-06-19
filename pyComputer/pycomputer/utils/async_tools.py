"""
async_tools.py: Async helpers: debounce, throttle, background tasks, cancellation.
"""

import asyncio
import functools
from typing import Callable, Any


async def debounce(wait: float):
    def decorator(fn: Callable):
        task = None

        async def debounced(*args, **kwargs):
            nonlocal task
            if task:
                task.cancel()
            task = asyncio.create_task(asyncio.sleep(wait))
            try:
                await task
            except asyncio.CancelledError:
                return
            return await fn(*args, **kwargs)

        return debounced

    return decorator


async def throttle(wait: float):
    last_call = 0

    async def decorator(fn: Callable):
        async def throttled(*args, **kwargs):
            nonlocal last_call
            now = asyncio.get_event_loop().time()
            if now - last_call < wait:
                return
            last_call = now
            return await fn(*args, **kwargs)

        return throttled

    return decorator


async def with_timeout(coro, timeout: float, default=None):
    try:
        return await asyncio.wait_for(coro, timeout=timeout)
    except asyncio.TimeoutError:
        return default


class BackgroundTask:
    def __init__(self, coro: Callable, *args, **kwargs):
        self.coro = coro
        self.args = args
        self.kwargs = kwargs
        self.task = None

    def start(self):
        self.task = asyncio.create_task(self.coro(*self.args, **self.kwargs))
        return self.task

    def cancel(self):
        if self.task:
            self.task.cancel()

    async def wait(self):
        if self.task:
            await self.task


async def run_in_background(fn: Callable, *args, **kwargs) -> BackgroundTask:
    task = BackgroundTask(fn, *args, **kwargs)
    task.start()
    return task


def synced(fn: Callable):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        return asyncio.get_event_loop().run_until_complete(fn(*args, **kwargs))

    return wrapper


class AsyncQueue:
    def __init__(self, maxsize: int = 0):
        self._queue = asyncio.Queue(maxsize=maxsize)

    async def put(self, item):
        await self._queue.put(item)

    async def get(self):
        return await self._queue.get()

    def qsize(self):
        return self._queue.qsize()

    def empty(self):
        return self._queue.empty()

    def full(self):
        return self._queue.full()
