import { UserRole } from "@/lib/database/schema";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import DownloadStandForms from "./download";

export default async function StandFormsPage() {
	const session = await auth();

	if (!session?.user || session.user.role !== UserRole.ADMIN) {
		redirect("/");
	}
	return (
		<div>
			<h1>Stand Forms Export</h1>
			<DownloadStandForms />
		</div>
	);
}
