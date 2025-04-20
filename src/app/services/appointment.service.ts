// appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private readonly apiUrl = `${environment.apiUrl}/appointments`;

  constructor(private http: HttpClient) { }

  // Implement all required methods
  createAppointment(appointment: any): Observable<any> {
    return this.http.post(this.apiUrl, appointment);
  }

  updateAppointment(id: number, appointment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, appointment);
  }

  getAppointmentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAllAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAppointmentStatistics(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/statistics`);
  }

  exportToExcel(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/excel`, {
      responseType: 'blob'
  });
}

updateAppointmentTimes(id: number, startTime: Date, endTime: Date): Observable<any> {
  // Format the dates to exactly match the expected format
  const formatDate = (date: Date): string => {
    // This ensures we get the exact format needed by the backend
    return date.toISOString(); // Returns format like: "2025-04-20T14:30:00.000Z"
  };

  return this.http.patch(`${this.apiUrl}/${id}/reschedule`, {
    startTime: formatDate(startTime),
    endTime: formatDate(endTime)
  });

}}