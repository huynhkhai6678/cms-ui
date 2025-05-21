 
export interface ClinicSchedule {
  id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  clinic_id: number;
  created_at?: Date;
  updated_at?: Date;
  name? : string;
}