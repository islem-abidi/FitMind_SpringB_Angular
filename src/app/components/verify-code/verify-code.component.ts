// src/app/components/verify-code/verify-code.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {
  code = '';
  email = localStorage.getItem('pendingEmail') || ''; // stocké après register
  error = '';
  success = '';
  showResend = false;

  constructor(private http: HttpClient, private router: Router) {}

  onVerify() {
    this.http.post('http://localhost:8080/user/auth/verify-code', { email: this.email, code: this.code })
      .subscribe({
        next: () => {
          alert('✔️ Vérification réussie !');
          localStorage.removeItem('pendingEmail');
          this.router.navigate(['/login']);
        },
        error: () => {
          this.error = '❌ Code invalide ou expiré.';
          this.showResend = true;
        }
      });
  }

  resendCode() {
    this.http.post('http://localhost:8080/user/auth/resend-code', { email: this.email })
      .subscribe({
        next: () => {
          this.success = '📩 Nouveau code envoyé par mail.';
          this.error = '';
        },
        error: () => {
          this.error = '❌ Échec d’envoi. Vérifie ton email.';
          this.success = '';
        }
      });
  }
}
  