import { Component, OnInit } from '@angular/core';
import { RendezvousService } from 'src/app/services/gestionNutrition/rendezvous.service';
import { RendezVous, StatutRendezVous } from 'src/app/models/RendezVous.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rendezvous-n',
  templateUrl: './rendezvous-n.component.html',
  styleUrls: ['./rendezvous-n.component.css']
})
export class RendezvousNComponent implements OnInit {
  rendezvousList: RendezVous[] = [];
  statutOptions = Object.values(StatutRendezVous); // ["EN_ATTENTE", "ACCEPTE", "REFUSE", etc.]

  constructor(private rendezvousService: RendezvousService,
    private router: Router,
        private toastr: ToastrService
  ) {}

  navigateTodossierN(): void {
    this.router.navigate(['/dossier-nutritionniste']).then(nav => {
      console.log('Navigation vers dossier médical réussie');
    }).catch(err => {
      console.error('Erreur de navigation:', err);
      this.toastr.error('Impossible d\'accéder au dossier médical', 'Erreur');
    });
  }
  

  ngOnInit(): void {
    this.loadRendezVous();
  }

  loadRendezVous(): void {
    this.rendezvousService.retrieveAllRendezVous().subscribe({
      next: (data) => {
        this.rendezvousList = data;
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des rendez-vous:', err);
      }
    });
  }

  onAccepterRendezvous(id: number): void {
    this.rendezvousService.updateStatutRendezvous(id, 'ACCEPTE').subscribe({
      next: () => {
        console.log('✅ Statut mis à jour avec succès');
        // Recharge la liste pour voir la mise à jour
        this.loadRendezVous();
      },
      error: (err) => {
        console.error('❌ Erreur lors de la mise à jour du statut :', err);
      }
    });
  }

  // Bonus : méthode générique
  updateStatut(rdv: RendezVous, newStatut: string): void {
    if (!rdv.idRendezVous || newStatut === rdv.statut) {
      return;
    }

    this.rendezvousService.updateStatutRendezvous(rdv.idRendezVous, newStatut).subscribe({
      next: () => {
        rdv.statut = newStatut as StatutRendezVous;
        console.log(`✅ Statut mis à jour en ${newStatut}`);
      },
      error: (err) => {
        console.error(`❌ Erreur lors de la mise à jour du statut :`, err);
      }
    });
  }
}
