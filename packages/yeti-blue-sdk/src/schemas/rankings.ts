import { z } from "zod";

export const DistrictEventPointsSchema = z.object({
    district_cmp: z.boolean(),
    total: z.number().min(0),
    alliance_points: z.number().min(0),
    elim_points: z.number().min(0),
    award_points: z.number().min(0),
    event_key: z.string(),
    qual_points: z.number().min(0)
})

export const DistrictRankingSchema = z.object({
    team_key: z.string().regex(/^frc\d+$/),
    rank: z.number().positive(),
    rookie_bonus: z.number().min(0).optional(),
    point_total: z.number().min(0),
    event_points: z.array(DistrictEventPointsSchema).optional()
})

export const RegionalPoolRankingSchema = z.object({
    team_key: z.string().regex(/^frc\d+$/),
    rank: z.number().positive(),
    rookie_bonus: z.number().min(0).optional(),
    point_total: z.number().min(0),
    single_event_bonus: z.number().min(0).optional(),
    event_points: z.array(DistrictEventPointsSchema).optional()
})

export type DistrictRanking = z.infer<typeof DistrictRankingSchema>
export type RegionalPoolRanking = z.infer<typeof RegionalPoolRankingSchema>