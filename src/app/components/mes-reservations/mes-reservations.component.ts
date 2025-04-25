import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Reservation, ReservationStatus } from '../../models/reservation';
import { AuthService } from 'src/app/services/auth.service';
import { Activite } from 'src/app/models/activite';

@Component({
  selector: 'app-mes-reservations',
  templateUrl: './mes-reservations.component.html',
  styleUrls: ['./mes-reservations.component.css']
})
export class MesReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  userId!: number;
  statusEnum = ReservationStatus;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserrId();
    console.log("👤 ID Utilisateur récupéré :", userId);
    console.log(this.authService.getDecodedToken());

    if (!userId) {
      this.toastr.error("❌ Utilisateur non authentifié", "Erreur");
      return;
    }

    this.userId = +userId;
    this.getReservationsByUserr();
  }
  getReservationsByUserr(): void {
    this.http.get<Reservation[]>(
      `http://localhost:8081/PIdev/reservations/user/${this.userId}`,
      { headers: this.getHeaders() }
    )
  }
getReservationsByUser(userId: number) {
  this.http.get<any[]>(`http://localhost:8081/PIdev/reservations/user/${this.userId}`
  ).subscribe({
    next: (data) => {
      this.reservations = data;
      console.log('Réservations:', data);
    },
    error: (err) => {
      this.toastr.error("❌ Erreur de récupération", "Erreur");
    }
  });
}
  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getReservationsByUserrr(): void {
    this.http.get<Reservation[]>(
      `http://localhost:8081/PIdev/reservations/user/${this.userId}`,
      { headers: this.getHeaders() }
    ).subscribe({
      next: (data) => {
        const order = {
          CONFIRMEE: 1,
          EN_ATTENTE: 2,
          ANNULEE: 3
        };
        this.reservations = data.sort((a, b) => order[a.status] - order[b.status]);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réservations', err);
        this.toastr.error('Impossible de charger vos réservations.');
      }
    });
  }

  annulerReservation(reservationId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment annuler cette réservation ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, annuler',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(
          `http://localhost:8081/PIdev/reservations/annuler/${reservationId}`,
          { responseType: 'text' as 'json', headers: this.getHeaders() }
        ).subscribe({
          next: () => {
            this.reservations = this.reservations.map(r =>
              r.id_reservation === reservationId
                ? { ...r, status: this.statusEnum.ANNULEE }
                : r
            );
            Swal.fire('Annulée !', 'Votre réservation a été annulée.', 'success');
            this.toastr.success('Réservation annulée ✅');
          },
          error: (err) => {
            console.error('Erreur lors de l\'annulation', err);
            this.toastr.error('Erreur lors de l’annulation');
            Swal.fire('Erreur', 'Impossible d\'annuler la réservation.', 'error');
          }
        });
      }
    });
  }

      telechargerPDF(): void {
        const doc = new jsPDF();
        const marginX = 15;
        let y = 30;
        // En-tête colorée
        doc.setFillColor(30, 144, 255); // bleu
        doc.rect(0, 0, 210, 20, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(255);
        doc.text('Mes Réservations Sportives', 105, 13, { align: 'center' });
        doc.setFontSize(10);
        doc.setTextColor(90);
        doc.text(`Généré le : ${new Date().toLocaleString()}`, marginX, y);
        y += 10;
        // Pré-charger les icônes avant affichage
        const icons = {
          date: 'assets/icons/calendar.png',
          heure: 'assets/icons/clock.png',
          lieu: 'assets/icons/location.png',
          statut: 'assets/icons/check.png',
          activite: 'assets/icons/sport.png'
        };
        // Charger les icônes en Image()
        const iconImgs: any = {};
        const iconNames = Object.keys(icons);
        let loaded = 0;

        iconNames.forEach((key) => {
          const img = new Image();
          img.onload = () => {
            iconImgs[key] = img;
            loaded++;
            if (loaded === iconNames.length) {
              drawReservations(); // lancer une fois tout chargé
            }
          };
        });

        const drawReservations = () => {
          this.reservations.forEach((res: any) => {
            const date = new Date(res.seance.dateSeance).toLocaleDateString();
            const heureDebut = res.seance.heureDebut || '--:--';
            const heureFin = res.seance.heureFin || '--:--';
            const lieu = res.seance.lieu || 'N/A';
            const statut = res.status || '--';
            const activite = res.seance.activite.nomActivite;

            // Bloc avec fond gris clair
            doc.setFillColor(245, 245, 245);
            doc.roundedRect(marginX, y, 180, 50, 4, 4, 'F');
            let innerY = y + 10;

            // ✅ Affichage avec icônes
            const iconSize = 5;
            const textOffset = 8;

            // Ligne 1 - Date + Heure
            doc.addImage(iconImgs.date, 'PNG', marginX + 5, innerY - 4, iconSize, iconSize);
            doc.text(date, marginX + textOffset + 5, innerY);

            doc.addImage(iconImgs.heure, 'PNG', marginX + 90, innerY - 4, iconSize, iconSize);
            doc.text(`${heureDebut} - ${heureFin}`, marginX + 95 + textOffset, innerY);
            innerY += 8;

            // Ligne 2 - Lieu + Statut
            doc.addImage(iconImgs.lieu, 'PNG', marginX + 5, innerY - 4, iconSize, iconSize);
            doc.text(lieu, marginX + textOffset + 5, innerY);

            doc.addImage(iconImgs.statut, 'PNG', marginX + 90, innerY - 4, iconSize, iconSize);
            doc.text(statut, marginX + 95 + textOffset, innerY);
            innerY += 8;

            // Ligne 3 - Activité
            doc.addImage(iconImgs.activite, 'PNG', marginX + 5, innerY - 4, iconSize, iconSize);
            doc.setFont('helvetica', 'bold');
            doc.text(`Activité : ${activite}`, marginX + textOffset + 5, innerY);
            doc.setFont('helvetica', 'normal');

            y += 60;
            if (y > 260) {
              doc.addPage();
              y = 30;
            }
          });

          // Footer
          doc.setFontSize(9);
          doc.setTextColor(120);
          doc.text('Club Sportif – Document généré automatiquement', marginX, 290);

          // Téléchargement
          doc.save('mes-reservations.pdf');
        };
      }




}
