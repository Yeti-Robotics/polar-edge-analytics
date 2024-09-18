import { Button } from "@/lib/components/ui/button";
import { seedData } from "@/lib/data/seedData";

export default function AdminPage() {
	return (
		<div>
			<h1>Admin Page</h1>
			<form action={seedData}>
				<Button type="submit">Seed data</Button>
			</form>
		</div>
	);
}
