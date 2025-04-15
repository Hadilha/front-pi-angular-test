import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrescriptionService } from '../../services/prescription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PrescriptionDto } from '../../models/prescriptionDto.model';

@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.css']
})
export class PrescriptionFormComponent implements OnInit {
  prescriptionForm: FormGroup;
  isEditMode = false;
  prescriptionId?: number;

  constructor(
    private fb: FormBuilder,
    private prescriptionService: PrescriptionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.prescriptionForm = this.fb.group({
      medicationName: ['', Validators.required],
      dosage: ['', Validators.required],
      doctorId: [null, [Validators.required, Validators.min(1)]],
      patientId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.prescriptionId = +params['id'];
        this.loadPrescription(this.prescriptionId);
      }
    });
  }

  loadPrescription(id: number): void {
    this.prescriptionService.getPrescriptionById(id).subscribe(
      (prescription: PrescriptionDto) => {
        this.prescriptionForm.patchValue({
          medicationName: prescription.medicationName,
          dosage: prescription.dosage,
          doctorId: prescription.doctorId,
          patientId: prescription.patientId
        });
      },
      error => console.error('Error loading prescription', error)
    );
  }

  onSubmit(): void {
    if (this.prescriptionForm.valid) {
      const prescriptionData: PrescriptionDto = this.prescriptionForm.value;

      if (this.isEditMode && this.prescriptionId) {
        this.prescriptionService.updatePrescription(this.prescriptionId, prescriptionData).subscribe(
          () => this.router.navigate(['/prescriptions']),
          error => console.error('Error updating prescription', error)
        );
      } else {
        this.prescriptionService.addPrescription(prescriptionData).subscribe(
          () => this.router.navigate(['/prescriptions']),
          error => console.error('Error creating prescription', error)
        );
      }
    } else {
      // Form is invalid, mark all fields as touched to show validation messages
      this.prescriptionForm.markAllAsTouched();
    }
  }
}
