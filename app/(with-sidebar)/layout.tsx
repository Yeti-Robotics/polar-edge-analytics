import { NavSidebar } from "@/lib/components/structural/navbar";

export default function WithSidebar({
	children,
}: {
	children: React.ReactNode;
}) {
	return <NavSidebar>{children}</NavSidebar>;
}
