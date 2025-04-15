// src/app/components/update-prescription/update-prescription.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrescriptionService } from '../../../services/prescription.service';
import { PrescriptionDto } from '../../../models/prescriptionDto.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-prescription',
  templateUrl: './update-prescription.component.html',
  styleUrls: ['./update-prescription.component.css']
})
export class UpdatePrescriptionComponent implements OnInit {
  prescriptionForm!: FormGroup;
  prescriptionId!: number;

  constructor(
    private route: ActivatedRoute,
    private prescriptionService: PrescriptionService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prescriptionId = Number(this.route.snapshot.paramMap.get('id'));

    this.prescriptionForm = this.fb.group({
      medicationName: ['', Validators.required],
      dosage: ['', Validators.required],
      doctorId: ['', Validators.required],
      patientId: ['', Validators.required]
    });

    this.loadPrescription();
  }

  loadPrescription(): void {
    this.prescriptionService.getPrescriptionById(this.prescriptionId).subscribe({
      next: (prescription: PrescriptionDto) => {
        this.prescriptionForm.patchValue(prescription);
      },
      error: (err) => {
        console.error('Error loading prescription', err);
        // Optional: Redirect or show error message
      }
    });
  }

  onSubmit(): void {
    if (this.prescriptionForm.valid) {
      const updatedPrescription: PrescriptionDto = {
        prescriptionId: this.prescriptionId,
        ...this.prescriptionForm.value
      };

      this.prescriptionService.updatePrescription(this.prescriptionId, updatedPrescription).subscribe({
        next: () => {
          alert('Prescription updated successfully!');
          this.router.navigate(['/prescriptions']); // Adjust path to your list route
        },
        error: (err) => {
          console.error('Error updating prescription', err);
        }
      });
    }
  }
}
