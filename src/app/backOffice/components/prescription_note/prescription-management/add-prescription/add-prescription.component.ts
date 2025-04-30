import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Prescription } from 'src/app/models/Prescription.model';
import { Role, User } from 'src/app/models/user.model';
import { PerscriptionService } from 'src/app/Services/prescription/perscription.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css'],
})
export class AddPrescriptionComponent {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== 'light' && color !== 'dark' ? 'light' : color;
  }
  private _color = 'light';
  prescriptionForm: FormGroup;
  isLoading: boolean = false;
  patientList: User[] = [];  // Ensure this is typed as User[]
  doctorList: User[] = [];   // Ensure this is typed as User[]

  constructor(
    private fb: FormBuilder,
    private perscriptionService: PerscriptionService,
    private router: Router,
    private userService: UserService
  ) {
    this.prescriptionForm = this.fb.group({
      diagnosis: ['', Validators.required],
      patient: ['', Validators.required], // Store patient ID
      notes: [''],
      listMedicaton: this.fb.array([]),
    });
  }
  ngOnInit(): void {}

 /* ngOnInit(): void {
    this.addMedication();  // Add default medication entry
    this.userService.getUsersByRole(Role.PATIENT).subscribe({
      next: (response) => {
        this.patientList = response;
        console.log('Patients fetched successfully', this.patientList);
      },
      error: (error) => {
        console.error('Error fetching patients', error);
      },
    });
  }
*/
  /*onSubmit(): void {
    if (this.prescriptionForm.invalid) return;

    this.isLoading = true;
    const formValue = this.prescriptionForm.value;

    this.userService.getCurrentUser().subscribe({
      next: (doctor: User) => {
        // Build the DTO with IDs
        const prescriptionDto: Prescription = {
          diagnosis: formValue.diagnosis,
          doctor_Id: doctor.id,          // Send doctor ID
          patient_Id: formValue.patient, // Patient ID from form
          listMedicaton: formValue.listMedicaton, // Match backend field name
          notes: formValue.notes
        };

        this.perscriptionService
          .createPrescription(prescriptionDto)  // Pass DTO
          .pipe(finalize(() => this.isLoading = false))
          .subscribe({
            next: () => this.router.navigate(['/doctor/prescriptions']),
            error: (error) => console.error('Error adding prescription', error)
          });
      },
      error: (error) => {
        console.error('Error fetching current user', error);
        this.isLoading = false;
      }
    });
  }*/
 /*onSubmit(): void {
  if (this.prescriptionForm.invalid) return;

  this.isLoading = true;
  const formValue = this.prescriptionForm.value;

  this.userService.getCurrentUser().subscribe({
    next: (doctor: User) => {
      // Build the DTO with IDs
     /* const prescriptionDto: Prescription = {
        diagnosis: formValue.diagnosis,
        //doctorId: doctor.id,          // Send doctor ID
        //patientId: formValue.patient, // Patient ID from form
        medications: formValue.listMedicaton, // Match backend field name
        notes: formValue.notes
      };

      this.perscriptionService
        .createPrescription(prescriptionDto)  // Pass DTO
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: () => this.router.navigate(['/doctor/prescriptions']),
          error: (error) => console.error('Error adding prescription', error)
        });
    },
    error: (error) => {
      console.error('Error fetching current user', error);
      this.isLoading = false;
    }
  });
}

  createMedication(): FormGroup {
    return this.fb.group({
      medicationName: ['', Validators.required],
      directions: ['', Validators.required],
      duration: [0, Validators.required],
    });
  }

  addMedication(): void {
    (this.prescriptionForm.get('listMedicaton') as FormArray).push(
      this.createMedication()
    );
  }

  removeMedication(index: number): void {
    (this.prescriptionForm.get('listMedicaton') as FormArray).removeAt(index);
  }

  get listMedicaton(): FormArray {
    return this.prescriptionForm.get('listMedicaton') as FormArray;
  }*/
}
