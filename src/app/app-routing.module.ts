// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateComponent } from './template/template.component';
import { AbonnementsComponent } from './components/abonnements/abonnements.component';
import { DossierMedicalComponent } from './components/gestionNutrition/dossier-medical/dossier-medical.component';
import { AdminDossiersComponent } from './components/gestionNutrition/admin-dossiers/admin-dossiers.component';

import { BacktempComponent } from './components/backtemp/backtemp.component';
import { DashboardComponent } from './backoff/pages/dashboard/dashboard.component';
import { IconsComponent } from './backoff/pages/icons/icons.component';
import { MapsComponent } from './backoff/pages/maps/maps.component';
import { UserProfileComponent } from './backoff/pages/user-profile/user-profile.component';
import { TablesComponent } from './backoff/pages/tables/tables.component';
import { LoginComponent } from './backoff/pages/login/login.component';
import { RegisterComponent } from './backoff/pages/register/register.component';
import { AbonnementsbackComponent } from './components/abonnementsback/abonnementsback.component';

import { AdminLayoutComponent } from './backoff/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './backoff/layouts/auth-layout/auth-layout.component';
import { DossierNComponent } from './components/gestionNutrition/dossier-n/dossier-n.component';
import { RendezvousComponent } from './components/gestionNutrition/rendezvous/rendezvous.component';
import { RendezvousNComponent } from './components/gestionNutrition/rendezvous-n/rendezvous-n.component';  // Import du service
import { AdminRdvComponent } from './components/gestionNutrition/admin-rdv/admin-rdv.component';  // Import du service
import { CalendarComponent } from './components/gestionNutrition/calendar/calendar.component';
import { WeatherComponent } from './components/gestionNutrition/weather/weather.component';
import { NutritionIAComponent } from './components/gestionNutrition/nutrition-ia/nutrition-ia.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      { path: 'abonnements', component: AbonnementsComponent },
      { path: 'dossier-medical', component: DossierMedicalComponent },
      { path: 'dossier-nutritionniste', component: DossierNComponent },
      { path: 'rendez-vous', component: RendezvousComponent },
      { path: 'nutritionniste', component: RendezvousNComponent },
      { path: 'calender', component: CalendarComponent },

      { path: 'weather', component: WeatherComponent },
      { path: 'IA', component: NutritionIAComponent },
    ]
  },
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
      { path: 'abonnementsback', component: AbonnementsbackComponent },
      { path: 'dossiers', component: AdminDossiersComponent },
      { path: 'rendezvous', component: AdminRdvComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin-old',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./backoff/layouts/admin-layout/admin-layout.module').then(
            (m) => m.AdminLayoutModule
          )
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./backoff/layouts/auth-layout/auth-layout.module').then(
            (m) => m.AuthLayoutModule
          )
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
