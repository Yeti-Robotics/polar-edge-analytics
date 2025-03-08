"use client";

import { useStandForm } from "./FormProvider";
import {
	AutoPeriod,
	Endgame,
	MatchDetail,
	Miscellaneous,
	TeleopPeriod,
} from "./steps";

export function StandForm() {
	const { currentStep } = useStandForm();

	switch (currentStep?.id) {
		case "match_detail":
			return <MatchDetail />;
		case "auto":
			return <AutoPeriod />;
		case "teleop":
			return <TeleopPeriod />;
		case "endgame":
			return <Endgame />;
		case "misc":
			return <Miscellaneous />;
		default:
			return null;
	}
}
