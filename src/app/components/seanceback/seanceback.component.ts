import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeanceSport } from 'src/app/models/SeanceSport';
import { SeanceService } from 'src/app/services/seance.service';

@Component({
  selector: 'app-seanceback',
  templateUrl: './seanceback.component.html',
  styleUrls: ['./seanceback.component.css']
})
export class SeancebackComponent {

  today: string = '';
  activiteId!: number;
  seances: SeanceSport[] = [];

  constructor(
    private route: ActivatedRoute,
    private seanceService: SeanceService
  ) {}

  ngOnInit(): void {
    this.activiteId = Number(this.route.snapshot.paramMap.get('id'));
    this.today = new Date().toISOString().split('T')[0]; // 'yyyy-MM-dd' format

    if (this.activiteId) {
      this.loadSeancesByActivite(this.activiteId);
    }
  }

  loadSeancesByActivite(activiteId: number): void {
    this.seanceService.getByActiviteId(activiteId).subscribe({
      next: (data) => {
        this.seances = data; // Stocke les séances récupérées
        console.log(`Séances pour l'activité ${activiteId}:`, this.seances);
      },
      error: (err) => console.error('Erreur lors du chargement des séances', err)
    });
  }

  showForm: boolean = false;
isEditMode: boolean = false;
currentSeance: any = {};

openAddSeanceForm(): void {
  this.showForm = true;
  this.isEditMode = false;
  this.currentSeance = {}; // Réinitialise les données du formulaire
}

openEditSeanceForm(seance: SeanceSport): void {
  this.currentSeance = { ...seance,
       activite: seance.activite ?? { id: this.activiteId } // ✅ garder activité
}; // Pré-remplit le formulaire avec les données existantes
  this.showForm = true;
  this.isEditMode = true;
}

submitSeanceForm(): void {
  if (!this.currentSeance.dateSeance || this.currentSeance.dateSeance.startsWith('0001')) {
    alert("La date de la séance est invalide.");
    return;
  }
  this.currentSeance.activite = { id: this.activiteId }; // important !

  if (this.isEditMode) {
    console.log('Modification de la séance :', this.currentSeance);
    if (!this.currentSeance.activite) {
      this.currentSeance.activite = { id: this.activiteId }; // 🔁 Ajout au cas où
    }
    this.seanceService.update(this.currentSeance).subscribe({
      next: () => {
        console.log('Séance modifiée avec succès');
        this.loadSeancesByActivite(this.activiteId);
        this.cancelForm();
      },
      error: (err) => console.error('Erreur lors de la modification :', err)
    });
  } else {
    console.log('Ajout de la séance :', this.currentSeance);
    this.seanceService.create(this.currentSeance, this.activiteId).subscribe({
      next: () => {
        console.log('Séance ajoutée avec succès');
        this.loadSeancesByActivite(this.activiteId); // Recharge les séances
        this.cancelForm();
      },
      error: (err) => console.error('Erreur lors de l’ajout de la séance :', err)
    });
  }
}

cancelForm(): void {
  this.showForm = false;
  this.isEditMode = false;
  this.currentSeance = {};
}
deleteSeance(id: number | undefined): void {
  if (!id) return;

  if (confirm('Voulez-vous vraiment supprimer cette séance ?')) {
    this.seanceService.delete(id).subscribe({
      next: () => {
        console.log('Séance supprimée avec succès');
        this.loadSeancesByActivite(this.activiteId);
      },
      error: (err) => console.error('Erreur lors de la suppression :', err)
    });
  }
}
}
