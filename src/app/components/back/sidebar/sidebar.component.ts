import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  roles: string[]; 
}

const ROUTES: RouteInfo[] = [
  { path: '/admin/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '', roles: ['Admin'] },
  { path: '/admin/icons', title: 'Icons', icon: 'ni-planet text-blue', class: '', roles: ['Admin'] },
  { path: '/admin/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: '', roles: ['Admin'] },
  { path: '/admin/user-profile', title: 'User Profile', icon: 'ni-single-02 text-yellow', class: '', roles: ['Admin'] },
  { path: '/admin/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-red', class: '', roles: ['Admin'] },
  { path: '/admin/login', title: 'Login', icon: 'ni-key-25 text-info', class: '', roles: ['Admin'] },
  { path: '/admin/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: '', roles: ['Admin'] },
  { path: '/admin/abonnementsback', title: 'Abonnements', icon: 'ni ni-collection', class: '', roles: ['Admin'] },
  { path: 'users', title: 'Users', icon: 'ni ni-circle-08 text-pink', class: '', roles: ['Admin'] },
  { path: '/admin/reclamations', title: 'Reclamations', icon: 'ni ni-circle-08 text-pink', class: '', roles: ['Admin'] },
  { path: '/admin/abonnementsback', title: 'Abonnements', icon: 'ni ni-collection', class: '', roles: ['Admin'] },
 { path: '/admin/list-event', title: 'Evenements', icon: 'ni ni-collection', class: '', roles: ['Admin'] },
  { path: '/admin-coach/activite-back', title: 'Activites', icon: 'ni ni-circle-08 text-pink', class: '', roles: ['Coach'] },


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems: any[] = [];
  public isCollapsed = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    const role = this.authService.getRole();

    if (role) {
      this.menuItems = ROUTES.filter(menuItem => menuItem.roles.includes(role));
    } else {
      this.menuItems = []; 
    }
        this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
