import { Component, OnInit } from '@angular/core';
import { RendezvousService } from 'src/app/services/gestionNutrition/rendezvous.service';
import { RendezVous, StatutRendezVous } from 'src/app/models/RendezVous.model';

@Component({
  selector: 'app-rendezvous-n',
  templateUrl: './rendezvous-n.component.html',
  styleUrls: ['./rendezvous-n.component.css']
})
export class RendezvousNComponent implements OnInit {
  rendezvousList: RendezVous[] = [];
  statutOptions = Object.values(StatutRendezVous);

  constructor(private rendezvousService: RendezvousService) {}

  ngOnInit(): void {
    this.loadRendezVous();
  }

  loadRendezVous(): void {
    this.rendezvousService.retrieveAllRendezVous().subscribe({
      next: (data) => {
        this.rendezvousList = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des rendez-vous:', err);
      }
    });
  }

  updateStatut(rdv: RendezVous, newStatut: string): void {
    if (!rdv.idRendezVous || rdv.statut === newStatut) {
      return;
    }

    this.rendezvousService.updateStatutRendezVous(rdv.idRendezVous, newStatut).subscribe({
      next: (updatedRdv) => {
        rdv.statut = newStatut as StatutRendezVous;
        console.log('Statut mis à jour avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut:', err);
        // Revert the change in UI if the request fails
        const selectElement = document.querySelector(`select[ng-reflect-model="${newStatut}"]`) as HTMLSelectElement;
        if (selectElement) {
          selectElement.value = rdv.statut || '';
        }
      }
    });
  }
}