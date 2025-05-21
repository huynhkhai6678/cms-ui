export interface Subscribe {
  id: number;
  email: string;
  subscribe: boolean;
  created_at?: Date;
  updated_at?: Date;
  clinic_id: number;
}