// src/app/services/video-call.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface VideoRoomDTO {
  roomId: string;
  appointmentId: number;
  status: string;
  patientId: string;
  professionalId: string;
}

export interface VideoCall {
  id: number;
  roomId: string;
  accessLink: string;
  notes: string;
  status: string;
  createdAt: string;
  startedAt: string;
  endedAt: string;
  appointment: any; // Define proper Appointment interface as needed
}

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {
  
  private apiUrl = `${environment.apiUrl}/video-calls`;

  constructor(private http: HttpClient) {}

  createVideoRoom(appointmentId: number): Observable<VideoRoomDTO> {
    return this.http.post<VideoRoomDTO>(`${this.apiUrl}/appointment/${appointmentId}/room`, {});
  }

  getVideoCallForAppointment(appointmentId: number): Observable<VideoCall> {
    return this.http.get<VideoCall>(`${this.apiUrl}/appointment/${appointmentId}`);
  }

  getVideoCallByRoomId(roomId: string): Observable<VideoCall> {
    return this.http.get<VideoCall>(`${this.apiUrl}/room/${roomId}`);
  }

  updateVideoStatus(appointmentId: number, status: string): Observable<VideoCall> {
    return this.http.put<VideoCall>(`${this.apiUrl}/appointment/${appointmentId}/status`, { status });
  }

  saveNotes(appointmentId: number, notes: string): Observable<VideoCall> {
    return this.http.post<VideoCall>(`${this.apiUrl}/appointment/${appointmentId}/notes`, { notes });
  }

  endVideoCall(appointmentId: number): Observable<VideoCall> {
    return this.http.post<VideoCall>(`${this.apiUrl}/appointment/${appointmentId}/end`, {});
  }
}