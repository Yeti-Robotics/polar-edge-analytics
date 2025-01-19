import { StandForm } from "./components/StandForm";
import { Toaster } from "@repo/ui/components/toaster";
import { submitStandForm } from "./data/action";

export default async function ScoutingPage() {
	return (
		<main>
			<StandForm onSubmit={submitStandForm} />
			<Toaster />
		</main>
	);
}
