import { Component, OnInit } from '@angular/core';
import { DossierMedical, DossierMedicalService } from 'src/app/services/gestionNutrition/dossier-medical.service';

@Component({
  selector: 'app-dossier-medical',
  templateUrl: './dossier-medical.component.html',
  styleUrls: ['./dossier-medical.component.css']
})
export class DossierMedicalComponent implements OnInit {
  dossiers: DossierMedical[] = [];
  dossier: DossierMedical = this.resetForm();
  editMode = false;
  isAdmin = false; // Simule ton rôle ici ou récupère depuis un AuthService
  isRdvRecommended: boolean = false; // Statut pour savoir si le RDV est recommandé

  constructor(private dossierService: DossierMedicalService) {}

  ngOnInit(): void {
    this.fetchAllDossiers();
  }

  fetchAllDossiers(): void {
    this.dossierService.getAllDossiers().subscribe(data => {
      this.dossiers = this.isAdmin ? data : data.filter(d => !d.archived);
    });
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

  archiveDossier(id: number): void {
    this.dossierService.archiveDossier(id).subscribe(() => {
      this.fetchAllDossiers();
      this.dossier = this.resetForm();
      this.editMode = false;
    });
  }

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

  // Méthode pour gérer la recommandation de rendez-vous
  fetchDossierAndCheckRdv(): void {
    this.dossierService.getAllDossiers().subscribe(data => {
      this.dossiers = data;
      this.dossiers.forEach(d => {
        if (d.rdvRecommande) {
          this.isRdvRecommended = true;
        }
      });
    });
  }

  // Méthode pour réserver un rendez-vous
  reserverRdv(): void {
    if (!this.isRdvRecommended) {
      alert('Aucun rendez-vous recommandé pour ce dossier.');
      return;
    }

    // Logique pour réserver un rendez-vous (par exemple, appel à un service de réservation)
    console.log('Rendez-vous réservé');
    alert('Le rendez-vous a été réservé avec succès.');
  }
}
