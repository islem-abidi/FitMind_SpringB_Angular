import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Dossier {
  idDossier: number;
  maladies: string;
  objectifSante: string;
  traitements: string;
  poids: number;
  taille: number;
  groupeSanguin: string;
  allergies: string;
  rdvRecommande: boolean;
  archive: boolean;
}

@Component({
  selector: 'app-admin-dossiers',
  templateUrl: './admin-dossiers.component.html',
  styleUrls: ['./admin-dossiers.component.css']
})
export class AdminDossiersComponent implements OnInit {
  dossiers: Dossier[] = [];
  apiUrl: string = 'http://localhost:8080/PIdev/api/dossierMedical';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.retrieveAllDossiers();
  }

  retrieveAllDossiers(): void {
    // Vérification : Appel de retrieveAllDossiers
    console.log('Appel à retrieveAllDossiers');

    this.http.get<Dossier[]>(`${this.apiUrl}/retrieveAllDossiers`).subscribe({
      next: (nonArchives) => {
        console.log('Dossiers non archivés récupérés :', nonArchives);

        // Appel à retrieveArchivedDossiers
        this.http.get<Dossier[]>(`${this.apiUrl}/retrieveArchivedDossiers`).subscribe({
          next: (archives) => {
            console.log('Dossiers archivés récupérés :', archives);
            this.dossiers = [...nonArchives, ...archives]; // Fusion
            console.log('Tous les dossiers fusionnés :', this.dossiers);
          },
          error: (err) => {
            console.error('Erreur chargement dossiers archivés:', err);
            this.dossiers = nonArchives; // afficher au moins les non archivés
          }
        });
      },
      error: (err) => {
        console.error('Erreur chargement dossiers non archivés:', err);
      }
    });
  }

  archiveDossier(id: number): void {
    if (confirm("Archiver ce dossier ?")) {
      this.http.put(`${this.apiUrl}/archiveDossier/${id}`, {}).subscribe(() => {
        this.retrieveAllDossiers(); // recharge
      });
    }
  }
}
