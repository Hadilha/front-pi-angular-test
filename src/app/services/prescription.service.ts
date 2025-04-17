import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrescriptionDto } from '../models/prescriptionDto.model';


@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiUrl = 'http://localhost:8080/api/prescriptions'; // Adjust to your backend URL

  constructor(private http: HttpClient) {}

  addPrescription(prescription: PrescriptionDto): Observable<PrescriptionDto> {
    return this.http.post<PrescriptionDto>(this.apiUrl, prescription);
  }

  getAllPrescriptions(): Observable<PrescriptionDto[]> {
    return this.http.get<PrescriptionDto[]>(this.apiUrl);
  }

  getPrescriptionById(id: number): Observable<PrescriptionDto> {
    return this.http.get<PrescriptionDto>(`${this.apiUrl}/${id}`);
  }

  updatePrescription(id: number, prescription: PrescriptionDto): Observable<PrescriptionDto> {
    return this.http.put<PrescriptionDto>(`${this.apiUrl}/${id}`, prescription);
  }

  deletePrescription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
