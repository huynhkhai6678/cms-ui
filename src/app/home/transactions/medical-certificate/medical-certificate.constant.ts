import { SingleSelect2Option } from "../../../services/share.service";

 export const MEDICAL_CERTIFICATE_TYPE_ARRAY: SingleSelect2Option[] = [
   { label: 'Medical Certificate', value: 1 },
   { label: 'Time Slip', value: 2 },
 ] as const;

export const MEDICAL_CERTIFICATE_STATUS : Record<number, string> = {
    1: 'Medical Certificate',
    2: 'Time Slip',
} as const;