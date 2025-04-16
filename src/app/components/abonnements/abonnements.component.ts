import { Component } from '@angular/core';
import { AbonnementService } from '../../services/abonnement.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/stripe/payment.service'; // nouveau service Stripe
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js'; // Stripe types


@Component({
  selector: 'app-abonnements',
  templateUrl: './abonnements.component.html',
  styleUrls: ['./abonnements.component.css']
})
export class AbonnementsComponent {
  idUser!: number;
  typeAbonnement = '';
  dureeAbonnement = '';
  montant!: number;
  modePaiement = '';
  stripe!: Stripe | null;
card!: StripeCardElement;


  // 💡 Ajoute ces 2 lignes pour éviter les erreurs
  typeOptions = ['BASIC', 'PREMIUM', 'VIP'];
  dureeOptions = ['MENSUEL', 'ANNUEL', 'SEMESTRIEL'];

  constructor(private abonnementService: AbonnementService,
    private toastr: ToastrService,
    private paymentService: PaymentService 
  ) {}

 /* ajouterAbonnement(): void {
    const dateNow = new Date();
    const dateFin = this.dureeAbonnement === 'MENSUEL'
      ? new Date(dateNow.setMonth(dateNow.getMonth() + 1))
      : this.dureeAbonnement === 'ANNUEL'
      ? new Date(dateNow.setFullYear(dateNow.getFullYear() + 1))
      : new Date(dateNow.setMonth(dateNow.getMonth() + 6)); // SEMESTRIEL

    const newAbonnement = {
      typeAbonnement: this.typeAbonnement,
      dureeAbonnement: this.dureeAbonnement,
      dateCreation: new Date(),
      dateFin: dateFin,
      montant: this.montant,
      modePaiement: this.modePaiement,
      statut: 'ACTIF',
      user: {
        idUser: this.idUser
      }
    };

    this.abonnementService.add(newAbonnement).subscribe({
      next: () => alert("✅ Abonnement ajouté avec succès !"),
      error: () => alert("❌ Erreur lors de l'ajout.")
    });
  }*/
 // avant stripe
    /*ajouterAbonnement(): void {
      const dateNow = new Date();
      const dateFin =
        this.dureeAbonnement === 'MENSUEL'
          ? new Date(dateNow.setMonth(dateNow.getMonth() + 1))
          : this.dureeAbonnement === 'ANNUEL'
          ? new Date(dateNow.setFullYear(dateNow.getFullYear() + 1))
          : new Date(dateNow.setMonth(dateNow.getMonth() + 6));
  
      const newAbonnement = {
        typeAbonnement: this.typeAbonnement,
        dureeAbonnement: this.dureeAbonnement,
        dateCreation: new Date(),
        dateFin: dateFin,
        montant: this.montant,
        modePaiement: this.modePaiement,
        statut: 'ACTIF',
        user: {
          idUser: this.idUser
        }
      };
  
      this.abonnementService.add(newAbonnement).subscribe({
        next: () => {
          this.toastr.success('✅ Abonnement ajouté avec succès !', 'Succès');
          this.resetForm(); // ← Réinitialise les champs
        },
        error: () => {
          this.toastr.error('❌ Erreur lors de l\'ajout.', 'Erreur');
        }
      });
    }  */
     // 👉 Méthode pour vider les champs



     //hadhi a5r wa7da
     /*async ajouterAbonnement() {
      const { paymentMethod, error } = await this.stripe!.createPaymentMethod({
        type: 'card',
        card: this.card
      });
    
      if (error) {
        this.toastr.error('Erreur de carte : ' + error.message);
        return;
      }
    
      const abonnement = {
        typeAbonnement: this.typeAbonnement,
        dureeAbonnement: this.dureeAbonnement,
        dateCreation: new Date(),
        dateFin: new Date(),
        montant: this.montant,
        modePaiement: this.modePaiement,
        statut: 'ACTIF',
        user: { idUser: this.idUser,
          email: this.userEmail
        }
      };
    
      this.abonnementService.add(abonnement).subscribe({
        next: () => {
          this.toastr.success('✅ Abonnement ajouté avec succès 🎉');
          //this.resetForm();
        },
        error: () => {
          this.toastr.error('❌ Erreur d’ajout');
        }
      });
    }*/
      async ajouterAbonnement() {
        const { paymentMethod, error } = await this.stripe!.createPaymentMethod({
          type: 'card',
          card: this.card
        });
      
        if (error) {
          this.toastr.error('Erreur de carte : ' + error.message);
          return;
        }
      
        const abonnement = {
          typeAbonnement: this.typeAbonnement,
          dureeAbonnement: this.dureeAbonnement,
          montant: this.montant,
          modePaiement: this.modePaiement,
          user: {
            idUser: this.idUser,
          }
        };
      
        this.abonnementService.add(abonnement).subscribe({
          next: () => {
            this.toastr.success('✅ Abonnement ajouté avec succès 🎉');
            // this.resetForm();
          },
          error: (err) => {
            const message = err?.error?.message ;
            this.toastr.error(message, 'Erreur');
          }
          
        });
      }
      
    
  resetForm(): void {
    this.idUser = 0;
    this.typeAbonnement = '';
    this.dureeAbonnement = '';
    this.montant = 0;
    this.modePaiement = '';
  }
  //initialiser stripe
  async ngOnInit() {
    this.stripe = await this.paymentService.getStripe();
    const elements = this.stripe?.elements();
    if (elements) {
      this.card = elements.create('card');
      this.card.mount('#card-element');
    }
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
