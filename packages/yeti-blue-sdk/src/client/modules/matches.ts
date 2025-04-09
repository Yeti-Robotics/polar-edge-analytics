import { z } from "zod";
import { Fetcher } from "@/fetcher";
import { FetcherOptions } from "@/fetcher/types";
import { Match, MatchSchema } from "@/schemas/match";

import { ModuleBase, ModuleBaseConfig } from "@/client/modules/base";

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

  private getYearFromEventKey(eventKey: string) {
    return parseInt(eventKey.slice(0, 4));
  }

  private injectYear(data: Record<string, any>) {
    const year = this.getYearFromEventKey(data.event_key);
    return {
      ...data,
      year,
    };
  }

  async getEventMatchesSimple(eventKey: string, options?: FetcherOptions) {
    const res = await this.fetcher.fetch(
      `/event/${eventKey}/matches`,
      this.getFetcherOptions(options)
    );
    return z
      .array(MatchSchema)
      .parseAsync(res.data.map(this.injectYear.bind(this)));
  }

  async getMatchByKey(matchKey: string, options?: FetcherOptions) {
    const res = await this.fetcher.fetch(
      `/match/${matchKey}`,
      this.getFetcherOptions(options)
    );
    return MatchSchema.parseAsync(this.injectYear(res.data));
  }
}
