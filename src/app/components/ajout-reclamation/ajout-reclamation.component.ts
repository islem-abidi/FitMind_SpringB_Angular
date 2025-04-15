// src/app/components/ajout-reclamation/ajout-reclamation.component.ts

import { Component } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';
import { TypeReclamation, ReclamationRequest } from '../../models/reclamation.model';

@Component({
  selector: 'app-ajout-reclamation',
  templateUrl: './ajout-reclamation.component.html',
})
export class AjoutReclamationComponent {
  form: ReclamationRequest = {
    typeReclamation: TypeReclamation.Problème_Repas,
    description: ''
  };
  mesReclamations: any[] = [];

  successMsg = '';
  errorMsg = '';

  constructor(private reclamationService: ReclamationService) {}
  loading = false;

  ngOnInit(): void {
    this.loadMesReclamations();
  }
  loadMesReclamations(): void {
    this.reclamationService.getMyReclamations().subscribe({
      next: (data) => this.mesReclamations = data,
      error: (err) => console.error('Erreur lors du chargement des réclamations perso', err)
    });
  }
  
  submitForm(): void {
    this.loading = true;
    this.reclamationService.addReclamation(this.form).subscribe({
      next: () => {
        this.successMsg = '✅ Réclamation ajoutée avec succès.';
        this.errorMsg = '';
        this.form = {
          typeReclamation: TypeReclamation.Problème_Repas,
          description: ''
        };
        this.loadMesReclamations();
        this.loading = false;
      },
      error: err => {
        this.errorMsg = '❌ Erreur : ' + (err.error?.message || 'Impossible d\'ajouter la réclamation');
        this.successMsg = '';
        this.loading = false;
      }
    });
  }
  
}