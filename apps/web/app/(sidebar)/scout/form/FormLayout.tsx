import { FormHeader } from "./FormHeader";
import { FormNavigation } from "./FormNavigation";
import { FormProgress } from "./FormProgress";
import { StandFormProvider } from "./FormProvider";

import { Card } from "@repo/ui/components/card";

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
