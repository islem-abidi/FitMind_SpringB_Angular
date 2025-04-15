import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { FormsModule } from '@angular/forms';
import { AbonnementsComponent } from './components/abonnements/abonnements.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
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
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { AjoutReclamationComponent } from './components/ajout-reclamation/ajout-reclamation.component';
import { AdminReclamationsComponent } from './components/admin-reclamations/admin-reclamations.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserprofileeComponent } from './components/user-profilee/user-profilee.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
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
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    VerifyCodeComponent,
    AjoutReclamationComponent,
    AdminReclamationsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserprofileeComponent,
    ChangePasswordComponent
    
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
    ReactiveFormsModule

    
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }