import { StandFormProvider } from "./FormProvider";
import { Card } from "@repo/ui/components/card";
import { FormProgress } from "./FormProgress";
import { FormNavigation } from "./FormNavigation";
import { FormHeader } from "./FormHeader";

export function FormLayout({ children }: { children: React.ReactNode }) {
	return (
		<StandFormProvider>
			<div className="max-w-md mx-auto flex flex-col gap-y-4">
				<Card className="rounded-md overflow-hidden">
					<FormProgress />
					<FormHeader />
					{children}
					<FormNavigation />
				</Card>
			</div>
		</StandFormProvider>
	);
}
