// src/app/components/navbarfront/navbarfront.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarfront',
  templateUrl: './navbarfront.component.html',
  styleUrls: ['./navbarfront.component.css']
})
export class NavbarfrontComponent implements OnInit {
  isLoggedIn = false;
  role: string | null = null;

  constructor(public authService: AuthService , private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.role = this.authService.getRole();
      this.checkLoginStatus();
      window.addEventListener('storage', () => this.checkLoginStatus());
      this.isLoggedIn = !!sessionStorage.getItem('token');

    
    });
  }
  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.role = this.authService.getRole();
  }
  
  logout(): void {
    this.authService.logout();
  }
  goToEvenements(event: Event): void {
    event.preventDefault();

    if (this.router.url === '/evenements') {
      const section = document.getElementById('evenement-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      this.router.navigate(['/evenements']).then(() => {
        setTimeout(() => {
          const section = document.getElementById('evenement-section');
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      });
    }
  }

}
