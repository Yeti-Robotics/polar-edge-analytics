import { Button } from "@repo/ui/components/button";
import { auth, signIn, signOut } from "@/lib/auth";

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
		</main>
	);
}
