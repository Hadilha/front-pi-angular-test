export interface User {
  userId: number;
  name: string;
  role: Role;
}
export enum Role {
  DOCTOR = 'doctor',
  PATIENT = 'patient'
}
