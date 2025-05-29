 
export interface SmartPatientCard {
  id: number;
  template_name: string;
  header_color: string;
  show_email : boolean;
  show_address : boolean;
  show_dob : boolean;
  show_blood_group : boolean;
  show_phone : boolean;
  show_patient_unique_id : boolean;
  created_at?: Date;
  updated_at?: Date;
  clinic_id: number;
}