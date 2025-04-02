import { YETIBlueClient, MemoryCache } from "yeti-blue-sdk";

// Use global object to persist cache between reloads
const globalForCache = global as unknown as {
  cache: MemoryCache<unknown> | undefined;
};

// Export cache to make available to other files in the project
// Since this is a sandbox, we want to be able to show the cache stats
export const byoCache = globalForCache.cache ?? new MemoryCache();
// Save the cache instance globally
if (!globalForCache.cache) {
  globalForCache.cache = byoCache;
}

export const client = new YETIBlueClient({
  apiKey: process.env.TBA_API_KEY!,
  cache: byoCache,
  baseUrl: "https://www.thebluealliance.com/api/v3",
  defaultCache: true,
});
