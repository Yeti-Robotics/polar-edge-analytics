import { auth } from "@/app/auth/auth";

export default async function ScoutingPage() {
	const session = await auth();

	if (!session?.user?.id) {
		return <div>You must be logged in to view this page</div>;
	}

	return <div>scout here</div>;
}
