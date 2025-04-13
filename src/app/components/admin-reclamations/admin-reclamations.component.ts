import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';
import { Reclamation, StatutReclamation } from '../../models/reclamation.model'; 

@Component({
  selector: 'app-admin-reclamations',
  templateUrl: './admin-reclamations.component.html'
})
export class AdminReclamationsComponent implements OnInit {
  reclamations: Reclamation[] = [];
  statutOptions = Object.values(StatutReclamation);

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit() {
    this.loadReclamations();
  }

  loadReclamations() {
    this.reclamationService.getAll().subscribe({
      next: data => {
        console.log("Réclamations récupérées", data);
        this.reclamations = data;
      },
      error: err => {
        console.error("Erreur de chargement :", err);
      }
    });
      }

  updateStatut(id: number, statut: StatutReclamation) {
    this.reclamationService.updateReclamation(id, {
      statut,
      dateResolution: new Date()
    }).subscribe(() => {
      this.loadReclamations();
    });
  }
}