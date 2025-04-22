import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {
  constructor(private http: HttpClient) {}

  getBadges(userId: number): Observable<string[]> {
    return this.http.post<string[]>(`http://localhost:8080/api/badges/generate/${userId}`, {});
  }
}
