import { Component } from '@angular/core';
import { NutritionIAService } from 'src/app/services/gestionNutrition/nutrition-ia.service';

@Component({
  selector: 'app-nutrition-ia',
  templateUrl: './nutrition-ia.component.html',
  styleUrls: ['./nutrition-ia.component.css']
})
export class NutritionIAComponent {
  dossierId = 1;
  activity = 'musculation';
  duration = 60;
  city = 'Tunis';

  result: any;
  isLoading = false;
  error: string | null = null;

  constructor(private nutritionIAService: NutritionIAService) {}

  getPrediction() {
    this.isLoading = true;
    this.error = null;
    this.result = null;

    this.nutritionIAService.getPrediction(
      this.dossierId,
      this.activity,
      this.duration,
      this.city
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
