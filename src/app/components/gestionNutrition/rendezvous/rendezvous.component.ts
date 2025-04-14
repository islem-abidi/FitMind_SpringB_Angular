import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RendezvousService } from 'src/app/services/gestionNutrition/rendezvous.service';
import { RendezVous } from 'src/app/models/RendezVous.model';
import { StatutRendezVous } from 'src/app/models/RendezVous.model'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {

  rendezVous: RendezVous = {
    dateHeure: '',
    duree: 30,
    remarque: '',
    etudiant: { idUser: 2 },
    nutritioniste: { idUser: 1 },
    statut: StatutRendezVous.EN_COURS, // ✅ ici l'enum est utilisé
    archived: false,
    rappel: true
  };
  

  isEditMode = false;
  id!: number;

  constructor(
    private rendezvousService: RendezvousService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.isEditMode = true;
      this.rendezvousService.retrieveRendezVous(this.id).subscribe({
        next: (data) => {
          data.dateHeure = this.formatDateTimeLocal(data.dateHeure);
          this.rendezVous = data;
        },
        error: (err) => {
          console.error('Erreur chargement rendez-vous : ', err);
          alert('Erreur de chargement du rendez-vous.');
        }
      });
    } else {
      // Si mode ajout, initialiser la date à maintenant
      this.rendezVous.dateHeure = this.formatDateTimeLocal(new Date());
    }
  }

  formatDateTimeLocal(dateStr: string | Date): string {
    const date = new Date(dateStr);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16); // Format ISO compatible avec <input type="datetime-local">
  }

  onSubmit(): void {
    if (!this.rendezVous.dateHeure || !this.rendezVous.duree || !this.rendezVous.remarque) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (this.isEditMode) {
      this.rendezvousService.updateRendezVous(this.id, this.rendezVous).subscribe({
        next: () => {
          alert('Rendez-vous modifié avec succès');
          this.router.navigate(['/liste-rendezvous']);
        },
        error: (err) => {
          console.error('Erreur modification : ', err);
          alert('Erreur modification : ' + err.error);
        }
      });
    } else {
      this.rendezVous.statut = StatutRendezVous.EN_COURS;
      this.rendezvousService.addRendezVous(this.rendezVous).subscribe({
        next: () => {
          alert('Rendez-vous ajouté avec succès');
          this.router.navigate(['/liste-rendezvous']);
        },
        error: (err) => {
          console.error('Erreur ajout : ', err);
          alert('Erreur ajout : ' + err.error);
        }
      });
    }
  }
}
