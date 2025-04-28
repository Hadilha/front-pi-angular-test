import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProgramStat {
  programTitle:      string;
  participantsCount: number;
  contentCount:      number;
}

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  private baseUrl = 'http://localhost:8089/api/statistics';

  constructor(private http: HttpClient) {}

  /** Récupère la liste fusionnée participants+contenus */
  getProgramStatistics(): Observable<ProgramStat[]> {
    return this.http.get<ProgramStat[]>(`${this.baseUrl}/programs`);
  }
}
