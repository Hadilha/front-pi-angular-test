import { Prescription } from 'src/app/models/Prescription.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface PrescriptionRequestDTO {
  patientId: number;
  doctorId: number;
  coachId?: number; // Optional
  authorName: string;
  diagnosis: string;
  notes: string;
  expirationDate: string;
  medications: MedicationDTO[];
}

interface MedicationDTO {
  medicationName: string;
  directions: string;
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class PerscriptionService {
  //private apiUrl = 'http://localhost:8089/api/prescriptions';
  private readonly apiUrl = `${environment.apiUrl}/prescriptions`;


  constructor(private http: HttpClient) {}

  // Create a new prescription
  createPrescription(prescription: Prescription): Observable<Prescription> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Prescription>(
      `${this.apiUrl}/createpres`,
      prescription,  // Send DTO
      { headers }
    );
  }

  // Get all prescriptions
  getAllPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(this.apiUrl);
  }

  // Get a prescription by ID
  getPrescriptionById(id: number): Observable<Prescription> {
    return this.http.get<Prescription>(`${this.apiUrl}/${id}`);
  }

  getPatientPrescription(idPrescription: number): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(
      `${this.apiUrl}/patientPrescription/${idPrescription}`
    );
  }

  getStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getStatisticsGrowth`);
  }

  getMedicationStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getStatAgeGaps`);
  }

  // Delete a prescription by ID
  deletePrescription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Update a prescription by ID
  updatePrescription(
    id: number,
    updated: Prescription
  ): Observable<Prescription> {
    return this.http.put<Prescription>(`${this.apiUrl}/${id}`, updated);
  }
}
