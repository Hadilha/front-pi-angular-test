export interface PrescriptionDto {
  prescriptionId: number; // Optional because it’s auto-generated on creation
  medicationName: string;
  dosage: string;
  doctorId: number;
  patientId: number;
  doctorName?: string; // Optional, included in backend DTO
  patientName?: string; // Optional, included in backend DTO
}
