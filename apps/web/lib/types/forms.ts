import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
import { standForm } from "@/lib/database/schema";

export type StandForm = InferSelectModel<typeof standForm>;
export type NewStandForm = InferInsertModel<typeof standForm>;
export type StandFormUpdate = Partial<NewStandForm>;

export interface DuplicateFormGroup {
	teamNumber: number;
	matchId: string;
	count: number;
	forms: StandForm[];
}
