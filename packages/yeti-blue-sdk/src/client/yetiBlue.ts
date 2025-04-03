import { Cache, MemoryCache } from "../cache";
import { ModuleBaseConfig } from "./modules/base";
import { MatchesResource } from "./modules/matches";
import { RankingResource } from "./modules/rankings";
import { TeamsResource } from "./modules/team";

export interface YETIBlueClientConfig {
  apiKey: string;
  baseUrl: string;
  cache?: Cache<unknown>;
  defaultCache?: boolean;
}

export class YETIBlueClient {
  // Cache stores values of any type.
  // Resources should perform validation of the data they get back from the cache.
  private readonly cache: Cache<any>;
  private readonly defaultCache: boolean;
  teams: TeamsResource;
  matches: MatchesResource;
  rankings: RankingResource;

  constructor(config: YETIBlueClientConfig) {
    this.cache = config.cache || new MemoryCache();
    this.defaultCache = config.defaultCache || false;
    const resourceConfig = {
      ...config,
      defaultCache: this.defaultCache,
      cache: this.cache,
    } satisfies ModuleBaseConfig<any>;

    this.teams = new TeamsResource(resourceConfig);
    this.matches = new MatchesResource(resourceConfig);
    this.rankings = new RankingResource(resourceConfig);
  }
}
