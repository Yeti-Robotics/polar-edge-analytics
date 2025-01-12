import { providers, signIn } from "@/lib/auth";

export default function SignInPage() {
	return (
		<>
			<form
				action={async () => {
					"use server";
					await signIn(providers.discord, { redirectTo: "/scout" });
				}}
			>
				<button type="submit">Sign in With Discord</button>
			</form>
		</>
	);
}
