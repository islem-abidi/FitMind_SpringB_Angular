import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    const loginPayload = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginPayload).subscribe({
      next: (res: any) => {
        const token = res.token;
        const role = res.role;

        this.authService.saveSession(token, role);

        if (role === 'Admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'Etudiant') {
          this.router.navigate(['/']);
        } else {
          alert('Rôle non autorisé');
        }
      },
      error: (err) => {
        console.error("❌ Erreur de connexion :", err);
        alert("Identifiants invalides");
      }
    });
  }
}
