export interface Staff {
  user_id: number;
  user_first_name: string;
  user_last_name : string;
  user_email: string;
  user_email_verified_at: string;
  user_type: number;
  role_display_name: string;
  created_at?: Date;
  updated_at?: Date;
  full_name: string;
}