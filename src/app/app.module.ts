import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DossierNComponent } from './components/gestionNutrition/dossier-n/dossier-n.component';
import { RendezvousComponent } from './components/gestionNutrition/rendezvous/rendezvous.component';
import { RendezvousNComponent } from './components/gestionNutrition/rendezvous-n/rendezvous-n.component';
import { AdminRdvComponent } from './components/gestionNutrition/admin-rdv/admin-rdv.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './components/gestionNutrition/calendar/calendar.component';
import { ToastrModule } from 'ngx-toastr';
import { WeatherComponent } from './components/gestionNutrition/weather/weather.component';
import { NutritionIAComponent } from './components/gestionNutrition/nutrition-ia/nutrition-ia.component';
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
    RendezvousNComponent,
    AdminRdvComponent,
    CalendarComponent,
    WeatherComponent,
    NutritionIAComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    NgbModule,
    ClipboardModule,
    CommonModule,
    FullCalendarModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true
    })
    ,
    
  ],
  providers: [
    // Vos services peuvent être ajoutés ici si nécessaire
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }