import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.css']
})
export class ConfirmReservationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const reservationId = params['reservationId'];
      if (reservationId) {
        this.http.put(`http://localhost:8081/PIdev/reservations/confirm-reservation/${reservationId}`, null)
        .subscribe({
            next: () => {
              this.toastr.success('✅ Votre réservation est confirmée !');
              this.router.navigate(['/activite']); // Redirection après confirmation
            },
          });
      }
    });
  }
}
