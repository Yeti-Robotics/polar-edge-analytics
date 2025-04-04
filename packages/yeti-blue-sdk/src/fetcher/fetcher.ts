import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { FetcherOptions, FetcherResponse } from "@/fetcher/types";
import { Cache } from "@/cache";

export class Fetcher<T> {
  private client: AxiosInstance;
  private cache: Cache<T>;

  constructor(
    baseURL: string,
    cache: Cache<T>,
    defaultHeaders: Record<string, string> = {}
  ) {
    this.client = axios.create({
      baseURL,
      headers: defaultHeaders,
    });
    this.cache = cache;
  }

  async fetch(path: string, options: FetcherOptions = {}) {
    const cacheKey = `${path}`;

    if (options.cache) {
      const cached = await this.cache.get(cacheKey);
      if (cached) {
        options.etag = cached.metadata.etag;
      }
    }

    const config: AxiosRequestConfig = {
      headers: {},
    };

    if (options.etag) {
      (config.headers as Record<string, string>)["If-None-Match"] =
        options.etag;
    }

    try {
      const response = await this.client.get<T>(path, config);

      const maxAge = response.headers["Cache-Control"]?.toString();

      const result: FetcherResponse<T> = {
        data: response.data,
        status: response.status,
        etag: response.headers.etag,
        maxAge: this.parseMaxAge(maxAge),
      };

      if (options.cache && result.etag) {
        await this.cache.set(cacheKey, {
          value: result.data,
          metadata: {
            etag: result.etag,
            maxAge: result.maxAge,
            timestamp: Date.now(),
          },
        });
      }

      return result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 304) {
        const cached = await this.cache.get(cacheKey);
        if (cached) {
          return {
            data: cached.value,
            status: 304,
            etag: cached.metadata.etag,
            maxAge: cached.metadata.maxAge,
          };
        }
        throw error;
      }
      throw error;
    }
  }

  private parseMaxAge(cacheControl?: string): number | undefined {
    if (!cacheControl) return undefined;
    const match = cacheControl.match(/max-age=(\d+)/);
    return match ? parseInt(match[1], 10) : undefined;
  }
}
