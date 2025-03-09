import { checkSession } from "@/lib/auth/utils";
import { UserRole } from "@/lib/database/schema";
import { FormLayout } from "./form/FormLayout";
import { StandForm } from "./form/StandForm";

export default async function ScoutingPage() {
	await checkSession(UserRole.USER);
	
	return (
		<FormLayout>
			<StandForm />
		</FormLayout>
	);
}
