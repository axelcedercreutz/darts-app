export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      game_participants: {
        Row: {
          created_at: string
          game_id: string
          id: string
          participant_id: string
        }
        Insert: {
          created_at?: string
          game_id: string
          id?: string
          participant_id: string
        }
        Update: {
          created_at?: string
          game_id?: string
          id?: string
          participant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_participants_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          created_at: string | null
          current_leg: string | null
          current_round: string | null
          ended_at: string | null
          game_goal: number | null
          game_status: Database["public"]["Enums"]["game_statuses"]
          id: string
          legs_to_win: number
          mode: Database["public"]["Enums"]["game_modes"]
          type: Database["public"]["Enums"]["game_types"]
          winner: string | null
        }
        Insert: {
          created_at?: string | null
          current_leg?: string | null
          current_round?: string | null
          ended_at?: string | null
          game_goal?: number | null
          game_status?: Database["public"]["Enums"]["game_statuses"]
          id?: string
          legs_to_win?: number
          mode?: Database["public"]["Enums"]["game_modes"]
          type?: Database["public"]["Enums"]["game_types"]
          winner?: string | null
        }
        Update: {
          created_at?: string | null
          current_leg?: string | null
          current_round?: string | null
          ended_at?: string | null
          game_goal?: number | null
          game_status?: Database["public"]["Enums"]["game_statuses"]
          id?: string
          legs_to_win?: number
          mode?: Database["public"]["Enums"]["game_modes"]
          type?: Database["public"]["Enums"]["game_types"]
          winner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "games_current_leg_fkey"
            columns: ["current_leg"]
            isOneToOne: false
            referencedRelation: "legs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_current_round_fkey"
            columns: ["current_round"]
            isOneToOne: false
            referencedRelation: "rounds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_winner_fkey"
            columns: ["winner"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      legs: {
        Row: {
          created_at: string
          ended_at: string | null
          game_id: string
          id: string
          leg_number: number
          winner: string | null
        }
        Insert: {
          created_at?: string
          ended_at?: string | null
          game_id: string
          id?: string
          leg_number: number
          winner?: string | null
        }
        Update: {
          created_at?: string
          ended_at?: string | null
          game_id?: string
          id?: string
          leg_number?: number
          winner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "legs_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "legs_winner_fkey"
            columns: ["winner"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rounds: {
        Row: {
          created_at: string
          game_id: string
          id: string
          leg_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          game_id: string
          id?: string
          leg_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          game_id?: string
          id?: string
          leg_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rounds_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rounds_leg_id_fkey"
            columns: ["leg_id"]
            isOneToOne: false
            referencedRelation: "legs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rounds_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      throws: {
        Row: {
          created_at: string | null
          game_id: string
          id: string
          leg_id: string
          multiplier: number
          round_id: string
          sector: number
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string | null
          game_id: string
          id?: string
          leg_id: string
          multiplier: number
          round_id: string
          sector: number
          user_id: string
          value: number
        }
        Update: {
          created_at?: string | null
          game_id?: string
          id?: string
          leg_id?: string
          multiplier?: number
          round_id?: string
          sector?: number
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "throws_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "throws_leg_id_fkey"
            columns: ["leg_id"]
            isOneToOne: false
            referencedRelation: "legs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "throws_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "rounds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "throws_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      game_modes: "X01" | "AROUND_THE_CLOCK" | "1_TO_20" | "27_DOWN"
      game_statuses: "ACTIVE" | "COMPLETED"
      game_types: "COMPETITION" | "PRACTICE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

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
    : never
