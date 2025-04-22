import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Activite } from 'src/app/Models/activite';
import { ActiviteServiceService } from 'src/app/services/activite-service.service';

@Component({
  selector: 'app-activite-off',
  templateUrl: './activite-off.component.html',
  styleUrls: ['./activite-off.component.css']
})
export class ActiviteOffComponent {
  activites: Activite[] = [];
  message: string | null = null;
  imageUrls: { [id: number]: string } = {};
  activiteTop?: Activite; // activité avec le plus de réservations
  activiteTopId: number | null = null;

  constructor(private activiteService: ActiviteServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.http.get<Activite[]>('http://localhost:8080/activite-sportive/api/activites/tendance')
  .subscribe({
    next: (data) => {
      if (!data || data.length === 0) {
        this.activites = [];
        this.activiteTopId = null;
        return;
      }

      // data est déjà trié par le backend, on garde tel quel
      this.activites = data;
      this.activiteTopId = data[0].id; // le top 1 est en premier
        this.activites.forEach(act => {
          this.imageUrls[act.id] = `http://localhost:8080/activite-sportive/api/activites/image/${act.id}`;
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement des activités', err);
      }
    });


    this.route.queryParams.subscribe(params => {
      const reservationId = params['reservationId'];
      if (reservationId) {
        console.log("📦 ID de réservation reçu :", reservationId);
        this.http.put(`http://localhost:8080/activite-sportive/reservations/confirm-reservation/${reservationId}`, null)
          .subscribe({
            next: () => {
              this.message = "✅ Votre réservation a été confirmée avec succès.";
              this.toastr.success(this.message);
            },
            error: () => {
              this.message = "❌ Une erreur est survenue lors de la confirmation.";
              this.toastr.error(this.message);
            }
          });
      }
    });

  }

afficherDetails(activite: Activite): void {
  this.router.navigate(['/seances', activite.id]); // Naviguer vers SeanceOffComponent
}
}
