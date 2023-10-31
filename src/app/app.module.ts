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
import { AccountDeleteComponent } from './components/user/account-delete/account-delete.component';
import { DailyTaskComponent } from './components/daily-task/daily-task.component';
import { PracticeComponent } from './components/practice/practice.component';
import { StatsComponent } from './components/stats/stats.component';
import { MemoryCardItemComponent } from './components/games/memory-card-game/memory-card-item/memory-card-item.component';
import { MemoryCardSettingsComponent } from './components/games/memory-card-game/memory-card-settings/memory-card-settings.component';
import { MemoryCardBoardComponent } from './components/games/memory-card-game/memory-card-board/memory-card-board.component';
import { MemorySoundBoardComponent } from './components/games/memory-sound/memory-sound-board/memory-sound-board.component';
import { MemorySoundSettingsComponent } from './components/games/memory-sound/memory-sound-settings/memory-sound-settings.component';
import { RankingListComponent } from './components/ranking-list/ranking-list.component';
import { MemoryNumberSettingsComponent } from './components/games/memory-number/memory-number-settings/memory-number-settings.component';
import { MemoryNumberBoardComponent } from './components/games/memory-number/memory-number-board/memory-number-board.component';
import { MemoryMatrixBoardComponent } from './components/games/memory-matrix/memory-matrix-board/memory-matrix-board.component';
import { MemoryMatrixSettingsComponent } from './components/games/memory-matrix/memory-matrix-settings/memory-matrix-settings.component';
import { WhatDayIsItSettingsComponent } from './components/games/what-day-is-it/what-day-is-it-settings/what-day-is-it-settings.component';
import { WhatDayIsItBoardComponent } from './components/games/what-day-is-it/what-day-is-it-board/what-day-is-it-board.component';




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
    TermsOfServiceComponent,
    AccountDeleteComponent,
    DailyTaskComponent,
    PracticeComponent,
    StatsComponent,
    MemoryCardItemComponent,
    MemoryCardSettingsComponent,
    MemoryCardBoardComponent,
    MemorySoundBoardComponent,
    MemorySoundSettingsComponent,
    RankingListComponent,
    MemoryNumberSettingsComponent,
    MemoryNumberBoardComponent,
    MemoryMatrixBoardComponent,
    MemoryMatrixSettingsComponent,
    WhatDayIsItSettingsComponent,
    WhatDayIsItBoardComponent
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
