// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject  } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8081/PIdev/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient,
     private router: Router ,
  ) {}
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveSession(token: string, role: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    this.isLoggedInSubject.next(true);
    console.log('🧪 Token payload:', this.getDecodedToken());

  }
  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  }
  getCurrentUserEmail(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub; // c'est l'email
  }
  getCurrentUser() {
    const token = localStorage.getItem('token');
    return this.http.get('http://localhost:8081/PIdev/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  getCurrentUserrId(): number | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id || null;
  }

  getCurrentUserId(): string | null {
    const tokenPayload = this.getDecodedToken();
    return tokenPayload?.id ?? null;
  }

  getDecodedToken(): any {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
  getCurrentUserRole() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    }
    return null;
  }
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }


  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  register(payload: any) {
    return this.http.post('http://localhost:8081/auth/registration', payload);
  }

  isEtudiant(): boolean {
    return this.getRole() === 'ETUDIANT';
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }


}
