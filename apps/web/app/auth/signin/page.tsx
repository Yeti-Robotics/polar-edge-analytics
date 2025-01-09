import { discordProvider, signIn } from "../auth";

export default function SignInPage() {
    return (
        <>
            <button onClick={async () => {
                "use server"
                await signIn(discordProvider.id, { redirectTo: "/scout" })
            }}>Sign in With Discord</button><br />
        </>
    )
}