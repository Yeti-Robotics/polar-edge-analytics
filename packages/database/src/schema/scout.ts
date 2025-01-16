import { enumToPgEnum } from "@/utils";
import { pgEnum, pgTable, varchar, integer, date, boolean, primaryKey, timestamp, uuid, text, serial, check, PgColumnBuilder, ExtraConfigColumn } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { ColumnBaseConfig, ColumnBuilderBaseConfig, ColumnDataType, sql } from "drizzle-orm";

export enum Alliance {
    RED = "red",
    BLUE = "blue"
}

export enum MetricType {
    NUMERIC = "numeric",
    BOOLEAN = "boolean",
    ENUMERATED = "enumerated",
    TEXTUAL = "text"
}

export const allianceEnum = pgEnum("alliance", enumToPgEnum(Alliance));
export const metricTypeEnum = pgEnum("metric_type", enumToPgEnum(MetricType));

export const tournament = pgTable("tournament", {
    id: varchar("id", { length: 20 }).primaryKey(),
    name: varchar().notNull(),
    startDate: date().notNull(),
    endDate: date().notNull(),
});

export const team = pgTable("team", {
    id: integer().primaryKey(),
    name: varchar().notNull(),
});

export const teamMatch = pgTable("team_match", {
    id: serial().primaryKey(),
    tournamentId: varchar("tournament_id", { length: 20 }).references(() => tournament.id).notNull(),
    teamNumber: integer().references(() => team.id).notNull(),
    matchNumber: integer(),
    alliance: allianceEnum().notNull(),
    alliancePosition: integer().notNull(),
}, (table) => {
    return [{
        matchPk: primaryKey({ columns: [table.tournamentId, table.teamNumber, table.matchNumber] })
    }]
});

export const tag = pgTable("tag", {
    id: serial().primaryKey(),
    name: varchar().notNull().unique(),
    description: varchar()
});

export const metricEnum = pgTable("metric_enum", {
    id: serial().primaryKey(),
    name: varchar().notNull().unique(),
});

export const metricEnumValues = pgTable("metric_enum_values", {
    id: serial().primaryKey(),
    enumId: integer().references(() => metricEnum.id).notNull(),
    value: varchar().notNull(),
});

export const metric = pgTable("metric", {
    id: varchar("id", { length: 20 }).primaryKey(),
    name: varchar().notNull().unique(),
    description: varchar(),
    type: metricTypeEnum("metric_value_type").notNull(),
    enumId: integer().references(() => metricEnum.id),
}, (table) => [{
    metricEnumConstraint: check("metric_enumerated_constraint", sql`${table.type} = 'enumerated' AND (${table.enumId} IS NOT NULL)`)
}]);

export const gamePeriod = pgTable("game_period", {
    id: serial().primaryKey(),
    period: varchar().notNull(),
});

export const statistic = pgTable("statistic", {
    id: serial().primaryKey(),
    metricId: varchar("metric_id", { length: 20 }).references(() => metric.id).notNull(),
    periodId: integer().references(() => gamePeriod.id).notNull(),
});

export const metricTags = pgTable("metric_tags", {
    tagId: integer().references(() => tag.id),
    metricId: varchar("metric_id", { length: 20 }).references(() => metric.id),
}, (table) => [{
    metricTagPk: primaryKey({ columns: [table.tagId, table.metricId] })
}]);

export const submission = pgTable("submission", {
    id: uuid().primaryKey(),
    scoutId: uuid("user_id").references(() => users.id).notNull(),
    teamMatchId: integer().references(() => teamMatch.id).notNull(),
    submittedAt: timestamp().notNull(),
});

// submission statistics tables
type TableSchema = {
    submissionId: ExtraConfigColumn<ColumnBaseConfig<ColumnDataType, string>>;
    statisticId: ExtraConfigColumn<ColumnBaseConfig<ColumnDataType, string>>;
    statisticValue: ExtraConfigColumn<ColumnBaseConfig<ColumnDataType, string>>; // `value` will vary based on the table
};

type ConstraintFn<T extends TableSchema> = (table: T) => Array<ReturnType<typeof check> | ReturnType<typeof primaryKey>>;

const createSubmissionStatisticTable = <T extends ColumnBuilderBaseConfig<ColumnDataType, string>>(tableName: string, value_column: PgColumnBuilder<T>, extraConfig?: ConstraintFn<TableSchema>) => {
    return pgTable(tableName, {
        submissionId: uuid().references(() => submission.id),
        statisticId: integer().references(() => statistic.id),
        statisticValue: value_column.notNull()
    }, (table) => [{
        submissionNumericPk: primaryKey({ columns: [table.submissionId, table.statisticId] }),
    }, ...(extraConfig ? extraConfig(table) : [])]);
}

export const submissionNumericStatistic = createSubmissionStatisticTable("submission_numeric_statistic", integer(), (table) => [{
    validNumericConstraint: check("nonnegative_constraint", sql`${table.statisticValue} >= 0`)
}])

export const submissionBooleanStatistic = createSubmissionStatisticTable("submission_boolean_statistic", boolean());

export const submissionTextStatistic = createSubmissionStatisticTable("submission_textual_statistic", text());

export const submissionEnumStatistic = createSubmissionStatisticTable("submission_enumerated_statistic", integer().references(() => metricEnumValues.id));