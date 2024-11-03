import "next-auth";

export type UserRole = "admin" | "user";

declare module "next-auth" {
	// eslint-disable-next-line no-unused-vars
	interface User {
		role: UserRole;
		guildNickname: string | null;
		isBanned: boolean;
	}

	// eslint-disable-next-line no-unused-vars
	interface Session {
		user: {
			id: string;
			name: string;
			guildNickname: string | null;
			role: UserRole;
			isBanned: boolean;
		};
	}
}
