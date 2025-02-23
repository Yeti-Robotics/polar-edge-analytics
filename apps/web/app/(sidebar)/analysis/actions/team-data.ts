import {
	createServerAction,
	ServerActionError,
} from "@/lib/actions/actions-utils";
import { db } from "@/lib/database";
import { Cage, match, standForm, team, teamMatch } from "@/lib/database/schema"
import { sql } from "drizzle-orm"

const getTeamDataQuery = (event_key: string) => sql<TeamData[]>`
WITH combinedStats AS (
    SELECT 
        tf.team_number, 
        tf.match_id, 
        AVG(tf.auto_coral_level1) AS auto_coral_level_1, 
        AVG(tf.auto_coral_level2) AS auto_coral_level_2, 
        AVG(tf.auto_coral_level3) AS auto_coral_level_3, 
        AVG(tf.auto_coral_level4) AS auto_coral_level_4,
        AVG(tf.auto_algae_processed) AS auto_algae_processor, 
        AVG(tf.auto_algae_netted) AS auto_algae_net,
        AVG(tf.teleop_coral_level1) AS teleop_coral_level_1, 
        AVG(tf.teleop_coral_level2) AS teleop_coral_level_2, 
        AVG(tf.teleop_coral_level3) AS teleop_coral_level_3, 
        AVG(tf.teleop_coral_level4) AS teleop_coral_level_4,
        AVG(tf.teleop_algae_processed) AS teleop_algae_processor, 
        AVG(tf.teleop_algae_netted) AS teleop_algae_net,
        AVG(tf.teleop_algae_thrown) AS teleop_algae_thrown, 
        AVG(tf.defense_rating) AS defense_rating,
        CAST(SUM(CASE WHEN tf.left_black_line THEN 1 ELSE 0 END) AS REAL) / COUNT(*) AS initiation_line,
        CAST(SUM(CASE WHEN tf.cage_climb = ${Cage.PARK} THEN 1 ELSE 0 END) AS REAL) / COUNT(*) AS park_percentage,
        CAST(SUM(CASE WHEN tf.cage_climb = ${Cage.SHALLOW} THEN 1 ELSE 0 END) AS REAL) / COUNT(*) AS deep_percentage,
        CAST(SUM(CASE WHEN tf.cage_climb = ${Cage.DEEP} THEN 1 ELSE 0 END) AS REAL) / COUNT(*) AS shallow_percentage
    FROM ${standForm} tf
    GROUP BY tf.team_number
),
teamMatches AS (
    SELECT 
        tm.team_number, 
        t.team_name, 
        tm.match_id,
        m.event_key
    FROM ${teamMatch} tm 
    JOIN ${team} t ON tm.team_number = t.team_number
    JOIN ${match} m ON tm.match_id = m.match_id
)
SELECT
    cs.auto_coral_level_1,
    cs.auto_coral_level_2,
    cs.auto_coral_level_3,
    cs.auto_coral_level_4,
    cs.auto_algae_processor,
    cs.auto_algae_net,
    cs.teleop_coral_level_1,
    cs.teleop_coral_level_2,
    cs.teleop_coral_level_3,
    cs.teleop_coral_level_4,
    cs.teleop_algae_processor,
    cs.teleop_algae_net,
    cs.teleop_algae_thrown,
    cs.defense_rating,
    cs.initiation_line,
    cs.park_percentage,
    cs.deep_percentage,
    cs.shallow_percentage,
    tm.team_number,
    tm.team_name
FROM
    combinedStats cs
JOIN
    teamMatches tm ON cs.team_number = tm.team_number AND cs.match_id = tm.match_id
WHERE
    tm.event_key = ${event_key ?? "''"}
ORDER BY
    tm.team_number
`;

export const scoutedTeamData = createServerAction(async (id: string) => {
	try {
		const queryResult = await db.execute(getTeamDataQuery(id));
		return queryResult.rows as TeamData[];
	} catch (error) {
		console.error("Error fetching team data:", error);
		throw new ServerActionError("Failed to fetch team data");
	}
});

export type TeamData = {
	team_number: number;
	team_name: string;
	auto_coral_level_1: number;
	auto_coral_level_2: number;
	auto_coral_level_3: number;
	auto_coral_level_4: number;
	auto_algae_processor: number;
	auto_algae_net: number;
	teleop_coral_level_1: number;
	teleop_coral_level_2: number;
	teleop_coral_level_3: number;
	teleop_coral_level_4: number;
	teleop_algae_processor: number;
	teleop_algae_net: number;
	teleop_algae_thrown: number;
	park_percentage: number;
	shallow_percentage: number;
	deep_percentage: number;
	initiation_line: number;
	defense_rating: number;
};
