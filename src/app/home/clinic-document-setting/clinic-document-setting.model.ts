 
export interface ClinicDocumentSetting {
  id: number;
  name: string;
  header: string;
  transaction_receipt_template: string;
  medical_certificate_template: string;
  transaction_invoice_template: string;
  created_at?: Date;
  updated_at?: Date;
  clinic_id: number;
}