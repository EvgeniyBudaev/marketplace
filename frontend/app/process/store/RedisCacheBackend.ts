import type { RedisOptions } from "ioredis";
import Redis from "ioredis";
import type { ICacheBackend } from "./type";

type Options = {
  ttl: number;
} & RedisOptions;

export class RedisCacheBackend implements ICacheBackend {
  private redis: Redis;
  private ttl: number;

  constructor({ ttl, ...options }: Options) {
    this.redis = new Redis(options);
    this.ttl = ttl;
  }

  async get<T>(key: string) {
    const value = await this.redis.get(key);
    return value ? (JSON.parse(value) as T) : undefined;
  }

  async set(key: string, value: unknown) {
    await this.redis.set(key, JSON.stringify(value), "EX", this.ttl);
  }

  async del(key: string) {
    await this.redis.del(key);
  }
}
