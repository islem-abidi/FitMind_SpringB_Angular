import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  token = '';
  newPassword = '';
  successMsg = '';
  errorMsg = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  reset() {
    if (!this.newPassword || this.newPassword.length < 8) {
      this.errorMsg = '❌ Le mot de passe doit contenir au moins 8 caractères.';
      return;
    }

    const payload = { token: this.token, newPassword: this.newPassword };

    this.http.post('http://localhost:8080/user/auth/reset-password', payload).subscribe({
      next: () => {
        this.successMsg = '✔️ Mot de passe mis à jour avec succès !';
        this.errorMsg = '';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.errorMsg = typeof err.error === 'string' ? err.error : (err.error?.message || '❌ Échec de la réinitialisation.');
        this.successMsg = '';
      }
    });
  }
}
