import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateDatePipe } from './common/pipes/translate-date.pipe';
import { UtcToLocalDatePipe } from './common/pipes/utc-to-local-date.pipe';
import { JwtInterceptor } from './common/interceptors/jwt.interceptor';
import { LoadingInterceptor } from './common/interceptors/loading.interceptor';
import { ChangeEmailComponent } from './components/user/change-email/change-email.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { PrivacyPolicyComponent } from './components/shared/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './components/shared/terms-of-service/terms-of-service.component';



@NgModule({
  declarations: [
    AppComponent,
    TranslateDatePipe,
    UtcToLocalDatePipe,
    ChangeEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserEditComponent,
    UserLoginComponent,
    UserRegisterComponent,
    HomeComponent,
    HeaderComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,


  ],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
