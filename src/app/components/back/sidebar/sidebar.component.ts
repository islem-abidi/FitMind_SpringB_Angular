import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/admin/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/admin/icons', title: 'Icons', icon: 'ni-planet text-blue', class: '' },
  { path: '/admin/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: '' },
  { path: '/admin/user-profile', title: 'User Profile', icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/admin/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-red', class: '' },
  { path: '/admin/login', title: 'Login', icon: 'ni-key-25 text-info', class: '' },
  { path: '/admin/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: '' },
  { path: '/admin/abonnementsback', title: 'Abonnements', icon: 'ni ni-collection', class: '' },

  { path: '/admin/dossiers', title: 'dossiers', icon: 'ni ni-collection', class: '' },

  { path: '/admin/rendezvous', title: 'RendezVous', icon: 'ni ni-collection', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems: any[] = [];
  public isCollapsed = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });
  }
}
