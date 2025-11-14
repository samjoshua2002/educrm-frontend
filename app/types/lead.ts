export interface Lead {
  id: number;
  name: string;
  roll_number: string;
  phone_number: string;
  status: 'pending' | 'contacted' | 'qualified' | 'converted' | 'rejected';
  created_at: string;
  updated_at: string;
}

export type LeadStatus = Lead['status'];