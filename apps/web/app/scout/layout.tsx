import { auth, AuthErrors, authorized, redirectError } from "@/lib/auth";
import { UserRole } from "@repo/database/schema";


export default async function ScoutLayout({ children }: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!authorized(UserRole.USER, session?.user.role)) {
        redirectError(AuthErrors.UNAUTHORIZED);
    }

    return (
        <>{children}</>
    )
}