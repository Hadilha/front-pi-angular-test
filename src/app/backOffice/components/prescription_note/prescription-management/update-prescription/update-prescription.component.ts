import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Medication } from 'src/app/models/Medication.models';
import { Role, User } from 'src/app/models/user.model';
import { PerscriptionService } from 'src/app/Services/prescription/perscription.service';
import { UserService } from 'src/app/Services/user/user.service';
import { Prescription } from 'src/app/models/Prescription.model';
@Component({
  selector: 'app-update-prescription',
  templateUrl: './update-prescription.component.html',
  styleUrls: ['./update-prescription.component.css'],
})
export class UpdatePrescriptionComponent {
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
  prescriptionId: number = 0;
  constructor(
    private fb: FormBuilder,
    private perscriptionService: PerscriptionService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.prescriptionForm = this.fb.group({
      diagnosis: ['', Validators.required],
      patient: ['', Validators.required],
      notes: [''],
      listMedicaton: this.fb.array([]),
    });
  }

 /* ngOnInit(): void {
    this.userService.getUsersByRole('PATIENT').subscribe({
      next: (response) => {
        this.patientList = response;
        console.log('Patients fetched successfully', this.patientList);
        this.prescriptionId = Number(this.route.snapshot.paramMap.get('id'));
        if (this.prescriptionId) {
          this.loadPrescription();
        }
      },
      error: (error) => {
        console.error('Error fetching patients', error);
      },
    });
  }*/

 /* loadPrescription(): void {
    this.perscriptionService
      .getPrescriptionById(this.prescriptionId)
      .subscribe({
        next: (prescription) => {
          const matchedPatient = this.patientList.find(
            (p) => p.id === prescription.patient.id
          );

          // Patch base form values
          this.prescriptionForm.patchValue({
            diagnosis: prescription.diagnosis,
            notes: prescription.notes,
            expirationDate: prescription.expirationDate,
            patient: matchedPatient || null,
          });

          // Clear existing medications
          const medicationArray = this.prescriptionForm.get(
            'listMedicaton'
          ) as FormArray;
          medicationArray.clear();

          // Patch medications
          prescription.listMedicaton.forEach((med: Medication) => {
            medicationArray.push(
              this.fb.group({
                medicationName: [med.medicationName || '', Validators.required],
                directions: [med.directions || '', Validators.required],
                duration: [med.duration || '', Validators.required],
              })
            );
          });

          console.log('Prescription loaded successfully', prescription);
        },
        error: (error) => {
          console.error('Error loading prescription', error);
        },
      });
  }*/

  onSubmit(): void {
    if (this.prescriptionForm.invalid) return;

    this.isLoading = true;

    const formValue = this.prescriptionForm.value;

    this.userService.getCurrentUser().subscribe({
      next: (doctor: User) => {
        const prescriptionData: Prescription = {
          diagnosis: formValue.diagnosis,
          doctor_Id: 1,
          patient_Id: formValue.patient_Id,
          listMedicaton: formValue.listMedicaton,
          notes: formValue.notes,
        };

        console.log('Note data to be submitted:', prescriptionData);

        this.perscriptionService
          .updatePrescription(this.prescriptionId, prescriptionData)
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
      },
      error: (error) => {
        console.error('Error fetching current user', error);
        this.isLoading = false;
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
