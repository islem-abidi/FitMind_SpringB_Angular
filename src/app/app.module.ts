import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './services/template/template.component';
import { FormsModule } from '@angular/forms';
import { AbonnementsComponent } from './components/abonnements/abonnements.component';
import { NavbarfrontComponent } from './components/navbarfront/navbarfront.component';
import { FooterComponent } from './components/back/footer/footer.component';
import { NavbarComponent } from './components/back/navbar/navbar.component';
import { SidebarComponent } from './components/back/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './backoff/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './backoff/layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { BacktempComponent } from './components/backtemp/backtemp.component';
import { AbonnementsbackComponent } from './components/abonnementsback/abonnementsback.component';
import { ActiviteComponent } from './components/activite/activite.component';
import { ActiviteOffComponent } from './components/activite-off/activite-off.component';
import { SeancesportiveComponent } from './components/seancesportive/seancesportive.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SeanceOffComponent } from './components/seance-off/seance-off.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import { ToastrModule } from 'ngx-toastr';
import { MesReservationsComponent } from './components/mes-reservations/mes-reservations.component';
import { PlanningComponent } from './components/planning/planning.component';
import { BadgeListComponent } from './components/badge-list/badge-list.component';



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
    ActiviteComponent,
    ActiviteOffComponent,
    SeancesportiveComponent,
    FilterPipe,
    SeanceOffComponent,
    MesReservationsComponent,
    PlanningComponent,
    BadgeListComponent
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
    BrowserAnimationsModule,
    FullCalendarModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
