import { SingleSelect2Option } from "../../services/share.service";
 
export const MEDICINE_USAGE_TYPE_ARRAY: SingleSelect2Option[] = [
{ label: 'Stock In', value: 1 },
{ label: 'Stock Out', value: 2 },
{ label: 'Expired', value: 3 },
{ label: 'Damaged', value: 4 },
{ label: 'Adjustment', value: 5 },
{ label: 'Returned', value: 6 },
{ label: 'Lost/Missing', value: 7 },
] as const;

export const MEDICINE_USAGE_TYPE : Record<number, string> = {
    1: 'Stock In',
    2: 'Stock Out',
    3: 'Expired',
    4: 'Damaged',
    5: 'Adjustment',
    6 : 'Returned',
    7 : 'Lost/Missing'
} as const;
