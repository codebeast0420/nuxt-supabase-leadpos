export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      address: {
        Row: {
          address_id: number
          city: string
          company_id: number | null
          country: string
          created_at: string
          created_by: string | null
          line1: string
          line2: string | null
          neighborhood: string | null
          state: string
          updated_at: string | null
          zip_code: string
        }
        Insert: {
          address_id?: number
          city: string
          company_id?: number | null
          country: string
          created_at?: string
          created_by?: string | null
          line1: string
          line2?: string | null
          neighborhood?: string | null
          state: string
          updated_at?: string | null
          zip_code: string
        }
        Update: {
          address_id?: number
          city?: string
          company_id?: number | null
          country?: string
          created_at?: string
          created_by?: string | null
          line1?: string
          line2?: string | null
          neighborhood?: string | null
          state?: string
          updated_at?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "address_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "address_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      budget: {
        Row: {
          budget_id: number
          company_id: number | null
          created_at: string | null
          end_date: string | null
          start_date: string | null
          type: string | null
          updated_at: string | null
          value_in_cents: number | null
        }
        Insert: {
          budget_id?: number
          company_id?: number | null
          created_at?: string | null
          end_date?: string | null
          start_date?: string | null
          type?: string | null
          updated_at?: string | null
          value_in_cents?: number | null
        }
        Update: {
          budget_id?: number
          company_id?: number | null
          created_at?: string | null
          end_date?: string | null
          start_date?: string | null
          type?: string | null
          updated_at?: string | null
          value_in_cents?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "budget_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["company_id"]
          }
        ]
      }
      campaign: {
        Row: {
          budget_id: number
          campaign_id: number
          campaign_template_id: number
          company_id: number
          created_at: string
          lead_form_id: number | null
          status: string | null
          target_area_id: number
          target_audience_id: number
          updated_at: string | null
        }
        Insert: {
          budget_id: number
          campaign_id?: number
          campaign_template_id: number
          company_id?: number
          created_at?: string
          lead_form_id?: number | null
          status?: string | null
          target_area_id: number
          target_audience_id: number
          updated_at?: string | null
        }
        Update: {
          budget_id?: number
          campaign_id?: number
          campaign_template_id?: number
          company_id?: number
          created_at?: string
          lead_form_id?: number | null
          status?: string | null
          target_area_id?: number
          target_audience_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_budget_id_fkey"
            columns: ["budget_id"]
            isOneToOne: false
            referencedRelation: "budget"
            referencedColumns: ["budget_id"]
          },
          {
            foreignKeyName: "campaign_campaign_template_id_fkey"
            columns: ["campaign_template_id"]
            isOneToOne: false
            referencedRelation: "campaign_template"
            referencedColumns: ["campaign_template_id"]
          },
          {
            foreignKeyName: "campaign_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "campaign_lead_form_id_fkey"
            columns: ["lead_form_id"]
            isOneToOne: false
            referencedRelation: "lead_form"
            referencedColumns: ["lead_form_id"]
          },
          {
            foreignKeyName: "campaign_target_area_id_fkey"
            columns: ["target_area_id"]
            isOneToOne: false
            referencedRelation: "target_area"
            referencedColumns: ["target_area_id"]
          },
          {
            foreignKeyName: "campaign_target_audience_id_fkey"
            columns: ["target_audience_id"]
            isOneToOne: false
            referencedRelation: "target_audience"
            referencedColumns: ["target_audience_id"]
          }
        ]
      }
      campaign_template: {
        Row: {
          campaign_template_id: number
          created_at: string
          description: string | null
          heading_text: string | null
          images: string[]
          industry_ids: number[] | null
          language_code: string
          name: string | null
          primary_text: string | null
          updated_at: string | null
        }
        Insert: {
          campaign_template_id?: number
          created_at?: string
          description?: string | null
          heading_text?: string | null
          images?: string[]
          industry_ids?: number[] | null
          language_code?: string
          name?: string | null
          primary_text?: string | null
          updated_at?: string | null
        }
        Update: {
          campaign_template_id?: number
          created_at?: string
          description?: string | null
          heading_text?: string | null
          images?: string[]
          industry_ids?: number[] | null
          language_code?: string
          name?: string | null
          primary_text?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      campaign_template_default: {
        Row: {
          campaign_template_default_id: number
          campaign_template_id: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          campaign_template_default_id?: number
          campaign_template_id?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          campaign_template_default_id?: number
          campaign_template_id?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_template_default_campaign_template_id_fkey"
            columns: ["campaign_template_id"]
            isOneToOne: false
            referencedRelation: "campaign_template"
            referencedColumns: ["campaign_template_id"]
          }
        ]
      }
      campaign_template_user: {
        Row: {
          campaign_template_id: number | null
          campaign_template_user_id: number
          company_id: number | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          campaign_template_id?: number | null
          campaign_template_user_id?: number
          company_id?: number | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          campaign_template_id?: number | null
          campaign_template_user_id?: number
          company_id?: number | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_template_user_campaign_template_id_fkey"
            columns: ["campaign_template_id"]
            isOneToOne: false
            referencedRelation: "campaign_template"
            referencedColumns: ["campaign_template_id"]
          },
          {
            foreignKeyName: "campaign_template_user_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["company_id"]
          }
        ]
      }
      company: {
        Row: {
          active_facebook_page_id: number | null
          address_id: number | null
          company_id: number
          created_at: string
          created_by: string | null
          currency_code: string | null
          facebook_account_id: number | null
          industry_id: number | null
          name: string | null
          stripe_customer_id: string | null
          updated_at: string | null
        }
        Insert: {
          active_facebook_page_id?: number | null
          address_id?: number | null
          company_id?: number
          created_at?: string
          created_by?: string | null
          currency_code?: string | null
          facebook_account_id?: number | null
          industry_id?: number | null
          name?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          active_facebook_page_id?: number | null
          address_id?: number | null
          company_id?: number
          created_at?: string
          created_by?: string | null
          currency_code?: string | null
          facebook_account_id?: number | null
          industry_id?: number | null
          name?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "address"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "company_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industry"
            referencedColumns: ["industry_id"]
          }
        ]
      }
      industry: {
        Row: {
          created_at: string
          emoji: string | null
          industry_id: number
          is_public: boolean | null
          name: string | null
        }
        Insert: {
          created_at?: string
          emoji?: string | null
          industry_id?: number
          is_public?: boolean | null
          name?: string | null
        }
        Update: {
          created_at?: string
          emoji?: string | null
          industry_id?: number
          is_public?: boolean | null
          name?: string | null
        }
        Relationships: []
      }
      lead: {
        Row: {
          campaign_id: number | null
          created_at: string
          email: string | null
          first_name: string | null
          last_name: string | null
          lead_form_answers_id: number | null
          lead_id: number
          lead_status: string | null
          money_earned_in_cents: number | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          campaign_id?: number | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          lead_form_answers_id?: number | null
          lead_id?: number
          lead_status?: string | null
          money_earned_in_cents?: number | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          campaign_id?: number | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          lead_form_answers_id?: number | null
          lead_id?: number
          lead_status?: string | null
          money_earned_in_cents?: number | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["campaign_id"]
          }
        ]
      }
      lead_form: {
        Row: {
          created_at: string
          description: string | null
          lead_form_complexity_id: number | null
          lead_form_id: number
          name: string | null
          questions: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          lead_form_complexity_id?: number | null
          lead_form_id?: number
          name?: string | null
          questions?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          lead_form_complexity_id?: number | null
          lead_form_id?: number
          name?: string | null
          questions?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_form_lead_form_complexity_id_fkey"
            columns: ["lead_form_complexity_id"]
            isOneToOne: false
            referencedRelation: "lead_form_complexity"
            referencedColumns: ["lead_form_complexity_id"]
          }
        ]
      }
      lead_form_answers: {
        Row: {
          created_at: string
          lead_form_answers_id: number
          questions_with_answers: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          lead_form_answers_id?: number
          questions_with_answers?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          lead_form_answers_id?: number
          questions_with_answers?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      lead_form_complexity: {
        Row: {
          complexity_level: string | null
          lead_form_complexity_id: number
        }
        Insert: {
          complexity_level?: string | null
          lead_form_complexity_id?: number
        }
        Update: {
          complexity_level?: string | null
          lead_form_complexity_id?: number
        }
        Relationships: []
      }
      lead_form_default: {
        Row: {
          created_at: string
          lead_form_default_id: number
          lead_form_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          lead_form_default_id?: number
          lead_form_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          lead_form_default_id?: number
          lead_form_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_form_default_lead_form_id_fkey"
            columns: ["lead_form_id"]
            isOneToOne: false
            referencedRelation: "lead_form"
            referencedColumns: ["lead_form_id"]
          }
        ]
      }
      lead_form_user: {
        Row: {
          company_id: number | null
          created_at: string
          lead_form_id: number | null
          lead_form_user_id: number
          updated_at: string | null
        }
        Insert: {
          company_id?: number | null
          created_at?: string
          lead_form_id?: number | null
          lead_form_user_id?: number
          updated_at?: string | null
        }
        Update: {
          company_id?: number | null
          created_at?: string
          lead_form_id?: number | null
          lead_form_user_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_form_user_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "lead_form_user_lead_form_id_fkey"
            columns: ["lead_form_id"]
            isOneToOne: false
            referencedRelation: "lead_form"
            referencedColumns: ["lead_form_id"]
          }
        ]
      }
      location: {
        Row: {
          address_id: number | null
          brand_color: string | null
          company_id: number | null
          created_at: string
          location_id: number
          location_name: string | null
          target_area_id: number | null
          target_audience_id: number | null
          updated_at: string | null
        }
        Insert: {
          address_id?: number | null
          brand_color?: string | null
          company_id?: number | null
          created_at?: string
          location_id?: number
          location_name?: string | null
          target_area_id?: number | null
          target_audience_id?: number | null
          updated_at?: string | null
        }
        Update: {
          address_id?: number | null
          brand_color?: string | null
          company_id?: number | null
          created_at?: string
          location_id?: number
          location_name?: string | null
          target_area_id?: number | null
          target_audience_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "location_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "address"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "location_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "company"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "location_target_area_id_fkey"
            columns: ["target_area_id"]
            isOneToOne: false
            referencedRelation: "target_area"
            referencedColumns: ["target_area_id"]
          },
          {
            foreignKeyName: "location_target_audience_id_fkey"
            columns: ["target_audience_id"]
            isOneToOne: false
            referencedRelation: "target_audience"
            referencedColumns: ["target_audience_id"]
          }
        ]
      }
      profile: {
        Row: {
          company_id: number | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          company_id?: number | null
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: number | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      target_area: {
        Row: {
          cities: string[] | null
          city: string | null
          company_id: number | null
          created_at: string
          radius_in_km: number | null
          target_area_id: number
          target_area_type: string | null
          updated_at: string | null
          zip_codes: Json | null
        }
        Insert: {
          cities?: string[] | null
          city?: string | null
          company_id?: number | null
          created_at?: string
          radius_in_km?: number | null
          target_area_id?: number
          target_area_type?: string | null
          updated_at?: string | null
          zip_codes?: Json | null
        }
        Update: {
          cities?: string[] | null
          city?: string | null
          company_id?: number | null
          created_at?: string
          radius_in_km?: number | null
          target_area_id?: number
          target_area_type?: string | null
          updated_at?: string | null
          zip_codes?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "target_area_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["company_id"]
          }
        ]
      }
      target_audience: {
        Row: {
          age_max: number | null
          age_min: number | null
          company_id: number | null
          created_at: string
          genders: string | null
          target_audience_id: number
          updated_at: string | null
        }
        Insert: {
          age_max?: number | null
          age_min?: number | null
          company_id?: number | null
          created_at?: string
          genders?: string | null
          target_audience_id?: number
          updated_at?: string | null
        }
        Update: {
          age_max?: number | null
          age_min?: number | null
          company_id?: number | null
          created_at?: string
          genders?: string | null
          target_audience_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "target_audience_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["company_id"]
          }
        ]
      }
      text_snippet: {
        Row: {
          created_at: string
          id: number
          key: string | null
          lang: string | null
          updated_at: string | null
          value: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          key?: string | null
          lang?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          key?: string | null
          lang?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      user_step: {
        Row: {
          created_at: string
          current_step: string | null
          id: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          current_step?: string | null
          id?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          current_step?: string | null
          id?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_step_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: string
      }
      get_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: Json
      }
      get_claims: {
        Args: {
          uid: string
        }
        Returns: Json
      }
      get_company_id: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_default_target_area_id: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_default_target_audience_id: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_my_claim: {
        Args: {
          claim: string
        }
        Returns: Json
      }
      get_my_claims: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      hello: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_claims_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      set_claim: {
        Args: {
          uid: string
          claim: string
          value: Json
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
