 import { SingleSelect2Option } from "../../services/share.service";
 
 export const MEDICINE_TYPE_ARRAY: SingleSelect2Option[] = [
   { label: 'Medication', value: 1 },
   { label: 'Vaccine', value: 2 },
   { label: 'Consumable', value: 3 },
    { label: 'Disposable', value: 4 },
 ] as const;
 
 export const MEDICINE_TYPE : Record<number, string> = {
     1: 'Medication',
     2: 'Vaccine',
     3: 'Consumable',
     4: 'Disposable',
 } as const;