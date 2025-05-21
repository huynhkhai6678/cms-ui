export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at?: Date;
  updated_at?: Date;
  view: boolean;
  region_code?: string;
  clinic_id: string;
}