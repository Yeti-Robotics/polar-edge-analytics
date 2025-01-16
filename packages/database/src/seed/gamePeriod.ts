import db from "@/database";
import { gamePeriod } from "@/schema";

export enum GamePeriods {
    AUTO = "auto",
    TELEOP = "teleop",
    ENDGAME = "endgame"
}

const gamePeriodValues = Object.values(GamePeriods).map(g => ({ period: g }));

export const sql = db.insert(gamePeriod).values(gamePeriodValues).getSQL();