import { auth } from "@/lib/auth";

export default async function ScoutingPage() {
	const session = await auth();

	if (!session?.user?.id) {
		return <div>You must be logged in to view this page</div>;
	}

	return <div>sidebar here</div>;

}

