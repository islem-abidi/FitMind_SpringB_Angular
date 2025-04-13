import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  email: string = '';
  successMsg: string = '';
  errorMsg: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const payload = { email: this.email };
  
    this.http.post('http://localhost:8080/user/auth/forgot-password', payload, { responseType: 'text' }).subscribe({
      next: (res) => {
        this.successMsg = '📩 E-mail envoyé avec succès. Vérifie ta boîte mail.';
        this.errorMsg = '';
      },
      error: (err) => {
        this.errorMsg = '❌ Adresse email invalide ou introuvable.';
        this.successMsg = '';
      }
    });
  }
  
}
