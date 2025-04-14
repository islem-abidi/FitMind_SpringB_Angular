import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RendezvousService } from 'src/app/services/gestionNutrition/rendezvous.service';
import { RendezVous, StatutRendezVous } from 'src/app/models/RendezVous.model';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {

  rendezVous: RendezVous = this.resetForm();
  allRendezVous: RendezVous[] = [];
  editMode = false;

  constructor(
    private rendezvousService: RendezvousService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');

    if (paramId !== null && Number(paramId) > 0) {
      const id = Number(paramId);
      this.editMode = true;

      this.rendezvousService.retrieveRendezVous(id).subscribe({
        next: (data) => {
          data.dateHeure = this.formatDateTimeLocal(data.dateHeure);
          this.rendezVous = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement du rendez-vous :', err);
          alert('Erreur lors du chargement du rendez-vous.');
        }
      });
    } else {
      this.editMode = false;
      this.rendezVous.dateHeure = this.formatDateTimeLocal(new Date());
    }

    this.loadAllRendezVous();
  }

  resetForm(): RendezVous {
    return {
      idRendezVous: undefined,
      dateHeure: '',
      duree: 30,
      remarque: '',
      etudiant: { idUser: 2 },
      nutritioniste: { idUser: 1 },
      statut: StatutRendezVous.EN_COURS,
      archived: false,
      rappel: true
    };
  }

  formatDateTimeLocal(dateStr: string | Date): string {
    const date = new Date(dateStr);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  }

  submitForm(): void {
    if (!this.rendezVous.dateHeure || !this.rendezVous.duree || !this.rendezVous.remarque) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (this.editMode && this.rendezVous.idRendezVous) {
      this.rendezvousService.updateRendezVous(this.rendezVous.idRendezVous, this.rendezVous).subscribe({
        next: () => {
          alert('Rendez-vous modifié avec succès.');
          this.resetAndReload();
        },
        error: (err) => {
          console.error('Erreur modification :', err);
          alert('Erreur lors de la modification.');
        }
      });
    } else {
      this.rendezvousService.addRendezVous(this.rendezVous).subscribe({
        next: () => {
          alert('Rendez-vous ajouté avec succès.');
          this.resetAndReload();
        },
        error: (err) => {
          console.error('Erreur ajout :', err);
          alert('Erreur lors de l\'ajout.');
        }
      });
    }
  }

  resetAndReload(): void {
    this.rendezVous = this.resetForm();
    this.editMode = false;
    this.loadAllRendezVous();
  }

  loadAllRendezVous(): void {
    this.rendezvousService.retrieveAllRendezVous().subscribe({
      next: (data) => {
        this.allRendezVous = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des rendez-vous :', err);
      }
    });
  }

  editRendezVous(rdv: RendezVous): void {
    if (rdv.archived) {
      alert("Ce rendez-vous est archivé.");
      return;
    }
    this.rendezVous = { ...rdv };
    this.rendezVous.dateHeure = this.formatDateTimeLocal(this.rendezVous.dateHeure);
    this.editMode = true;
  }

  changerStatut(id: number, nouveauStatut: string): void {
    this.rendezvousService.updateStatutRendezVous(id, { statut: nouveauStatut }).subscribe({
      next: () => {
        alert('Statut mis à jour avec succès.');
        this.loadAllRendezVous();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut :', err);
      }
    });
  }

  archiverRendezVous(id: number): void {
    if (confirm('Voulez-vous vraiment archiver ce rendez-vous ?')) {
      this.rendezvousService.archiveRendezVous(id).subscribe({
        next: () => {
          alert('Rendez-vous archivé.');
          this.loadAllRendezVous();
        },
        error: (err) => {
          console.error('Erreur lors de l’archivage :', err);
        }
      });
    }
  }
}
