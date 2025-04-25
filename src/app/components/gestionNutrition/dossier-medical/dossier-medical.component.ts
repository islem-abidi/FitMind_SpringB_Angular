import { Component, OnInit } from '@angular/core';
import { DossierMedical, DossierMedicalService } from 'src/app/services/gestionNutrition/dossier-medical.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dossier-medical',
  templateUrl: './dossier-medical.component.html',
  styleUrls: ['./dossier-medical.component.css']
})
export class DossierMedicalComponent implements OnInit {
  dossiers: DossierMedical[] = [];
  dossier: DossierMedical = this.resetForm();
  editMode = false;
  isAdmin = false;
  isRdvRecommended: boolean = false;
  recommendedDossier: DossierMedical | null = null;

  constructor(
    private dossierService: DossierMedicalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchAllDossiers();
  }

  fetchAllDossiers(): void {
    this.dossierService.getAllDossiers().subscribe(data => {
      this.dossiers = this.isAdmin ? data : data.filter(d => !d.archived);
      this.checkRecommendedRdv();
    });
  }

  checkRecommendedRdv(): void {
    this.isRdvRecommended = false;
    this.recommendedDossier = null;
    
    for (const d of this.dossiers) {
      if (d.rdvRecommande) {
        this.isRdvRecommended = true;
        this.recommendedDossier = d;
        break;
      }
    }
  }

  submitForm(): void {
    if (!this.dossier.maladies || !this.dossier.objectifSante || !this.dossier.traitements) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
  
    if (this.dossier.poids < 30) {
      alert("Le poids doit être supérieur ou égal à 30 kg.");
      return;
    }
  
    if (this.dossier.tailles < 30) {
      alert("La taille doit être supérieure ou égale à 30 cm.");
      return;
    }
  
    if (this.dossier.tailles && this.dossier.poids) {
      this.dossier.imc = this.dossier.poids / Math.pow(this.dossier.tailles / 100, 2);
    }
  
    this.dossier.user = { idUser: 2 }; 
  
    if (this.editMode && this.dossier.idDossier) {
      this.dossierService.updateDossier(this.dossier).subscribe({
        next: () => this.resetAndReload(),
        error: (err) => {
          console.error("Erreur modification :", err);
          alert("Erreur lors de la modification du dossier.");
        }
      });
    } else {
      this.dossierService.addDossier(this.dossier).subscribe({
        next: () => this.resetAndReload(),
        error: (err) => {
          console.error("Erreur ajout :", err);
          alert(err.error?.message || "Erreur lors de l'ajout.");
        }
      });
    }
  }

  editDossier(d: DossierMedical): void {
    if (d.archived) {
      alert("Ce dossier est archivé.");
      return;
    }
    this.dossier = { ...d };
    this.editMode = true;
  }
  navigateToCalendar(): void {
    this.router.navigate(['/calender']);
  }
  navigateToIA(): void {
    this.router.navigate(['/IA']);
  }

  /*archiveDossier(id: number): void {
    this.dossierService.archiveDossier(id).subscribe(() => {
      this.fetchAllDossiers();
      this.dossier = this.resetForm();
      this.editMode = false;
    });
  }*/

  resetForm(): DossierMedical {
    return {
      user: null,
      maladies: '',
      objectifSante: '',
      traitements: '',
      tailles: 0,
      poids: 0,
      groupeSanguin: '',
      allergies: '',
      archived: false,
      rdvRecommande: false
    };
  }

  resetAndReload(): void {
    this.dossier = this.resetForm();
    this.editMode = false;
    this.fetchAllDossiers();
  }

  navigateToRendezVous(): void {
    if (this.isRdvRecommended) {
      this.router.navigate(['/rendez-vous']);
    }
  }
}