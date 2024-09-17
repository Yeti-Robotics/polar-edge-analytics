import { AuthProvider } from "@/lib/components/structural/AuthProvider";
import { NavSidebar } from "@/lib/components/structural/navbar";

export default function WithSidebar({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AuthProvider>
			<NavSidebar>{children}</NavSidebar>
		</AuthProvider>
	);
}
