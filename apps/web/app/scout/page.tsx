import { StandForm } from "./components/StandForm";
import { submitStandForm } from "./data/action";

export default async function ScoutingPage() {
	return (
		<StandForm onSubmit={submitStandForm} />
	);
}
