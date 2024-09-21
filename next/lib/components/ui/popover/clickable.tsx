import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from ".";

export const ClickablePopover = ({
	children,
	content,
}: {
	children: React.ReactNode;
	content: string;
}) => {
	const [open, setOpen] = useState(false);
	const tooltipDuration = 2000;

	useEffect(() => {
		if (open) {
			setTimeout(() => setOpen(false), tooltipDuration);
		}
	}, [open]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger>{children}</PopoverTrigger>
			<PopoverContent
				className="z-50 w-fit overflow-hidden text-pretty rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
				side="top"
			>
				{content}
			</PopoverContent>
		</Popover>
	);
};
