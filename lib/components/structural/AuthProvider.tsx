"use client";

import { createContext, useContext } from "react";
import { createClient } from "@/lib/database/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export const AuthContext = createContext({} as User);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const supabase = createClient();
	const [user, setUser] = useState({} as User);

	useEffect(() => {
		supabase.auth.getUser().then(({ data }) => {
			if (data.user) {
				setUser(data.user);
			}
		});
	}, []);

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useUser = () => useContext(AuthContext);
