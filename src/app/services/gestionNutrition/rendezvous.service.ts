import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous } from 'src/app/models/RendezVous.model'; // Assurez-vous que le chemin est correct
import { User } from 'src/app/models/user.model'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

  private apiUrl = 'http://localhost:8080/PIdev/rendezvous';

  constructor(private http: HttpClient) { }

  getAllRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/retrieveAllRendezVous`);
  }

  getRendezVousById(id: number): Observable<RendezVous> {
    return this.http.get<RendezVous>(`${this.apiUrl}/retrieveRendezVous/${id}`);
  }

  addRendezVous(rendezvous: RendezVous): Observable<RendezVous> {
    return this.http.post<RendezVous>(`${this.apiUrl}/addRendezVous`, rendezvous);
  }

  updateRendezVous(id: number, rendezvous: RendezVous): Observable<RendezVous> {
    return this.http.put<RendezVous>(`${this.apiUrl}/updateRendezVous/${id}`, rendezvous);
  }
  
}
