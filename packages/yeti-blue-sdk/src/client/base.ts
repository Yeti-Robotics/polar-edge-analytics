import { Fetcher } from "../fetcher";
import { Cache } from "../cache/types";
import { MemoryCache } from "../cache/memoryCache";

export interface BaseClientConfig<T> {
  apiKey: string;
  baseUrl: string;
  cache?: Cache<T>;
}

export class BaseClient<T> {
  protected fetcher: Fetcher<T>;
  protected cache: Cache<T>;

  constructor({ apiKey, baseUrl, cache }: BaseClientConfig<T>) {
    this.cache = cache || new MemoryCache<T>(); // fallback to mem cache if not specified
    this.fetcher = new Fetcher<T>(baseUrl, this.cache, {
      "X-TBA-Auth-Key": apiKey,
      "Content-Type": "application/json",
    });
  }
}
