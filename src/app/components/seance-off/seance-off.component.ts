import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SeanceSport } from 'src/app/Models/SeanceSport';
import { ActiviteServiceService } from 'src/app/services/activite-service.service';
import { SeanceService } from 'src/app/services/seance.service';

@Component({
  selector: 'app-seance-off',
  templateUrl: './seance-off.component.html',
  styleUrls: ['./seance-off.component.css']
})
export class SeanceOffComponent implements OnInit {
  seances: SeanceSport[] = [];
  activiteId!: number;
  activiteNom!: string;
  userId = 1; // 🔄 remplace ça par l’ID de l'utilisateur connecté (via token ou service Auth)
  seancesActives: SeanceSport[] = [];
  seancesArchivees: SeanceSport[] = [];
  constructor(
    private route: ActivatedRoute,
    private seanceService: SeanceService,
    private activiteService: ActiviteServiceService,
   private http: HttpClient,
    private toastr: ToastrService,
    private router: Router// Service pour récupérer les détails de l'activité

  ) {}

  ngOnInit(): void {
    this.activiteId = +this.route.snapshot.paramMap.get('activiteId')!;
    this.seanceService.getByActiviteId(this.activiteId).subscribe({
      next: (data) => {
        this.seances = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des séances', err);
      }
    });
    this.activiteService.getById(this.activiteId).subscribe({
      next: (activite) => {
        this.activiteNom = activite.nomActivite; // Assurez-vous que l'API retourne le nom
      },
      error: (err) => {
        console.error('Erreur lors du chargement des détails de l\'activité', err);
      }
    });
    this.route.queryParams.subscribe(params => {
      const reservationId = params['reservationId'];
      if (reservationId) {
        this.http.put(`http://localhost:8080/reservations/confirm-reservation/${reservationId}`, null)
         .subscribe({
            next: () => this.toastr.success('✅ Votre réservation est confirmée !'),
            error: () => this.toastr.error('❌ Impossible de confirmer la réservation.')
          });
      }
    });

      this.seances.sort((a, b) => {
        const heureA = new Date(`1970-01-01T${a.heureDebut}`).getTime();
        const heureB = new Date(`1970-01-01T${b.heureDebut}`).getTime();
        return heureA - heureB; // tri croissant, mettre `b - a` pour décroissant
      });

      this.filtrerSeancesActivesEtArchivees();

  }

  isSeanceValide(seance: any): boolean {
    const now = new Date();
    const dateSeance = new Date(seance.dateSeance);
    const heureFin = seance.heureFin ? seance.heureFin : '23:59';

    // Fusionner date + heureFin en un seul objet Date
    const [hours, minutes, seconds] = heureFin.split(':');
    dateSeance.setHours(+hours, +minutes, +seconds || 0);

    return dateSeance > now; // garde seulement les séances futures
  }

filtrerSeancesActivesEtArchivees() {
  const maintenant = new Date();

  this.seancesActives = [];
  this.seancesArchivees = [];

  for (const seance of this.seances) {
    const dateSeance = new Date(seance.dateSeance);
    const [hFin, mFin, sFin] = seance.heureFin.split(':').map(Number);

    // Créer une date complète avec l'heure de fin
    const dateHeureFin = new Date(seance.dateSeance);
    dateHeureFin.setHours(hFin, mFin, sFin || 0);

    // Vérifier si la séance est passée
    if (dateSeance < maintenant && dateHeureFin < maintenant) {
      this.seancesArchivees.push(seance);
    } else {
      this.seancesActives.push(seance);
    }
  }
}



  reserverSeance(seanceId: number) {
    const userId = 1; // Adapté à ton auth système

    this.http.post('http://localhost:8080/activite-sportive/reservations/attente', null, {
      params: {
        seanceId: seanceId,
        userId: 1
      }
    }).subscribe({
      next: (res) => {
        this.toastr.success('Réservation confirmée. Un e-mail a été envoyé.');
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(err?.error?.message || 'Erreur lors de la réservation.');
      }
    });

  }
  formatHeure(heure: string): string {
    const date = new Date(`1970-01-01T${heure}`);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  retour() {
    this.router.navigate(['/activite-off']); // 🔁 adapte le chemin selon ta route
  }
}
