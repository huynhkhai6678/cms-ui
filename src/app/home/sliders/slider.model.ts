 
export interface Slider {
  id: number;
  title: string;
  short_description : string;
  is_default: number;
  created_at?: Date;
  updated_at?: Date;
  clinic_id: number;
  image_url?: string;
}