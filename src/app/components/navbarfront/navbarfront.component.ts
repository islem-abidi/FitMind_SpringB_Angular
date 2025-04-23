// src/app/components/navbarfront/navbarfront.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbarfront',
  templateUrl: './navbarfront.component.html',
  styleUrls: ['./navbarfront.component.css']
})
export class NavbarfrontComponent implements OnInit {
  isLoggedIn = false;
  role: string | null = null;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.role = this.authService.getRole();
      this.checkLoginStatus();
      window.addEventListener('storage', () => this.checkLoginStatus());
      this.isLoggedIn = !!localStorage.getItem('token');

    
    });
  }
  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.role = this.authService.getRole();
  }
  
  logout(): void {
    this.authService.logout();
  }
}
