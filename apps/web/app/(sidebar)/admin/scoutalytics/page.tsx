import { db } from "@/lib/database";
import { standForm, users } from "@/lib/database/schema";
import { UserRole } from "@/lib/database/schema";
import { checkSession } from "@/lib/auth/utils";
import { count, desc, eq } from "drizzle-orm";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/table";

export default async function ScoutalyticsPage() {
	// Check if user has admin privileges
	await checkSession(UserRole.ADMIN);

	// Query to count forms submitted by each scout
	const scoutFormCounts = await db
		.select({
			userId: standForm.userId,
			name: users.name,
			guildNickname: users.guildNickname,
			formCount: count(standForm.id),
		})
		.from(standForm)
		.leftJoin(users, eq(standForm.userId, users.id))
		.groupBy(standForm.userId, users.name, users.guildNickname)
		.orderBy(desc(count(standForm.id)));

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-2xl font-bold mb-6">
				Scout Form Submission Analytics
			</h1>
			<div className="rounded-md border">
				<Table>
					<TableCaption>
						A list of scouts and the number of forms they have
						submitted
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[300px]">
								Scout Name
							</TableHead>
							<TableHead className="text-right">
								Forms Submitted
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{scoutFormCounts.map((scout) => (
							<TableRow key={scout.userId}>
								<TableCell className="font-medium">
									{scout.guildNickname ||
										scout.name ||
										"Unknown Scout"}
								</TableCell>
								<TableCell className="text-right">
									{scout.formCount}
								</TableCell>
							</TableRow>
						))}
						{scoutFormCounts.length === 0 && (
							<TableRow>
								<TableCell
									colSpan={2}
									className="text-center py-6 text-muted-foreground"
								>
									No form submissions found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
