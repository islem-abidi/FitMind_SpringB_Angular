import { Component, OnInit } from '@angular/core';
import { RendezvousService } from 'src/app/services/gestionNutrition/rendezvous.service';
import { RendezVous } from 'src/app/models/RendezVous.model';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {

  rendezvousList: RendezVous[] = [];

  formData = {
    dateHeure: '',
    duree: 30,
    remarque: ''
  };

  constructor(private rendezvousService: RendezvousService) {}

  ngOnInit(): void {
    this.rendezvousService.getAllRendezVous().subscribe(data => {
      this.rendezvousList = data;
    });
  }

  addRendezVous(): void {
    const futureDate = new Date(this.formData.dateHeure);
    const now = new Date();

    if (futureDate <= now) {
      alert("La date du rendez-vous doit être dans le futur !");
      return;
    }

    const newRendezVous: RendezVous = {
      idRendezVous: 0,
      nutritioniste: { id: 1 }, // 👈 à remplacer dynamiquement si besoin
      etudiant: { id: 2 },      // 👈 idem
      dateHeure: futureDate,
      duree: this.formData.duree,
      remarque: this.formData.remarque,
      rappel: false,
      statut: 'EN_COURS',
      archived: false
    };

    console.log('Rendez-vous envoyé :', newRendezVous);

    this.rendezvousService.addRendezVous(newRendezVous).subscribe(
      (response) => {
        this.rendezvousList.push(response);
        this.formData = {
          dateHeure: '',
          duree: 30,
          remarque: ''
        };
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du rendez-vous', error);
      }
    );
  }
}
