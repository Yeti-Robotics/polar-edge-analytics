import { z } from "zod";
import { DistrictRanking, DistrictRankingSchema } from "../../schemas/rankings";
import { FetcherOptions } from "../../fetcher/types";
import { Fetcher } from "../../fetcher";
import { ModuleBase, ModuleBaseConfig } from "./base";

/**
 * @description A module for interacting with The Blue Alliance Team API
 *
 * @see https://www.thebluealliance.com/apidocs/v3
 */
export class RankingResource extends ModuleBase<DistrictRanking[]> {
    private fetcher: Fetcher<DistrictRanking[]>;

    constructor(config: ModuleBaseConfig<DistrictRanking[]>) {
    super(config);
    this.fetcher = this.createFetcher(config.baseUrl, config.apiKey);
    }

    async getDistrictRanking(districtKey: string, options?: FetcherOptions) {
    const res = await this.fetcher.fetch(
            `/district/${districtKey}/rankings`,
            this.getFetcherOptions(options)
            );
            return z.array(DistrictRankingSchema).nullable().parseAsync(res.data);
    }
}
