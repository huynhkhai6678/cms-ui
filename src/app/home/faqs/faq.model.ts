 
export interface Faq {
  id: number;
  question: string;
  answer : string;
  created_at?: Date;
  updated_at?: Date;
  clinic_id: number;
}