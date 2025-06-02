 import { SingleSelect2Option } from "../../services/share.service";
 
 export const PAYMENT_TYPE_ARRAY: SingleSelect2Option[] = [
   { label: 'Cash', value: 1 },
   { label: 'Cheque', value: 2 },
   { label: 'Other', value: 3 },
 ] as const;
 
 export const PAYMENT_TYPE : Record<number, string> = {
     1: 'Cash',
     2: 'Cheque',
     3: 'Other',
 } as const;