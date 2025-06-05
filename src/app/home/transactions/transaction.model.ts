export interface Transaction {
    clinic_id: number;
    bill_date: string;
    discount: number;
    doctor_id: number;
    user_id: number;
    created_at?: string;
    updated_at?: string;
    important_notes: string;
    invoice_number: string;
    net_amount: number;
    note: string;
    payment_note: string;
    payment_type: number;
    total: number;
    tax: number;
    visit_id : number;
    services : [];
}

export interface TransactionService {
    administration: string;
    created_at: string;
    description: string;
    discount: number;
    dosage: string;
    frequency: string;
    id: number;
    name : string;
    price: number;
    purpose: string;
    quantity: number;
    service_id: number;
    sub_total : number;
    transaction_invoice_id : number;
    type: string;
    updated_at : string;
    uom: string;
}