import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Role, User } from 'src/app/models/User.model';
import { PerscriptionService } from 'src/app/services/perscription.service';
import { UserService } from 'src/app/services/user.service';

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
  patientList: User[] = [];
  doctorList: User[] = [];
  constructor(
    private fb: FormBuilder,
    private perscriptionService: PerscriptionService,
    private router: Router,
    private userService: UserService
  ) {
    this.prescriptionForm = this.fb.group({
      diagnosis: ['', Validators.required],
      patient: ['', Validators.required],
      notes: [''],
      listMedicaton: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.addMedication();
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

  onSubmit(): void {
    if (this.prescriptionForm.invalid) return;

    this.isLoading = true;

    const formValue = this.prescriptionForm.value;

    const doctorUser = {
      id: 2,
      fullName: 'nour',
      email: 'romdhaninour96@gmail.com',
      role: Role.DOCTOR,
    };

    const perscriptionData = {
      diagnosis: formValue.diagnosis,
      doctor: doctorUser,
      patient: formValue.patient,
      listMedicaton: formValue.listMedicaton,
      notes: formValue.notes,
    };

    console.log('Note data to be submitted:', perscriptionData);

    this.perscriptionService
      .createPrescription(perscriptionData)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/doctor/prescriptions']);
        },
        error: (error) => {
          console.error('Error adding prescription', error);
        },
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
  }
}
