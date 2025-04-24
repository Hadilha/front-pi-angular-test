export interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: string;
  avatarUrl?: string;        // Optional
  accountStatus?: string;    // Optional
  lastSessionDate?: Date;    // Optional
  primaryCarePhysician?: string; // Optional
  nextAppointment?: Date;    // Optional
  birth?: Date;              // Optional
}
