import { signIn } from "@/lib/auth";
import { discordProvider } from "@/lib/auth/auth";

export default function SignInPage() {
	return (
		<>
			<form
				action={async () => {
					"use server";
					await signIn(discordProvider.id, { redirectTo: "/scout" });
				}}
			>
				<button type="submit">Sign in With Discord</button>
			</form>
		</>
	);
}
