import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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

  constructor(private registerService: RegisterService, private router: Router) {}

  register() {
    this.registerService.registerUser(this.user).subscribe({
      next: (res) => {
        this.successMsg = 'Inscription réussie !';
  
        localStorage.setItem('verifyEmail', this.user.email);
  
        this.router.navigate(['/verify-code']);
  
        this.errorMsg = '';
      },
      error: (err) => {
        this.errorMsg = err.error || 'Erreur lors de l’inscription';
        this.successMsg = '';
      }
    });
  }
  
}
