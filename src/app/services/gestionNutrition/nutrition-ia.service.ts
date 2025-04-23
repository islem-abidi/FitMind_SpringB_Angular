import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionIAService {

  private baseUrl = 'http://localhost:8080/PIdev/api/nutrition'; 

  constructor(private http: HttpClient) { }

  getPrediction(dossierId: number, activity: string, duration: number, temperature: number): Observable<any> {
    const params = new HttpParams()
      .set('activite', activity)
      .set('duree', duration.toString())
      .set('temperature', temperature.toString());

    return this.http.post(`${this.baseUrl}/${dossierId}/predict`, null, { params });
  }
}
