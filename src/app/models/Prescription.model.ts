import { Medication } from './Medication.models';
import { User } from './user.model';

export interface Prescription {
  id?: number;
  doctor_Id: number;
  patient_Id: number;
  diagnosis: string;
  listMedicaton: Medication[];
  notes: string;
  creationDate?: string;
  updateDate?: string;
  expirationDate?: string;
}
