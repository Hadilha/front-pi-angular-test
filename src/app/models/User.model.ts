export interface User {
  id: number;
  fullName: string;
  email: string;
  role: Role;
}

export enum Role {
  DOCTOR = 'DOCTOR',
  COACH = 'COACH',
  PATIENT = 'PATIENT',
}