export interface Patient {
  id?: string;
  name: string;
  age: number;
  email: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  dateOfBirth: string;
  lastVisit?: string;
  status: 'active' | 'inactive' | 'pending';
}
