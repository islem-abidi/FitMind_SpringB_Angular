import { Component, OnInit } from '@angular/core';
import { RendezvousService } from 'src/app/services/gestionNutrition/rendezvous.service';
import { RendezVous, StatutRendezVous } from 'src/app/models/RendezVous.model';

@Component({
  selector: 'app-admin-rdv',
  templateUrl: './admin-rdv.component.html',
  styleUrls: ['./admin-rdv.component.css']
})
export class AdminRdvComponent implements OnInit {
  rendezvousList: RendezVous[] = [];
  statutRendezVousEnum = StatutRendezVous;

  constructor(private rendezvousService: RendezvousService) {}

  ngOnInit(): void {
    this.retrieveAllRendezVous();
  }

  retrieveAllRendezVous(): void {
    this.rendezvousService.retrieveAllRendezVous().subscribe({
      next: (rdvs) => {
        this.rendezvousList = rdvs;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des rendez-vous', err);
      }
    });
  }

  archiveRendezVous(id: number): void {
    if (confirm('Voulez-vous vraiment archiver ce rendez-vous ?')) {
      this.rendezvousService.archiveRendezVous(id).subscribe({
        next: (rdv) => {
          console.log('Rendez-vous archivé avec succès :', rdv);
          this.retrieveAllRendezVous();  // Recharge la liste après mise à jour
        },
        error: (err) => {
          console.error('Erreur lors de l\'archivage du rendez-vous :', err);
        }
      });
    }
  }
  
}
