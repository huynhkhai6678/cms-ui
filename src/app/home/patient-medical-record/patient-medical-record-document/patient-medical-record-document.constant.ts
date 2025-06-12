 import { SingleSelect2Option } from "../.././../services/share.service";
 
 export const CATEGORIES_TYPE_ARRAY: SingleSelect2Option[] = [
   { label: 'Laboratory', value: 1 },
   { label: 'Referral Letter', value: 2 },
   { label: 'Other', value: 3 },
 ] as const;
 
 export const CATEGORIES_TYPE : Record<number, string> = {
     1: 'Laboratory',
     2: 'Referral Letter',
     3: 'Other',
 } as const;