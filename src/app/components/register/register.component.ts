import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  user: any = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    dateNaissance: '',
    sexe: '',
    numeroDeTelephone: '',
    photoProfil: '',
    id_role: null
  };

  errorMsg: string = '';
  successMsg: string = '';
  selectedFile: File | null = null;
  captchaValid: boolean = false;
  loading: boolean = false;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  register(): void {
    this.loading = true;
    this.captchaValid = false;
  
    this.recaptchaV3Service.execute('register').subscribe((token: string) => {
      this.captchaValid = true; // ✅ Montre le message dès que Google valide
      const formData = new FormData();
      const fullPayload = { ...this.user, captchaToken: token };
  
      formData.append('user', new Blob([JSON.stringify(fullPayload)], { type: 'application/json' }));
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile);
      }
  
      this.registerService.registerUser(formData).subscribe({
        next: () => {
          this.successMsg = 'Inscription réussie !';
          localStorage.setItem('verifyEmail', this.user.email);
          localStorage.setItem('pendingEmail', this.user.email);
          this.router.navigate(['/verify-code']);
          this.loading = false;
        },
        error: (err) => {
          this.errorMsg = err.error || 'Erreur lors de l’inscription';
          this.successMsg = '';
          this.loading = false;
        }
      });
    });
  }
  
}
