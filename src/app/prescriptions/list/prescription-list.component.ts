import { Component, OnInit } from '@angular/core';
import { PrescriptionDto } from '../../models/prescriptionDto.model'; // Corrected path
import { PrescriptionService } from '../../services/prescription.service';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {
  prescriptions: PrescriptionDto[] = [];

  constructor(private prescriptionService: PrescriptionService) { }

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  loadPrescriptions(): void {
    this.prescriptionService.getAllPrescriptions().subscribe({
      next: (data: PrescriptionDto[]) => {
        this.prescriptions = data;
      },
      error: (error) => {
        console.error('Error fetching prescriptions', error);
        // Optionally: Add user feedback (e.g., toast notification)
      }
    });
  }

  deletePrescription(id: number): void {
    if (confirm('Are you sure you want to delete this prescription?')) {
      this.prescriptionService.deletePrescription(id).subscribe({
        next: () => {
          this.prescriptions = this.prescriptions.filter(p => p.prescriptionId !== id);
        },
        error: (error) => {
          console.error('Error deleting prescription', error);
          // Optionally: Add user feedback (e.g., toast notification)
        }
      });
    }
  }
}
