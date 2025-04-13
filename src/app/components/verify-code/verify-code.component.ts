// src/app/components/verify-code/verify-code.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {} 

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || localStorage.getItem('pendingEmail') || '';
      console.log('📩 Email utilisé pour vérification :', this.email);
    });
  }

  
  onVerify() {
    if (!this.code || this.code.trim().length !== 6) {
      this.error = '❌ Le code doit contenir 6 chiffres.';
      this.showResend = true;
      return;
    }
  
    this.http.post('http://localhost:8080/user/auth/verify-code', {
      email: this.email,
      code: this.code.trim()
    }, { responseType: 'text' }) // 👈 important
    .subscribe({
      next: () => {
        this.success = '✔️ Vérification réussie. Redirection...';
        this.error = '';
        localStorage.removeItem('pendingEmail');
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        console.error('❌ BACK ERROR:', err);
        this.error = err?.error || '❌ Code invalide ou expiré.';
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
  