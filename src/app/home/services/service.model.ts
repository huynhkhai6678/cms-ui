 
export interface Service {
  id: number;
  name: string;
  category_id : number;
  status: number;
  short_description: string;
  charges: number;
  image_url: string;
  created_at?: Date;
  updated_at?: Date;
  clinic_id: number;
}