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
  statutOptions: string[] = Object.values(StatutRendezVous);  // Assurez-vous que l'énumération est correcte

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
        alert('❌ Erreur lors du chargement des rendez-vous.');
      }
    });
  }

  updateStatut(rdv: RendezVous, newStatut: StatutRendezVous): void {
    // Vérifier si le nouveau statut est le même que l'ancien
    if (rdv.statut === newStatut) {
      return; // Pas besoin de mettre à jour si le statut n'a pas changé
    }

    // Créer la payload avec le statut à mettre à jour
    const updatePayload = { statut: newStatut };

    // Appel au service pour mettre à jour le statut
    this.rendezvousService.updateStatutRendezVous(rdv.idRendezVous!, updatePayload)
      .subscribe({
        next: () => {
          rdv.statut = newStatut; // Mise à jour du statut localement
          alert('✅ Statut mis à jour avec succès !');
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du statut :', err);
          alert('❌ Erreur de mise à jour du statut.');
        }
      });
  }
}
