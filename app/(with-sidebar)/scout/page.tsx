import { StandForm } from "../../../lib/components/stand-form/form";
import { submitStandForm } from "./action";

export default async function ScoutingPage() {
	return <StandForm onSubmit={submitStandForm} />;
}
