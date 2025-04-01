import { z } from "zod";
import { Fetcher } from "../../fetcher";
import { FetcherOptions } from "../../fetcher/types";
import { Match, MatchSchema } from "../../schemas/match";

import { ModuleBase, ModuleBaseConfig } from "./base";

/**
 * @description A module for interacting with The Blue Alliance Team API
 *
 * @see https://www.thebluealliance.com/apidocs/v3
 */
export class MatchesResource extends ModuleBase<Match[]> {
  private fetcher: Fetcher<Match[]>;

  constructor(config: ModuleBaseConfig<Match[]>) {
    super(config);
    this.fetcher = this.createFetcher(config.baseUrl, config.apiKey);
  }

  async getEventMatchesSimple(eventKey: string, options?: FetcherOptions) {
    const res = await this.fetcher.fetch(
            `/event/${eventKey}/matches`,
            this.getFetcherOptions(options)
          );
          return z.array(MatchSchema).parseAsync(res.data);
  }
}