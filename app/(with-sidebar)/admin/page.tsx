import { Button } from "@/lib/components/ui/button";
import { seedData } from "@/lib/data/seedData";
import { revalidateEvent } from "./revalidate-event";

export default function AdminPage() {
	return (
		<div>
			<h1>Admin Page</h1>
			<form action={seedData}>
				<Button type="submit">Seed data</Button>
			</form>
			<form action={revalidateEvent}>
				<Button type="submit">Revalidate event</Button>
			</form>
		</div>
	);
}
