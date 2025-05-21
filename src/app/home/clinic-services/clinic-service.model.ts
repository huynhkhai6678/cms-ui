 
export interface ClinicService {
  id: number;
  category: number;
  name?: string;
  description?: string;
  price?: number;
  cost?: number;
  currency_id?: string;
  active: boolean;
  created_at?: Date;
  updated_at?: Date;
  clinic_id: number;
}