import { Button } from "@repo/ui/components/button";
import { auth, banUser, signIn, signOut } from "@/app/auth/auth";

export default async function Home() {
	const session = await auth();

	return (
		<main className="relative">
			<form
				action={async () => {
					"use server";
					if (session?.user) {
						await signOut();
					} else {
						await signIn();
					}
				}}
			>
				{session?.user ? (
					<Button>Logout</Button>
				) : (
					<Button>Login</Button>
				)}
			</form>
			<pre>{JSON.stringify(session, null, 2)}</pre>
			{session?.user?.id && (
				<form
					action={async () => {
						"use server";
						await banUser(session.user.id as string);
					}}
				>
					<Button type="submit">Ban User</Button>
				</form>
			)}
		</main>
	);
}
