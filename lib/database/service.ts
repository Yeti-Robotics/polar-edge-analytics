import { createClient } from "@supabase/supabase-js";

/**
 * SHOULD ONLY EVER BE USED ON SERVER
 */
export function createServiceClient() {
	return createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_KEY!,
		{
			auth: {
				persistSession: false,
				autoRefreshToken: false,
				detectSessionInUrl: false,
			},
		}
	);
}
