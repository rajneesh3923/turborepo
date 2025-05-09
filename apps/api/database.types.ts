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
      agent_registration: {
        Row: {
          aadhar_image: string | null
          aadhar_number: string | null
          address: string | null
          address_image: string | null
          agency_name: string | null
          agent_id: number
          agent_name: string
          created_at: string | null
          email: string
          is_active: boolean | null
          logo: string | null
          pan_image: string | null
          pan_number: string | null
          phone_number: string | null
          primary_payment: Json | null
          rating: number | null
          secondary_payment: Json | null
          updated_at: string | null
        }
        Insert: {
          aadhar_image?: string | null
          aadhar_number?: string | null
          address?: string | null
          address_image?: string | null
          agency_name?: string | null
          agent_id?: number
          agent_name: string
          created_at?: string | null
          email: string
          is_active?: boolean | null
          logo?: string | null
          pan_image?: string | null
          pan_number?: string | null
          phone_number?: string | null
          primary_payment?: Json | null
          rating?: number | null
          secondary_payment?: Json | null
          updated_at?: string | null
        }
        Update: {
          aadhar_image?: string | null
          aadhar_number?: string | null
          address?: string | null
          address_image?: string | null
          agency_name?: string | null
          agent_id?: number
          agent_name?: string
          created_at?: string | null
          email?: string
          is_active?: boolean | null
          logo?: string | null
          pan_image?: string | null
          pan_number?: string | null
          phone_number?: string | null
          primary_payment?: Json | null
          rating?: number | null
          secondary_payment?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      flight_bookings: {
        Row: {
          agent_id: string
          created_at: string
          flight_request_id: string
          id: string
          payment_done: boolean
          quotation_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          agent_id: string
          created_at: string
          flight_request_id: string
          id?: string
          payment_done?: boolean
          quotation_id: string
          status?: string
          updated_at: string
          user_id: string
        }
        Update: {
          agent_id?: string
          created_at?: string
          flight_request_id?: string
          id?: string
          payment_done?: boolean
          quotation_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flight_bookings_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flight_bookings_flight_request_id_fkey"
            columns: ["flight_request_id"]
            isOneToOne: false
            referencedRelation: "flight_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flight_bookings_quotation_id_fkey"
            columns: ["quotation_id"]
            isOneToOne: false
            referencedRelation: "flight_request_quotation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flight_bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      flight_request_quotation: {
        Row: {
          airline_name: string
          arrival_time: string
          created_at: string
          departure_time: string
          fare: number
          flight_request_id: string
          id: string
          status: string | null
          user_id: string
        }
        Insert: {
          airline_name: string
          arrival_time: string
          created_at?: string
          departure_time: string
          fare: number
          flight_request_id: string
          id?: string
          status?: string | null
          user_id: string
        }
        Update: {
          airline_name?: string
          arrival_time?: string
          created_at?: string
          departure_time?: string
          fare?: number
          flight_request_id?: string
          id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flight_request_quotation_agent_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flight_request_quotation_flight_request_id_fkey"
            columns: ["flight_request_id"]
            isOneToOne: false
            referencedRelation: "flight_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      flight_requests: {
        Row: {
          class_type: string
          created_at: string | null
          departure_city: string
          destination_city: string
          id: string
          num_passengers: number
          prefered_timing: string | null
          return_date: string | null
          round_trip: boolean
          status: Database["public"]["Enums"]["FlightRequestEnum"]
          travel_date: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          class_type?: string
          created_at?: string | null
          departure_city: string
          destination_city: string
          id?: string
          num_passengers?: number
          prefered_timing?: string | null
          return_date?: string | null
          round_trip?: boolean
          status?: Database["public"]["Enums"]["FlightRequestEnum"]
          travel_date: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          class_type?: string
          created_at?: string | null
          departure_city?: string
          destination_city?: string
          id?: string
          num_passengers?: number
          prefered_timing?: string | null
          return_date?: string | null
          round_trip?: boolean
          status?: Database["public"]["Enums"]["FlightRequestEnum"]
          travel_date?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flight_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notification: {
        Row: {
          body: string
          created_at: string
          flight_request_id: string | null
          from_user_id: string | null
          id: string
          is_read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          flight_request_id?: string | null
          from_user_id?: string | null
          id?: string
          is_read?: boolean
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          flight_request_id?: string | null
          from_user_id?: string | null
          id?: string
          is_read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_flight_request_id_fkey"
            columns: ["flight_request_id"]
            isOneToOne: false
            referencedRelation: "flight_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          phone: string | null
          profilePicURL: string | null
          role: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name?: string | null
          phone?: string | null
          profilePicURL?: string | null
          role?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          phone?: string | null
          profilePicURL?: string | null
          role?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_flight_request_quotations: {
        Args: {
          fr_id: string
          p_limit: number
          p_offset: number
        }
        Returns: {
          id: string
          user_id: string
          created_at: string
          flight_request_id: string
          fare: number
          airline_name: string
          arrival_time: string
          departure_time: string
          status: string
          accepted: boolean
        }[]
      }
    }
    Enums: {
      FlightRequestEnum: "Available" | "Reserved" | "OnHold"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
