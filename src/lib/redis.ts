// Redis client for caching AI responses
// In production, use Upstash Redis. For local development, falls back to in-memory cache.

interface CacheStore {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
}

class MemoryCache implements CacheStore {
  private store = new Map<string, { value: string; expires: number }>();

  async get(key: string): Promise<string | null> {
    const item = this.store.get(key);
    if (!item) return null;
    if (item.expires && Date.now() > item.expires) {
      this.store.delete(key);
      return null;
    }
    return item.value;
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    const expires = ttl ? Date.now() + ttl * 1000 : 0;
    this.store.set(key, { value, expires });
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }
}

class RedisCache implements CacheStore {
  private redis: any;

  constructor(url: string) {
    try {
      const IORedis = require("ioredis");
      this.redis = new IORedis(url, {
        maxRetriesPerRequest: 3,
        retryStrategy: (times: number) => {
          if (times > 3) return null;
          return Math.min(times * 200, 2000);
        },
      });
    } catch {
      console.warn("Redis connection failed, falling back to memory cache");
      return new MemoryCache() as any;
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.redis.get(key);
    } catch {
      return null;
    }
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    try {
      if (ttl) {
        await this.redis.setex(key, ttl, value);
      } else {
        await this.redis.set(key, value);
      }
    } catch {
      // Silently fail - caching is optional
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch {
      // Silently fail
    }
  }
}

function createCache(): CacheStore {
  const redisUrl = process.env.REDIS_URL;
  if (redisUrl && redisUrl !== "redis://localhost:6379") {
    try {
      return new RedisCache(redisUrl);
    } catch {
      return new MemoryCache();
    }
  }
  return new MemoryCache();
}

export const cache = createCache();

// Helper to generate cache keys
export function cacheKey(...parts: string[]): string {
  return `cm:${parts.join(":")}`;
}

// Cache AI responses with 24-hour TTL
export const AI_CACHE_TTL = 86400; // 24 hours
