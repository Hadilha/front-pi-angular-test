import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Medication } from 'src/app/models/Medication.models';
import { Prescription } from 'src/app/models/Prescription.model';
import { PerscriptionService } from 'src/app/services/perscription.service';

@Component({
  selector: 'app-patient-prescription-details',
  templateUrl: './patient-prescription-details.component.html',
  styleUrls: ['./patient-prescription-details.component.css']
})
export class PatientPrescriptionDetailsComponent {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== 'light' && color !== 'dark' ? 'light' : color;
  }
  private _color = 'light';
  prescription: Prescription | null = null;
  medications: Medication[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private perscriptionService: PerscriptionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.perscriptionService
      .getPrescriptionById(id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.prescription = data;
          this.medications = data.listMedicaton;
        },
        error: (err) => {
          this.errorMessage = 'Error loading prescription details.';
        },
      });
  }
}
