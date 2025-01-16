import { MetricType } from "@/schema"
import { GamePeriods } from "../gamePeriod";

type BaseMetric = {
    id: string,
    name: string,
    description?: string,
    gamePeriods: GamePeriods[]
}

export type Metric = (BaseMetric & { type: MetricType.ENUMERATED, enum: Record<string, string> }) |
    (BaseMetric & { type: MetricType });

export class MetricBuilder {
    public metricId?: string;
    public metricName: string;
    public metricGamePeriods: GamePeriods[] = [];
    public metricType: MetricType = MetricType.NUMERIC;
    public metricEnum?: Record<string, string>;
    public metricDescription?: string;

    constructor(name: string, id?: string) {
        this.metricId = id;
        this.metricName = name;
    }

    get id(): string {
        return (this.metricId ? this.metricName.toLowerCase().split(" ").join("_") : this.metricId)!;
    }

    identifier(newId: string) {
        this.metricId = this.id;
        return this;
    }

    periods(...gamePeriods: GamePeriods[]) {
        this.metricGamePeriods = [...this.metricGamePeriods, ...gamePeriods]
        return this;
    }

    description(description: string) {
        this.metricDescription = description;
        return this;
    }

    type(metricValueType: MetricType) {
        this.metricType = metricValueType;
        return this;
    }

    enum(enumeratedValues: Record<string, string>) {
        this.metricEnum = enumeratedValues;
        return this;
    }

    build(): Metric {
        if (this.metricType === MetricType.ENUMERATED && !this.metricEnum) {
            throw new Error(`Enumerated metric \"${this.metricName}\" must have enum!`);
        }

        return {
            id: this.id,
            name: this.metricName,
            description: this.metricDescription,
            gamePeriods: this.metricGamePeriods,
            type: this.metricType,
            enum: this.metricEnum
        }
    }
}

export const metric = (name: string, id?: string) => {
    return new MetricBuilder(name, id);
}

export const buildMetrics = (...metrics: MetricBuilder[]) => {
    return metrics.map(m => m.build());
}