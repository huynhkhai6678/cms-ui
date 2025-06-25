export interface Clinic {
  id: number;
  name: string;
  phone: string;
  default: boolean;
  created_at?: Date;
  updated_at?: Date;
  code: string;
  landing_name: string;
  region_code: string;
  email: string;
  social_link?: string;
  country_id: number;
  type: number;
  currency : {
    currency_code : string;
    currency_icon : string;
    currency_name : string;
  }
}