import { User } from "./user.model";

export interface Note {
  id?: number;
  patient_id: number; // Replace `patient: User` with `patientId`
  doctor_id?: number;
  diagnosis: string;
  notes: string;
  guidance: string;
  creationDate?: string;
  updateDate?: string;
  expirationDate: string;
  doctor?: { username: string }
  patient?: { id: number; name: string };
}

