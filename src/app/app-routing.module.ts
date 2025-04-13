import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Front (site vitrine)
import { TemplateComponent } from './template/template.component';
import { AbonnementsComponent } from './components/abonnements/abonnements.component';
import { LoginComponent  } from './components/login/login.component'; // 🔹 Front
import {  RegisterComponent } from './components/register/register.component'; // 🔹 Front

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
import { LoginComponent as LoginComponentBack } from './backoff/pages/login/login.component'; // 🔹 Admin
import { RegisterComponent as RegisterComponentBack  } from './backoff/pages/register/register.component';
import { AbonnementsbackComponent } from './components/abonnementsback/abonnementsback.component';
import {  UserListComponent } from './components/user-list/user-list.component' // 🔹 Front
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component'; // 🔹 Front
import { AjoutReclamationComponent } from './components/ajout-reclamation/ajout-reclamation.component';
import { AdminReclamationsComponent } from './components/admin-reclamations/admin-reclamations.component';
const routes: Routes = [
  // 👉 Partie Front (site public)
  {
    path: '',
    component: TemplateComponent,
    children: [
      // ✅ public : accessibles même sans être connecté
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'verify-code', component: VerifyCodeComponent },

// 🔐 privés : accessibles uniquement si connecté
{ path: 'abonnements', component: AbonnementsComponent, canActivate: [authGuard] },
{ path: 'reclamation', component: AjoutReclamationComponent, canActivate: [authGuard] },

    ]
  
  },

  // 👉 Partie Back office (vue Argon Dashboard avec BacktempComponent)
  {
    path: 'admin',
    component: BacktempComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'Admin' },
  
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'icons', component: IconsComponent },
      { path: 'maps', component: MapsComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'tables', component: TablesComponent },
      { path: 'login', component: LoginComponentBack },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'abonnementsback', component: AbonnementsbackComponent },
      { path: 'users', component: UserListComponent },
      { path: 'reclamations', component: AdminReclamationsComponent },


    ]
  },

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
