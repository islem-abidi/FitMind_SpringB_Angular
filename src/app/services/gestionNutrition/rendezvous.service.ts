import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous } from 'src/app/models/RendezVous.model';  // Assurez-vous que le chemin est correct
import { HttpHeaders } from '@angular/common/http';
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

  updateStatutRendezvous(id: number, statut: string): Observable<RendezVous> {
    const url = `${this.baseUrl}/updateStatutRendezVous/${id}`;
    // Envoyer le statut comme paramètre de requête ou dans le corps selon ce que le backend attend
    return this.http.patch<RendezVous>(url, { statut }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  
  // Archiver un rendez-vous (suppression logique)
  archiveRendezVous(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/archiveRendezVous/${id}`);
  }
}
