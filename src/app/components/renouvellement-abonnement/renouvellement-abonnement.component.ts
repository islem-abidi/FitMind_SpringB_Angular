import { Component, OnInit } from '@angular/core';
import { AbonnementService } from 'src/app/services/abonnement.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/stripe/payment.service';
import { Stripe, StripeCardElement } from '@stripe/stripe-js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-renouvellement-abonnement',
  templateUrl: './renouvellement-abonnement.component.html',
  styleUrls: ['./renouvellement-abonnement.component.css']
})
export class RenouvellementAbonnementComponent implements OnInit {
  idUser!: number;
  typeAbonnement = '';
  dureeAbonnement = '';
  montant!: number;

  stripe!: Stripe | null;
  card!: StripeCardElement;

  typeOptions = ['BASIC', 'PREMIUM', 'VIP'];
  dureeOptions = ['MENSUEL', 'ANNUEL', 'SEMESTRIEL'];

  constructor(
    private abonnementService: AbonnementService,
    private toastr: ToastrService,
    private paymentService: PaymentService,
    private router: Router // ✅ ajoute ceci

  ) {}

  async ngOnInit() {
    this.stripe = await this.paymentService.getStripe();
    const elements = this.stripe?.elements();
    if (elements) {
      this.card = elements.create('card');
      this.card.mount('#card-element');
    }
  }

  async renouveler() {
    const { paymentMethod, error } = await this.stripe!.createPaymentMethod({
      type: 'card',
      card: this.card
    });

    if (error) {
      this.toastr.error('Erreur de carte : ' + error.message);
      return;
    }

    this.abonnementService.renouvelerAbonnementParUser(
      this.idUser,
      this.dureeAbonnement.toUpperCase(), // 👈 ici on met en MAJUSCULE
      this.typeAbonnement.toUpperCase(),  // 👈 idem pour le type
      paymentMethod.id
    )
    
    .subscribe({
      next: () => {
        this.toastr.success('✅ Abonnement renouvelé avec succès !');
        this.router.navigate(['/abonnements-cards']);
      },
      error: err => {
        this.toastr.error('❌ Erreur : ' + (err.error?.message || 'Échec du renouvellement.'));
        console.error(err);
      }
    });
    
    
  }

  calculateMontant(): void {
    const tarifs: any = {
      BASIC: { MENSUEL: 100, SEMESTRIEL: 450, ANNUEL: 950 },
      PREMIUM: { MENSUEL: 200, SEMESTRIEL: 650, ANNUEL: 1050 },
      VIP: { MENSUEL: 450, SEMESTRIEL: 1500, ANNUEL: 2500 }
    };

    const type = this.typeAbonnement.toUpperCase();
    const duree = this.dureeAbonnement.toUpperCase();

    this.montant = tarifs[type]?.[duree] || 0;
  }
}
