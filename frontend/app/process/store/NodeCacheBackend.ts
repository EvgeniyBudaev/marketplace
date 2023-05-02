import type { Options } from "node-cache";
import NodeCache from "node-cache";
import type { ICacheBackend } from "./type";

export class NodeCacheBackend implements ICacheBackend {
  private cache: NodeCache;

  constructor(options: Options) {
    this.cache = new NodeCache(options);
  }

  async get<T>(key: string) {
    return this.cache.get<T>(key);
  }

  async set(key: string, value: unknown) {
    return this.cache.set(key, value);
  }

  async del(key: string) {
    return this.cache.del(key);
  }
}
