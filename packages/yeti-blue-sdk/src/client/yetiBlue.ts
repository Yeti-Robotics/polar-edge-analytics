import { Team, TeamSchema, TeamSimpleSchema } from "../schemas";
import { BaseClient, BaseClientConfig } from "./base";
import { FetcherOptions } from "../fetcher/types";

type TBAResponse = Team; // Add more types here as needed: | Match | Event | etc.

type YetiBlueBaseOptions = {
  shouldCache?: boolean;
};

interface YetiBlueConfig extends BaseClientConfig<TBAResponse> {
  defaultCache?: boolean;
}

export class YetiBlueClient extends BaseClient<TBAResponse> {
  private defaultCache: boolean;

  constructor({ apiKey, baseUrl, cache, defaultCache }: YetiBlueConfig) {
    super({ apiKey, baseUrl, cache });
    this.defaultCache = defaultCache ?? false;
  }

  private getRequestOptions(shouldCache?: boolean): FetcherOptions {
    return {
      cache: shouldCache ?? this.defaultCache,
    };
  }

  private async handleFetch(path: string, shouldCache?: boolean) {
    const options = this.getRequestOptions(shouldCache);
    const response = await this.fetcher.fetch(path, options);
    return response;
  }

  async getTeam(
    teamNumber: number,
    { simple = true, shouldCache }: { simple: boolean } & YetiBlueBaseOptions
  ) {
    const response = await this.handleFetch(
      `/team/frc${teamNumber}${simple ? "/simple" : ""}`,
      shouldCache
    );

    return simple
      ? TeamSimpleSchema.parseAsync(response)
      : TeamSchema.parseAsync(response);
  }
}
