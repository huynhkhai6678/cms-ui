 
export interface Testimonial {
  id: number;
  name: string;
  designation: string;
  short_description: string;
  created_at?: Date;
  updated_at?: Date;
  clinic_id: number;
}