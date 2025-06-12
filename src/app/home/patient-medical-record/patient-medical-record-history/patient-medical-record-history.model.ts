export interface PatientMedicalRecordHistory {
  id: number;
  patient_medical_record_id: number;
  created_by: number;
  type: number;
  data: string;
  created_at? : string;
  updated_at? : string;
  user : {
    first_name: string;
    last_name : string;
  };
  note_data : {
    notes: string;
    diagnosis : string;
  }
}