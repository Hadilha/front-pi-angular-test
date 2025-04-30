import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Medication } from 'src/app/models/Medication.models';
import { Prescription } from 'src/app/models/Prescription.model';
import { PerscriptionService } from 'src/app/Services/prescription/perscription.service';

@Component({
  selector: 'app-details-prescription',
  templateUrl: './details-prescription.component.html',
  styleUrls: ['./details-prescription.component.css'],
})
export class DetailsPrescriptionComponent implements OnInit {
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
    private PerscriptionService: PerscriptionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.PerscriptionService
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
