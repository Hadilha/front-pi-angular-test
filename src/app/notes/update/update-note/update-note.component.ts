import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientNote } from '../../../models/patient-note.model';
import { PrescriptionDto } from '../../../models/prescriptionDto.model';
import { PatientNoteService } from '../../../services/patient-note.service';
import { PrescriptionService } from '../../../services/prescription.service';
import { User, Role } from "../../../models/User.model";

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit {
  noteId!: number;
  note: PatientNote = {
    noteId: 0,
    description: '',
    patient: this.createEmptyUser(Role.PATIENT),
    doctor: this.createEmptyUser(Role.DOCTOR),
    prescription: this.createEmptyPrescription(),
    creationDate: new Date(),
    updateDate: new Date()
  };
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private noteService: PatientNoteService,
    private prescriptionService: PrescriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.noteId = Number(idParam);
      this.loadNote();
    } else {
      this.errorMessage = 'Invalid note ID';
      this.isLoading = false;
    }
  }

  private createEmptyUser(role: Role): User {
    return {
      userId: 0,
      name: '',
      role: role
    };
  }

  private createEmptyPrescription(): PrescriptionDto {
    return {
      prescriptionId: 0,
      medicationName: '',
      dosage: '',
      doctorId: 0,
      patientId: 0
    };
  }

  loadNote(): void {
    this.noteService.getNoteById(this.noteId).subscribe({
      next: (data: PatientNote) => {
        this.note = {
          ...data,
          patient: data.patient || this.createEmptyUser(Role.PATIENT),
          doctor: data.doctor || this.createEmptyUser(Role.DOCTOR),
          prescription: data.prescription || this.createEmptyPrescription(),
          updateDate: new Date(data.updateDate || new Date())
        };

        // Sync prescription with user IDs
        if (this.note.prescription) {
          this.note.prescription.doctorId = this.note.doctor.userId;
          this.note.prescription.patientId = this.note.patient.userId;
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading note', err);
        this.errorMessage = 'Failed to load note. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  onUpdate(): void {
    if (!this.note) {
      this.errorMessage = 'Note data is not available';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    // Validate form
    if (!this.note.description || !this.note.prescription.medicationName || !this.note.prescription.dosage) {
      this.errorMessage = 'Please fill all required fields';
      this.isLoading = false;
      return;
    }

    // First handle prescription
    const prescriptionObservable = this.note.prescription.prescriptionId
      ? this.prescriptionService.updatePrescription(this.note.prescription.prescriptionId, this.note.prescription)
      : this.prescriptionService.addPrescription(this.note.prescription);

    prescriptionObservable.subscribe({
      next: (updatedPrescription) => {
        // Update note with prescription reference
        this.note.prescription = updatedPrescription;
        this.note.updateDate = new Date();

        // Then update the note
        this.noteService.updateNote(this.noteId, this.note).subscribe({
          next: () => {
            this.router.navigate(['/notes'], { queryParams: { updated: true } });
          },
          error: (err) => {
            console.error('Error updating note', err);
            this.errorMessage = 'Failed to update note. Please try again.';
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error updating prescription', err);
        this.errorMessage = 'Failed to update prescription. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/notes']);
  }
}
