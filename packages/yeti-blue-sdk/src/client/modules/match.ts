import { Fetcher } from "../../fetcher";
import { Team, TeamSchema } from "../../schemas/team";

import { ModuleBase, ModuleBaseConfig } from "./base";

export class MatchResource extends ModuleBase<Team> {
  private fetcher: Fetcher<Team>;

  constructor(config: ModuleBaseConfig<Team>) {
    super(config);
    this.fetcher = this.createFetcher(config.baseUrl, config.apiKey);
  }

  async get(teamNumber: number) {
    const response = await this.fetcher.fetch(`/team/frc${teamNumber}`);
    return TeamSchema.parseAsync(response.data);
  }
}
