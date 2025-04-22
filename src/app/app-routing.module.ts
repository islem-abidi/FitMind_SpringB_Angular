import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Front (site vitrine)
import { TemplateComponent } from './services/template/template.component';
import { AbonnementsComponent } from './components/abonnements/abonnements.component';

// Auth / Admin layouts (chargés dynamiquement)
import { AdminLayoutComponent } from './backoff/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './backoff/layouts/auth-layout/auth-layout.component';

// Back office affichage type Argon
import { BacktempComponent } from './components/backtemp/backtemp.component';
import { DashboardComponent } from './backoff/pages/dashboard/dashboard.component';
import { IconsComponent } from './backoff/pages/icons/icons.component';
import { MapsComponent } from './backoff/pages/maps/maps.component';
import { UserProfileComponent } from './backoff/pages/user-profile/user-profile.component';
import { TablesComponent } from './backoff/pages/tables/tables.component';
import { LoginComponent } from './backoff/pages/login/login.component';
import { RegisterComponent } from './backoff/pages/register/register.component';
import { AbonnementsbackComponent } from './components/abonnementsback/abonnementsback.component';
import { ActiviteComponent } from './components/activite/activite.component';
import { ActiviteOffComponent } from './components/activite-off/activite-off.component';
import { SeancesportiveComponent } from './components/seancesportive/seancesportive.component';
import { SeanceOffComponent } from './components/seance-off/seance-off.component';
import { MesReservationsComponent } from './components/mes-reservations/mes-reservations.component';
import { BadgeListComponent } from './components/badge-list/badge-list.component';

const routes: Routes = [

  // 👉 Partie Front (site public)
  {
    path: '',
    component: TemplateComponent,
    children: [
      { path: 'abonnements', component: AbonnementsComponent },
    ]
  },
   // 👉 Partie Back office (vue Argon Dashboard avec BacktempComponent)
  {
    path: 'admin',
    component: BacktempComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'icons', component: IconsComponent },
      { path: 'maps', component: MapsComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'tables', component: TablesComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'abonnementsback', component: AbonnementsbackComponent },
      { path: 'activite', component: ActiviteComponent },
      { path: 'seances/:id', component: SeancesportiveComponent },

    ]
  },
  {path:'badge-liste',component:BadgeListComponent},
  {path: 'activite-off', component: ActiviteOffComponent},
  { path: 'seancesportive', component: SeancesportiveComponent },
  { path: 'activite', component: ActiviteComponent },
  { path: 'seances/:activiteId', component: SeanceOffComponent }, // Route pour afficher les séances
{path:'mesReservations',component:MesReservationsComponent},
  // (Optionnel) Si tu gardes les anciens layouts dynamiques
  {
    path: 'admin-old',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./backoff/layouts/admin-layout/admin-layout.module')
          .then(m => m.AdminLayoutModule)
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./backoff/layouts/auth-layout/auth-layout.module')
          .then(m => m.AuthLayoutModule)
      }
    ]
  },

  // 🔁 Redirection si rien de matché
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
