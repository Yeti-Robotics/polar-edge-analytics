"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formMetadata, StandFormData, standFormSchema } from "../data/schema";

export function FormProvider() {
	const form = useForm<StandFormData>({
		resolver: zodResolver(standFormSchema),
	});
}
