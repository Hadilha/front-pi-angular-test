import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Prescription } from 'src/app/models/Prescription.model';
import { PerscriptionService } from 'src/app/services/perscription.service';

@Component({
  selector: 'app-patient-prescription',
  templateUrl: './patient-prescription.component.html',
  styleUrls: ['./patient-prescription.component.css'],
})
export class PatientPrescriptionComponent {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== 'light' && color !== 'dark' ? 'light' : color;
  }
  private _color = 'light';
  prescriptions: Prescription[] = [];
  isLoading = true;
  errorMessage: string = '';

  constructor(
    private prescriptionService: PerscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchPrescriptions();
  }

  fetchPrescriptions(): void {
    this.prescriptionService.getPatientPrescription(1).subscribe({
      next: (data) => {
        this.prescriptions = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load prescriptions';
        this.isLoading = false;
      },
    });
  }

  navigateToDetails(id: any) {
    this.router.navigate([`/details-prescription/${id}`]);
  }

  generatePrescriptionPDF(prescription: Prescription): void {
    const doc = new jsPDF();
    let y = 20;
    // Title
    doc.setFontSize(18);
    doc.setTextColor(33, 150, 243); // #2196F3
    doc.text('Prescription Summary', 105, y, { align: 'center' });

    y += 10;
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);

    y += 10;
    doc.setFontSize(12);
    doc.setTextColor(0);

    // Author & Diagnosis
    doc.text(
      `Author: ${prescription.doctor?.fullName ?? 'Dr. Unknown'}`,
      30,
      y
    );
    y += 8;
    doc.text(`Diagnosis: ${prescription.diagnosis || '—'}`, 30, y);
    y += 8;
    doc.text(`Notes: ${prescription.notes || 'No notes provided'}`, 30, y);
    y += 8;

    const created = new Date(
      prescription.creationDate || new Date()
    ).toLocaleDateString('en-GB');
    const updated = new Date(
      prescription.updateDate || new Date()
    ).toLocaleDateString('en-GB');
    const expiration = new Date(
      prescription.expirationDate || new Date()
    ).toLocaleDateString('en-GB');

    y += 5;
    doc.setTextColor(100);
    doc.setFontSize(11);
    doc.text(`Created: ${created}`, 30, y);
    y += 6;
    doc.text(`Last Updated: ${updated}`, 30, y);
    y += 6;
    doc.text(`Expires: ${expiration}`, 30, y);

    y += 12;
    doc.setFillColor(242, 242, 242);
    doc.rect(20, y, 170, 10, 'F');
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('#', 25, y + 7);
    doc.text('Name', 40, y + 7);
    doc.text('Directions', 100, y + 7);
    doc.text('Duration (Day)', 160, y + 7);

    y += 16;
    doc.setFontSize(11);
    prescription.listMedicaton.forEach((med, index) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(`${index + 1}`, 25, y);
      doc.text(med.medicationName || '-', 40, y);
      doc.text(med.directions || '-', 100, y);
      doc.text(med.duration.toString() || '0', 160, y);
      y += 8;
    });

    doc.save('prescription-summary.pdf');
  }
}
