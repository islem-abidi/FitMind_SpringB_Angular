import { Component, OnInit } from '@angular/core';
import { DossierMedicalService } from 'src/app/services/gestionNutrition/dossier-medical.service';

@Component({
  selector: 'app-dossier-n',
  templateUrl: './dossier-n.component.html',
  styleUrls: ['./dossier-n.component.css']
})
export class DossierNComponent implements OnInit {
  dossiers: any[] = [];

  constructor(private dossierService: DossierMedicalService) {}

  ngOnInit(): void {
    this.getAllDossiers();
  }

  getAllDossiers(): void {
    this.dossierService.getAllDossiers().subscribe(
      (dossiers: any[]) => {
        this.dossiers = dossiers.map(dossier => {
          const poids = parseFloat(dossier.poids);
          const tailles = parseFloat(dossier.tailles); // Correction ici

          let imc = 0; // Initialiser à 0 au lieu de null

          if (!isNaN(poids) && !isNaN(tailles) && tailles > 0) {
            const tailleEnMetres = tailles / 100;
            imc = poids / (tailleEnMetres * tailleEnMetres);
            imc = parseFloat(imc.toFixed(2)); // Limite à 2 décimales
          }

          return {
            ...dossier,
            poids: poids || 0,  // Définir à 0 si NaN
            tailles: tailles || 0,  // Définir à 0 si NaN
            imc: imc  // Utiliser le calcul de l'IMC
          };
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des dossiers :', error);
      }
    );
  }

  updateRdvRecommande(dossier: any): void {
    const newRdv = !dossier.rdvRecommande;
    this.dossierService.updateRdvRecommande(dossier.idDossier, newRdv).subscribe(
      () => {
        dossier.rdvRecommande = newRdv;
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du rendez-vous recommandé :', error);
      }
    );
  }
}
