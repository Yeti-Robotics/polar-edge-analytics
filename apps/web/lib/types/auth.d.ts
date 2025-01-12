import "next-auth";
import { UserRole } from "@repo/database/schema";

declare module "next-auth" {
	// eslint-disable-next-line no-unused-vars
	interface User {
		role: UserRole;
		guildNickname: string | null;
		emailVerified: Date | null;
	}

	// eslint-disable-next-line no-unused-vars
	interface Session {
		user: {
			id: string;
			name: string;
			guildNickname: string | null;
			role: UserRole;
		};
	}

	// eslint-disable-next-line no-unused-vars
	interface Profile {
		guildNickname: string,
		image_url: string
	}
}
