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
  loading = false;
  statutUpdating: { [key: number]: boolean } = {};
  StatutRendezVous = StatutRendezVous;

  statutOptions = [
    StatutRendezVous.EN_COURS,
    StatutRendezVous.ACCEPTE,
    StatutRendezVous.REFUSE
  ];

  constructor(
    private rendezvousService: RendezvousService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');

    if (paramId && Number(paramId) > 0) {
      this.editMode = true;
      this.loadRendezVous(Number(paramId));
    } else {
      this.editMode = false;
      this.rendezVous.dateHeure = this.formatDateTimeLocal(new Date());
    }

    this.loadAllRendezVous();
  }

  loadRendezVous(id: number): void {
    this.rendezvousService.retrieveRendezVous(id).subscribe({
      next: (data) => {
        data.dateHeure = this.formatDateTimeLocal(data.dateHeure);
        this.rendezVous = data;
      },
      error: (err) => console.error('Erreur lors du chargement du rendez-vous :', err)
    });
  }

  loadAllRendezVous(): void {
    this.loading = true;
    this.rendezvousService.retrieveAllRendezVous().subscribe({
      next: (data) => {
        this.allRendezVous = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des rendez-vous :', err);
        this.loading = false;
      }
    });
  }

  submitForm(): void {
    if (!this.rendezVous.dateHeure || !this.rendezVous.duree || !this.rendezVous.remarque) {
      return;
    }

    if (this.editMode && this.rendezVous.idRendezVous) {
      this.rendezvousService.updateRendezVous(this.rendezVous.idRendezVous, this.rendezVous).subscribe({
        next: () => this.resetAndReload(),
        error: (err) => console.error('Erreur modification :', err)
      });
    } else {
      this.rendezvousService.addRendezVous(this.rendezVous).subscribe({
        next: () => this.resetAndReload(),
        error: (err) => console.error('Erreur ajout :', err)
      });
    }
  }

  editRendezVous(rdv: RendezVous): void {
    if (rdv.archived) return;

    this.rendezVous = JSON.parse(JSON.stringify(rdv));
    this.rendezVous.dateHeure = this.formatDateTimeLocal(this.rendezVous.dateHeure);
    this.editMode = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  resetAndReload(): void {
    this.rendezVous = this.resetForm();
    this.editMode = false;
    this.loadAllRendezVous();
  }

  formatDateTimeLocal(dateStr: string | Date): string {
    const date = new Date(dateStr);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  }

  getStatutLabel(statut: StatutRendezVous): string {
    switch (statut) {
      case StatutRendezVous.EN_COURS: return 'En cours';
      case StatutRendezVous.ACCEPTE: return 'Accepté';
      case StatutRendezVous.REFUSE:  return 'Refusé';
      default: return statut;
    }
  }

  hasRendezVousEnCours(): boolean {
    return this.allRendezVous.some(rdv => rdv.statut === StatutRendezVous.EN_COURS);
  }
}
