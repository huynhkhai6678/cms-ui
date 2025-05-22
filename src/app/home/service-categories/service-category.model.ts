 
export interface ServiceCategory {
  id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  clinic_id: number;
  image_url: string;
}