import { auth } from "@/lib/auth";
import { AuthErrors, authorized, redirectError } from "@/lib/auth/utils";
import { UserRole } from "@repo/database/schema";
import { Toaster } from "@repo/ui/components/toaster";


export default async function ScoutLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!authorized({
        requiredRole: UserRole.USER,
        currentUserRole: session?.user.role
    })) {
        redirectError(AuthErrors.UNAUTHORIZED);
    }

    return <main>
        <div>{children}</div>
        <Toaster />
    </main>
}
