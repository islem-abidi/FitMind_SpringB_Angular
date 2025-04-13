/*import { Component, OnInit } from '@angular/core';
import { DossierMedicalService } from 'src/app/services/gestionNutrition/dossier-medical.service';
import { DossierMedical } from 'src/app/services/gestionNutrition/dossier-medical.service';

@Component({
  selector: 'app-dossier-n',
  templateUrl: './dossier-n.component.html',
  styleUrls: ['./dossier-n.component.css']
})
export class DossierNComponent implements OnInit {
  dossiers: DossierMedical[] = [];

  constructor(private dossierService: DossierMedicalService) {}

  ngOnInit(): void {
    this.getAllDossiers();  // Récupérer les dossiers médicaux lors du chargement du composant
  }

  // Méthode pour récupérer tous les dossiers médicaux
  getAllDossiers(): void {
    this.dossierService.getAllDossiers().subscribe(data => {
      this.dossiers = data;  // Affecter les dossiers récupérés à la variable "dossiers"
    });
  }

  // Méthode pour mettre à jour "rdvRecommande" pour un dossier spécifique
  updateRdvRecommande(dossier: DossierMedical): void {
    const newRdv = !dossier.rdvRecommande;  // Inverser l'état actuel de "rdvRecommande"
    this.dossierService.updateRdvRecommande(dossier.idDossier!, newRdv).subscribe(() => {
      dossier.rdvRecommande = newRdv;  // Mettre à jour l'UI avec le nouveau statut
    });
  }
}*/
import { Component, OnInit } from '@angular/core';
import { DossierMedicalService } from 'src/app/services/gestionNutrition/dossier-medical.service';

@Component({
  selector: 'app-dossier-n',
  templateUrl: './dossier-n.component.html',
  styleUrls: ['./dossier-n.component.css']
})
export class DossierNComponent implements OnInit {

  dossiers: any[] = [];  // Liste des dossiers médicaux

  constructor(private dossierService: DossierMedicalService) { }

  ngOnInit(): void {
    this.getAllDossiers();  // Récupère les dossiers au lancement
  }

  // Méthode pour récupérer tous les dossiers médicaux
  getAllDossiers() {
    this.dossierService.getAllDossiers().subscribe(
      (dossiers: any[]) => {
        this.dossiers = dossiers;
      },
      (error) => {
        console.error('Erreur lors de la récupération des dossiers : ', error);
      }
    );
  }

  // Méthode pour recommander un rendez-vous
  updateRdvRecommande(dossier: any) {
    dossier.rdvRecommande = !dossier.rdvRecommande;  // Bascule l'état de la recommandation
    this.dossierService.updateRdvRecommande(dossier.idDossier, dossier.rdvRecommande).subscribe(
      () => {
        console.log('Rendez-vous recommandé mis à jour.');
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du rdv recommandé : ', error);
      }
    );
  }
}
