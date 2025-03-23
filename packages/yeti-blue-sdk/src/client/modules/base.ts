import { Fetcher } from "../../fetcher";
import { Cache } from "../../cache/types";
import { MemoryCache } from "../../cache";
import { FetcherOptions } from "../../fetcher/types";

export interface ModuleBaseConfig<T> {
  apiKey: string;
  baseUrl: string;
  cache?: Cache<T>;
  defaultCache?: boolean;
}

export class ModuleBase<T> {
  protected cache: Cache<T>;
  protected defaultCache: boolean;

  constructor({ cache, defaultCache }: ModuleBaseConfig<T>) {
    this.cache = cache || new MemoryCache<T>(); // fallback to mem cache if not specified
    this.defaultCache = defaultCache ?? true;
  }

  private shouldCache(cache?: boolean) {
    return cache ?? this.defaultCache;
  }

  protected getFetcherOptions(options?: FetcherOptions) {
    return {
      cache: this.shouldCache(options?.cache),
    };
  }

  protected createFetcher(baseUrl: string, apiKey: string) {
    return new Fetcher<T>(baseUrl, this.cache, {
      "X-TBA-Auth-Key": apiKey,
      "Content-Type": "application/json",
    });
  }
}
