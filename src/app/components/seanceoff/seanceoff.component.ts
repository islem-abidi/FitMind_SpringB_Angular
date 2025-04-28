import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SeanceSport } from 'src/app/models/SeanceSport';
import { ActiviteServiceService } from 'src/app/services/activite-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { SeanceService } from 'src/app/services/seance.service';

@Component({
  selector: 'app-seanceoff',
  templateUrl: './seanceoff.component.html',
  styleUrls: ['./seanceoff.component.css']
})
export class SeanceoffComponent {
  seances: SeanceSport[] = [];
  activiteId!: number;
  activiteNom!: string;
  seancesActives: SeanceSport[] = [];
  seancesArchivees: SeanceSport[] = [];
  constructor(
    private route: ActivatedRoute,
    private seanceService: SeanceService,
    private activiteService: ActiviteServiceService,
   private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,// Service pour récupérer les détails de l'activité
    private authService: AuthService,

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
        // Cette partie à supprimer
        this.http.put(`http://localhost:8081/PIdev/reservations/confirm-reservation/${reservationId}`, null)
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
}reserverSeance(seanceId: number) {
  const token = sessionStorage.getItem('token');
  if (!token) {
    this.toastr.error("⚠️ Connexion requise pour réserver.");
    return;
  }

  const confirmed = window.confirm("📩 Veux-tu confirmer ta réservation ? Un email te sera envoyé.");

  if (!confirmed) {
    return; // l'utilisateur a annulé => on stoppe ici
  }

  const params = new HttpParams().set('seanceId', seanceId.toString());

  this.http.post('http://localhost:8081/PIdev/reservations/attente', null, {
    params,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).subscribe({
    next: () => this.toastr.success("📧 Un email de confirmation a été envoyé."),
    error: (err) => {
      console.error("❌ Erreur lors de la réservation :", err);
      this.toastr.error("❌ Réservation échouée !");
    }
  });
}


  formatHeure(heure: string): string {
    const date = new Date(`1970-01-01T${heure}`);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  retour() {
    this.router.navigate(['/activite']); // 🔁 adapte le chemin selon ta route
  }
}
