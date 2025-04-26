import { Medication } from './Medication.models';
import { User } from './User.model';

export interface Prescription {
  id?: number;
  doctor: User;
  patient: User;
  diagnosis: string;
  listMedicaton: Medication[];
  notes: string;
  creationDate?: string;
  updateDate?: string;
  expirationDate?: string;
}
