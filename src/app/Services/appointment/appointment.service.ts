// appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private readonly apiUrl = `${environment.apiUrl}/appointments`;

  constructor(private http: HttpClient) { }

  // Implement all required methods
  createAppointment(appointment: any): Observable<any> {
    console.log("appointment",appointment);
    return this.http.post(this.apiUrl, appointment);
  }

  updateAppointment(id: number, appointment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, appointment);
  }

  getAppointmentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAllAppointments(paginated: boolean = false, page: number = 0, size: number = 5): Observable<any> {
    let params = new HttpParams();

    if (paginated) {
      params = params.set('paginated', 'true');
      params = params.set('page', page.toString());
      params = params.set('size', size.toString());
    }

    return this.http.get<any>(this.apiUrl, { params });
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

}
getAppointmentsByPatientId(patientId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/patient/${patientId}`);
}

/**
 * Request to reschedule an appointment (for patients)
 */
requestRescheduleAppointment(data: { appointmentId: number, startTime: string, endTime: string, reason: string }): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${data.appointmentId}/reschedule`, {
    startTime: data.startTime,
    endTime: data.endTime,
    reason: data.reason
  });
}
/**
 * Cancel an appointment (for patients)
 */
cancelPatientAppointment(appointmentId: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/${appointmentId}/cancel`, {
    cancelledBy: 'PATIENT'
  });
}

/**
 * Get upcoming appointments for a patient
 */
getUpcomingPatientAppointments(patientId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/patient/${patientId}/upcoming`);
}

/**
 * Get past appointments for a patient
 */
getPastPatientAppointments(patientId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/patient/${patientId}/past`);
}


}
