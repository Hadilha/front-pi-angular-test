import { PrescriptionDto } from './prescriptionDto.model';
import {User} from "./User.model";

export interface PatientNote {
  noteId: number;
  patient: User;
  doctor: User;
  prescription: PrescriptionDto;
  creationDate: Date;
  description: string;
  updateDate: Date;
}
