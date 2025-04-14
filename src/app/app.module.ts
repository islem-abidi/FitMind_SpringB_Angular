import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { AbonnementsComponent } from './components/abonnements/abonnements.component';
import { NavbarfrontComponent } from './components/navbarfront/navbarfront.component';
import { FooterComponent } from './components/back/footer/footer.component';
import { NavbarComponent } from './components/back/navbar/navbar.component';
import { SidebarComponent } from './components/back/sidebar/sidebar.component';
import { AdminLayoutComponent } from './backoff/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './backoff/layouts/auth-layout/auth-layout.component';
import { BacktempComponent } from './components/backtemp/backtemp.component';
import { AbonnementsbackComponent } from './components/abonnementsback/abonnementsback.component';
import { DossierListComponent } from './components/gestionNutrition/dossier-list/dossier-list.component';
import { DossierMedicalComponent } from './components/gestionNutrition/dossier-medical/dossier-medical.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminDossiersComponent } from './components/gestionNutrition/admin-dossiers/admin-dossiers.component';
import { DossierNComponent } from './components/gestionNutrition/dossier-n/dossier-n.component'
import { RendezvousService } from './services/gestionNutrition/rendezvous.service';
import { RendezvousComponent } from './components/gestionNutrition/rendezvous/rendezvous.component';
import { RendezvousNComponent } from './components/gestionNutrition/rendezvous-n/rendezvous-n.component';  // Import du service

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    AbonnementsComponent,
    NavbarfrontComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    BacktempComponent,
    AbonnementsbackComponent,
    DossierMedicalComponent,
    DossierListComponent,
    AdminDossiersComponent,
    DossierNComponent,
    RendezvousComponent,
    RendezvousNComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    NgbModule,
    ClipboardModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }