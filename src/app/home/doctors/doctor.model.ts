export interface Doctor {
  doctor_id: string;
  full_name: string;
  user_created_at: string;
  user_email: string;
  user_email_verified_at: string;
  user_id: number;
  status: number;
  created_at?: Date;
  updated_at?: Date;
  view: boolean;
  region_code?: string;
  clinic_id: string;
}