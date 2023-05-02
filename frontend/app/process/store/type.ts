export interface ICacheBackend {
  get<T>(key: string): Promise<T | undefined>;

  set(key: string, value: unknown): Promise<unknown>;

  del(key: string): Promise<unknown>;
}
