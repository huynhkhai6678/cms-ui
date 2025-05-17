import { Permission } from "./permission.model";

export interface Role {
  id: number;
  name: string;
  display_name: string;
  clinic_id : number;
  guard_name: string;
  is_default: boolean;
  permissions: Permission[];
}