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
      instruments: {
        Row: {
          category: string
          created_at: string | null
          current_price: number | null
          id: string
          is_active: boolean | null
          market_cap: number | null
          name: string
          price_change: number | null
          price_change_percent: number | null
          symbol: string
          updated_at: string | null
          volume: number | null
        }
        Insert: {
          category: string
          created_at?: string | null
          current_price?: number | null
          id?: string
          is_active?: boolean | null
          market_cap?: number | null
          name: string
          price_change?: number | null
          price_change_percent?: number | null
          symbol: string
          updated_at?: string | null
          volume?: number | null
        }
        Update: {
          category?: string
          created_at?: string | null
          current_price?: number | null
          id?: string
          is_active?: boolean | null
          market_cap?: number | null
          name?: string
          price_change?: number | null
          price_change_percent?: number | null
          symbol?: string
          updated_at?: string | null
          volume?: number | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      portfolios: {
        Row: {
          created_at: string | null
          current_balance: number | null
          id: string
          initial_balance: number | null
          name: string | null
          total_pnl: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_balance?: number | null
          id?: string
          initial_balance?: number | null
          name?: string | null
          total_pnl?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_balance?: number | null
          id?: string
          initial_balance?: number | null
          name?: string | null
          total_pnl?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      positions: {
        Row: {
          closed_at: string | null
          created_at: string | null
          current_price: number | null
          entry_price: number
          id: string
          instrument_id: string
          opened_at: string | null
          portfolio_id: string
          position_type: string
          quantity: number
          status: string | null
          stop_loss: number | null
          strategy_id: string | null
          take_profit: number | null
          unrealized_pnl: number | null
          updated_at: string | null
        }
        Insert: {
          closed_at?: string | null
          created_at?: string | null
          current_price?: number | null
          entry_price: number
          id?: string
          instrument_id: string
          opened_at?: string | null
          portfolio_id: string
          position_type: string
          quantity: number
          status?: string | null
          stop_loss?: number | null
          strategy_id?: string | null
          take_profit?: number | null
          unrealized_pnl?: number | null
          updated_at?: string | null
        }
        Update: {
          closed_at?: string | null
          created_at?: string | null
          current_price?: number | null
          entry_price?: number
          id?: string
          instrument_id?: string
          opened_at?: string | null
          portfolio_id?: string
          position_type?: string
          quantity?: number
          status?: string | null
          stop_loss?: number | null
          strategy_id?: string | null
          take_profit?: number | null
          unrealized_pnl?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "positions_instrument_id_fkey"
            columns: ["instrument_id"]
            isOneToOne: false
            referencedRelation: "instruments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "positions_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "positions_strategy_id_fkey"
            columns: ["strategy_id"]
            isOneToOne: false
            referencedRelation: "strategies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      strategies: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          parameters: Json | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parameters?: Json | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parameters?: Json | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      strategy_executions: {
        Row: {
          created_at: string | null
          id: string
          instrument_id: string
          is_active: boolean | null
          parameters: Json | null
          portfolio_id: string
          strategy_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          instrument_id: string
          is_active?: boolean | null
          parameters?: Json | null
          portfolio_id: string
          strategy_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          instrument_id?: string
          is_active?: boolean | null
          parameters?: Json | null
          portfolio_id?: string
          strategy_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strategy_executions_instrument_id_fkey"
            columns: ["instrument_id"]
            isOneToOne: false
            referencedRelation: "instruments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strategy_executions_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strategy_executions_strategy_id_fkey"
            columns: ["strategy_id"]
            isOneToOne: false
            referencedRelation: "strategies"
            referencedColumns: ["id"]
          },
        ]
      }
      trades: {
        Row: {
          commission: number | null
          created_at: string | null
          executed_at: string | null
          id: string
          instrument_id: string
          portfolio_id: string
          price: number
          quantity: number
          realized_pnl: number | null
          strategy_id: string | null
          total_amount: number
          trade_type: string
        }
        Insert: {
          commission?: number | null
          created_at?: string | null
          executed_at?: string | null
          id?: string
          instrument_id: string
          portfolio_id: string
          price: number
          quantity: number
          realized_pnl?: number | null
          strategy_id?: string | null
          total_amount: number
          trade_type: string
        }
        Update: {
          commission?: number | null
          created_at?: string | null
          executed_at?: string | null
          id?: string
          instrument_id?: string
          portfolio_id?: string
          price?: number
          quantity?: number
          realized_pnl?: number | null
          strategy_id?: string | null
          total_amount?: number
          trade_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "trades_instrument_id_fkey"
            columns: ["instrument_id"]
            isOneToOne: false
            referencedRelation: "instruments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trades_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trades_strategy_id_fkey"
            columns: ["strategy_id"]
            isOneToOne: false
            referencedRelation: "strategies"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
