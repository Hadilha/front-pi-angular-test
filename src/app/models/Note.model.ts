import { User } from "./User.model";

export interface Note {
  id?: number;
  doctor: User;
  patient: User;
  diagnosis: string;
  notes: string;
  guidance: string;
  creationDate?: string;
  updateDate?: string;
  expirationDate: string;
}