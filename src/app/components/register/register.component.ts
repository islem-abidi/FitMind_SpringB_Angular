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
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
  register() {
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(this.user)], { type: 'application/json' }));
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }
  
    this.registerService.registerUser(formData).subscribe({
      next: (res) => {
        this.successMsg = 'Inscription réussie !';
        localStorage.setItem('verifyEmail', this.user.email);
        localStorage.setItem('pendingEmail', this.user.email);
        this.router.navigate(['/verify-code']);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Erreur lors de l’inscription';
        this.successMsg = '';
      }
    });
  }
  
  
}
