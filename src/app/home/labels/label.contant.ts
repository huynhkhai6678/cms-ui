import { SingleSelect2Option } from "../../services/share.service";

export const LABEL_TYPE_ARRAY: SingleSelect2Option[] = [
  { label: 'UOM', value: 1 },
  { label: 'Frequency', value: 2 },
  { label: 'Purpose', value: 3 },
] as const;

export const LABEL_TYPE : Record<number, string> = {
    1: 'UOM',
    2: 'Frequency',
    3: 'Purpose',
} as const;