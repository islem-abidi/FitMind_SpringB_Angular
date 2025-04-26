// src/app/components/ajout-reclamation/ajout-reclamation.component.ts

import { Component } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';
import { TypeReclamation, ReclamationRequest } from '../../models/reclamation.model';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private reclamationService: ReclamationService, private toastr: ToastrService) {}
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
        const message = err.error?.message || '';
      
        if (message.includes('toxique')) {
          this.toastr.error('❌ Veuillez reformuler votre description sans langage inapproprié.');
        } else {
          this.toastr.error(message ? '❌ Erreur : ' + message : '❌ Veuillez reformuler votre description sans langage inapproprié');
        }
      
        this.loading = false;
      }
                });
  }
  
}