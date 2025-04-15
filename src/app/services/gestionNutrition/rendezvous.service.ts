import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous } from 'src/app/models/RendezVous.model';  // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

  private baseUrl = 'http://localhost:8080/PIdev/rendezvous';
  
  constructor(private http: HttpClient) { }

  // Récupérer tous les rendez-vous
  retrieveAllRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.baseUrl}/retrieveAllRendezVous`);
  }

  // Récupérer un rendez-vous par son ID
  // Méthode dans le service pour récupérer un rendez-vous par son ID
retrieveRendezVous(id: number): Observable<RendezVous> {
  return this.http.get<RendezVous>(`${this.baseUrl}/retrieveRendezVous/${id}`);
}

  // Ajouter un rendez-vous
  addRendezVous(rendezVous: RendezVous): Observable<RendezVous> {
    console.log('Envoi du rendez-vous:', rendezVous);
    return this.http.post<RendezVous>(`${this.baseUrl}/addRendezVous`, rendezVous);
  }

  // Mettre à jour un rendez-vous existant
  updateRendezVous(id: number, rdv: RendezVous): Observable<RendezVous> {
    return this.http.put<RendezVous>(`${this.baseUrl}/updateRendezVous/${id}`, rdv);
  }

  // Méthode dans le service pour mettre à jour le statut du rendez-vous
  updateStatutRendezVous(id: number, statut: string): Observable<RendezVous> {
    const payload = { statut: statut };
    return this.http.put<RendezVous>(`${this.baseUrl}/updateStatutRendezVous/${id}`, payload);
  }
  
  // Archiver un rendez-vous (suppression logique)
  archiveRendezVous(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/archiveRendezVous/${id}`);
  }
}
