import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { SeanceSport } from 'src/app/Models/SeanceSport';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  getSeancesByActivite(arg0: number) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = environment.API_BASE_URL + '/Seance_sport';

  constructor(private http: HttpClient) {}

  getByActiviteId(id: number): Observable<SeanceSport[]> {
    return this.http.get<SeanceSport[]>(
      `${this.baseUrl}/getSeancesByActivite/${id}`
    );
  }


  getAll(): Observable<SeanceSport[]> {
    return this.http.get<SeanceSport[]>(`${this.baseUrl}/readAllSeance_sport`);
  }

  getById(id: number): Observable<SeanceSport> {
    return this.http.get<SeanceSport>(`${this.baseUrl}/readSeance_sport/${id}`);
  }
  addSeance(seance: SeanceSport): Observable<SeanceSport> {
    return this.http.post<SeanceSport>(`${this.baseUrl}/addSeance_sport`, seance);
  }

  create(seance: SeanceSport, activiteId: number): Observable<SeanceSport> {
    return this.http.post<SeanceSport>(
      `${this.baseUrl}/addSeance_sport/${activiteId}`,
      seance
    );
  }
 update(seance: SeanceSport): Observable<SeanceSport> {
    return this.http.put<SeanceSport>(`${this.baseUrl}/updateSeance_sport`, seance);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteSeance_sport/${id}`);
  }

  ajouterAListAttente(seanceId: number, userId: number): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/attente?seanceId=${seanceId}&userId=${userId}`,
      {}
    );
  }

}
