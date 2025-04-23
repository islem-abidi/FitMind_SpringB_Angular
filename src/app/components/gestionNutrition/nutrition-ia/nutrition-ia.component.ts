import { Component } from '@angular/core';
import {NutritionIAService} from 'src/app/services/gestionNutrition/nutrition-ia.service';
@Component({
  selector: 'app-nutrition-ia',
  templateUrl: './nutrition-ia.component.html',
  styleUrls: ['./nutrition-ia.component.css']
})
export class NutritionIAComponent {
  dossierId = 1;
  activity = 'musculation';
  duration = 60;
  temperature = 25;
  
  result: any;
  isLoading = false;
  error: string | null = null;

  constructor(private NutritionIAService: NutritionIAService) {}

  getPrediction() {
    this.isLoading = true;
    this.error = null;
    
    this.NutritionIAService.getPrediction(
      this.dossierId,
      this.activity,
      this.duration,
      this.temperature
    ).subscribe({
      next: (data) => {
        this.result = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Erreur lors de la prédiction';
        this.isLoading = false;
      }
    });
  }
}
