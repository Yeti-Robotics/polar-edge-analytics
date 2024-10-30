export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			event: {
				Row: {
					end_date: string;
					event_key: string;
					event_name: string;
					is_current: boolean | null;
					start_date: string;
				};
				Insert: {
					end_date: string;
					event_key: string;
					event_name: string;
					is_current?: boolean | null;
					start_date: string;
				};
				Update: {
					end_date?: string;
					event_key?: string;
					event_name?: string;
					is_current?: boolean | null;
					start_date?: string;
				};
				Relationships: [];
			};
			match: {
				Row: {
					event_key: string;
					match_number: number;
				};
				Insert: {
					event_key: string;
					match_number: number;
				};
				Update: {
					event_key?: string;
					match_number?: number;
				};
				Relationships: [
					{
						foreignKeyName: "match_event_key_fkey";
						columns: ["event_key"];
						isOneToOne: false;
						referencedRelation: "event";
						referencedColumns: ["event_key"];
					},
				];
			};
			profile: {
				Row: {
					id: string;
					nick: string | null;
				};
				Insert: {
					id: string;
					nick?: string | null;
				};
				Update: {
					id?: string;
					nick?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "profile_id_fkey";
						columns: ["id"];
						isOneToOne: true;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			role_permissions: {
				Row: {
					id: number;
					permission: Database["public"]["Enums"]["app_permission"];
					role: Database["public"]["Enums"]["app_role"];
				};
				Insert: {
					id?: number;
					permission: Database["public"]["Enums"]["app_permission"];
					role: Database["public"]["Enums"]["app_role"];
				};
				Update: {
					id?: number;
					permission?: Database["public"]["Enums"]["app_permission"];
					role?: Database["public"]["Enums"]["app_role"];
				};
				Relationships: [];
			};
			schedule: {
				Row: {
					event_key: string;
					match_number: number;
					scouter: string;
					team_number: number;
				};
				Insert: {
					event_key: string;
					match_number: number;
					scouter: string;
					team_number: number;
				};
				Update: {
					event_key?: string;
					match_number?: number;
					scouter?: string;
					team_number?: number;
				};
				Relationships: [
					{
						foreignKeyName: "schedule_event_key_match_number_fkey";
						columns: ["event_key", "match_number"];
						isOneToOne: false;
						referencedRelation: "match";
						referencedColumns: ["event_key", "match_number"];
					},
					{
						foreignKeyName: "schedule_scouter_fkey";
						columns: ["scouter"];
						isOneToOne: false;
						referencedRelation: "profile";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "schedule_team_number_fkey";
						columns: ["team_number"];
						isOneToOne: false;
						referencedRelation: "team";
						referencedColumns: ["team_number"];
					},
				];
			};
			stand_form: {
				Row: {
					approved: boolean;
					auto_amp_notes: number;
					auto_shuttle_notes: number;
					auto_speaker_notes: number;
					climb: boolean;
					created_at: string;
					defense: number;
					event_key: string;
					id: number;
					initiation_line: boolean;
					match_number: number;
					notes: string;
					number_on_chain: number;
					park: boolean;
					scouter: string;
					spotlight: boolean;
					team_number: number;
					teleop_amp_notes: number;
					teleop_shuttle_notes: number;
					teleop_speaker_notes: number;
					trap_notes: number;
					updated_at: string;
				};
				Insert: {
					approved?: boolean;
					auto_amp_notes?: number;
					auto_shuttle_notes?: number;
					auto_speaker_notes?: number;
					climb?: boolean;
					created_at?: string;
					defense?: number;
					event_key: string;
					id?: number;
					initiation_line?: boolean;
					match_number: number;
					notes: string;
					number_on_chain?: number;
					park?: boolean;
					scouter: string;
					spotlight?: boolean;
					team_number: number;
					teleop_amp_notes?: number;
					teleop_shuttle_notes?: number;
					teleop_speaker_notes?: number;
					trap_notes?: number;
					updated_at?: string;
				};
				Update: {
					approved?: boolean;
					auto_amp_notes?: number;
					auto_shuttle_notes?: number;
					auto_speaker_notes?: number;
					climb?: boolean;
					created_at?: string;
					defense?: number;
					event_key?: string;
					id?: number;
					initiation_line?: boolean;
					match_number?: number;
					notes?: string;
					number_on_chain?: number;
					park?: boolean;
					scouter?: string;
					spotlight?: boolean;
					team_number?: number;
					teleop_amp_notes?: number;
					teleop_shuttle_notes?: number;
					teleop_speaker_notes?: number;
					trap_notes?: number;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "stand_form_event_key_match_number_fkey";
						columns: ["event_key", "match_number"];
						isOneToOne: false;
						referencedRelation: "match";
						referencedColumns: ["event_key", "match_number"];
					},
					{
						foreignKeyName: "stand_form_scouter_fkey";
						columns: ["scouter"];
						isOneToOne: false;
						referencedRelation: "profile";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "stand_form_team_number_fkey";
						columns: ["team_number"];
						isOneToOne: false;
						referencedRelation: "team";
						referencedColumns: ["team_number"];
					},
				];
			};
			team: {
				Row: {
					team_name: string;
					team_number: number;
				};
				Insert: {
					team_name: string;
					team_number: number;
				};
				Update: {
					team_name?: string;
					team_number?: number;
				};
				Relationships: [];
			};
			team_event: {
				Row: {
					event_key: string;
					team_number: number;
				};
				Insert: {
					event_key: string;
					team_number: number;
				};
				Update: {
					event_key?: string;
					team_number?: number;
				};
				Relationships: [
					{
						foreignKeyName: "team_event_event_key_fkey";
						columns: ["event_key"];
						isOneToOne: false;
						referencedRelation: "event";
						referencedColumns: ["event_key"];
					},
					{
						foreignKeyName: "team_event_team_number_fkey";
						columns: ["team_number"];
						isOneToOne: false;
						referencedRelation: "team";
						referencedColumns: ["team_number"];
					},
				];
			};
			team_match: {
				Row: {
					alliance: Database["public"]["Enums"]["alliance"];
					alliance_position: number;
					event_key: string;
					match_number: number;
					team_number: number;
				};
				Insert: {
					alliance: Database["public"]["Enums"]["alliance"];
					alliance_position: number;
					event_key: string;
					match_number: number;
					team_number: number;
				};
				Update: {
					alliance?: Database["public"]["Enums"]["alliance"];
					alliance_position?: number;
					event_key?: string;
					match_number?: number;
					team_number?: number;
				};
				Relationships: [
					{
						foreignKeyName: "team_match_event_key_match_number_fkey";
						columns: ["event_key", "match_number"];
						isOneToOne: false;
						referencedRelation: "match";
						referencedColumns: ["event_key", "match_number"];
					},
					{
						foreignKeyName: "team_match_team_number_fkey";
						columns: ["team_number"];
						isOneToOne: false;
						referencedRelation: "team";
						referencedColumns: ["team_number"];
					},
				];
			};
			user_roles: {
				Row: {
					id: number;
					role: Database["public"]["Enums"]["app_role"];
					user_id: string;
				};
				Insert: {
					id?: number;
					role: Database["public"]["Enums"]["app_role"];
					user_id: string;
				};
				Update: {
					id?: number;
					role?: Database["public"]["Enums"]["app_role"];
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "user_roles_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: true;
						referencedRelation: "profile";
						referencedColumns: ["id"];
					},
				];
			};
		};
		Views: {
			team_stats: {
				Row: {
					auto_amp_notes: number | null;
					auto_shuttle_notes: number | null;
					auto_speaker_notes: number | null;
					climb: boolean | null;
					defense: number | null;
					initiation_line: boolean | null;
					park: boolean | null;
					team_name: string | null;
					team_number: number | null;
					teleop_amp_notes: number | null;
					teleop_shuttle_notes: number | null;
					teleop_speaker_notes: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "stand_form_team_number_fkey";
						columns: ["team_number"];
						isOneToOne: false;
						referencedRelation: "team";
						referencedColumns: ["team_number"];
					},
				];
			};
		};
		Functions: {
			authorize: {
				Args: {
					requested_permission: Database["public"]["Enums"]["app_permission"];
				};
				Returns: boolean;
			};
			current_event: {
				Args: Record<PropertyKey, never>;
				Returns: string;
			};
			custom_access_token_hook: {
				Args: {
					event: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			alliance: "red" | "blue" | "none";
			app_permission: "admin.access" | "standform.submit";
			app_role: "admin" | "yeti-member";
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
				PublicSchema["Views"])
		? (PublicSchema["Tables"] &
				PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never;
