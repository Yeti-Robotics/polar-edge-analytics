import { MetricType } from "@/schema";
import { buildMetrics, metric, Metric } from "./builder/metrics";
import { GamePeriods } from "./gamePeriod";

enum CageClimb {
    DEEP_CLIMB = "deep",
    SHALLOW_CLIMB = "shallow",
    PARK = "park"
}

const metrics: Metric[] = buildMetrics(
    metric("Left Black Line")
        .description("Robot made it past the black line")
        .type(MetricType.BOOLEAN)
        .periods(GamePeriods.AUTO),
    metric("Coral Level 1")
        .description("Coral scored on Level 1")
        .periods(GamePeriods.AUTO, GamePeriods.TELEOP),
    metric("Coral Level 2")
        .description("Coral scored on Level 2")
        .periods(GamePeriods.AUTO, GamePeriods.TELEOP),
    metric("Coral Level 3")
        .description("Coral scored on Level 3")
        .periods(GamePeriods.AUTO, GamePeriods.TELEOP),
    metric("Coral Level 4")
        .description("Coral scored on Level 4")
        .periods(GamePeriods.AUTO, GamePeriods.TELEOP),
    metric("Algae in Net")
        .description("Algae scored in net")
        .periods(GamePeriods.AUTO, GamePeriods.TELEOP),
    metric("Algae in Processed")
        .description("Algae scored in processor")
        .periods(GamePeriods.AUTO, GamePeriods.TELEOP),
    metric("Algae thrown")
        .description("Algae scored by human player")
        .periods(GamePeriods.AUTO, GamePeriods.TELEOP),
    metric("Cage")
        .description("Action taken by robot in cage area")
        .type(MetricType.ENUMERATED)
        .enum(CageClimb),
    metric("Comments")
    .description("Comments on robot performance")
    .type(MetricType.TEXTUAL)
);