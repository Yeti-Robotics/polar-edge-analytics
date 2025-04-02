import { YETIBlueClient, MemoryCache } from "yeti-blue-sdk";

/**
 * This is a global cache for the app.
 *
 * This is a singleton that is used to store the cache in the global scope.
 * This is so the cache is persisted between reloads (particularly in development).
 */

const globalForCache = global as unknown as {
  cache: MemoryCache<unknown> | undefined;
};

export const myCache =
  globalForCache.cache ??
  new MemoryCache({
    maxSizeBytes: 1024 * 1024 * 10,
  });

if (!globalForCache.cache) {
  globalForCache.cache = myCache;
}

export const client = new YETIBlueClient({
  apiKey: process.env.NEXT_PUBLIC_TBA_API_KEY || "your-api-key-here",
  baseUrl: "https://www.thebluealliance.com/api/v3",
  cache: myCache,
  defaultCache: true,
});
