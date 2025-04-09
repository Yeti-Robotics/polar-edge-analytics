import { z } from "zod";
import { Fetcher } from "@/fetcher";
import { FetcherOptions } from "@/fetcher/types";
import { Media, MediaSchema } from "@/schemas";

import { ModuleBase, ModuleBaseConfig } from "@/client/modules/base";

/**
 * @description A module for interacting with The Blue Alliance Team API
 *
 * @see https://www.thebluealliance.com/apidocs/v3
 */
export class MediaResource extends ModuleBase<Media | Media[]> {
  private fetcher: Fetcher<Media | Media[]>;

  constructor(config: ModuleBaseConfig<Media | Media[]>) {
    super(config);
    this.fetcher = this.createFetcher(config.baseUrl, config.apiKey);
  }

  async getTeamMediaForYear(teamNumber: number, year: number, options?: FetcherOptions) {
    const res = await this.fetcher.fetch(
      `/team/frc${teamNumber}/media/${year}`,
      this.getFetcherOptions(options)
    );
    return z.array(MediaSchema).parseAsync(res.data);
  }

  }

