import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { authGuard } from './common/guards/auth.guard';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { TermsOfServiceComponent } from './components/shared/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './components/shared/privacy-policy/privacy-policy.component';
import { DailyTaskComponent } from './components/daily-task/daily-task.component';
import { PracticeComponent } from './components/practice/practice.component';
import { StatsComponent } from './components/stats/stats.component';
import { MemoryCardSettingsComponent } from './components/games/memory-card-game/memory-card-settings/memory-card-settings.component';
import { MemoryCardBoardComponent } from './components/games/memory-card-game/memory-card-board/memory-card-board.component';
import { MemorySoundSettingsComponent } from './components/games/memory-sound/memory-sound-settings/memory-sound-settings.component';
import { MemorySoundBoardComponent } from './components/games/memory-sound/memory-sound-board/memory-sound-board.component';
import { RankingListComponent } from './components/ranking-list/ranking-list.component';
import { MemoryNumberSettingsComponent } from './components/games/memory-number/memory-number-settings/memory-number-settings.component';
import { MemoryNumberBoardComponent } from './components/games/memory-number/memory-number-board/memory-number-board.component';
import { MemoryMatrixBoardComponent } from './components/games/memory-matrix/memory-matrix-board/memory-matrix-board.component';
import { MemoryMatrixSettingsComponent } from './components/games/memory-matrix/memory-matrix-settings/memory-matrix-settings.component';
import { WhatDayIsItSettingsComponent } from './components/games/what-day-is-it/what-day-is-it-settings/what-day-is-it-settings.component';
import { WhatDayIsItBoardComponent } from './components/games/what-day-is-it/what-day-is-it-board/what-day-is-it-board.component';
import { MathBoardComponent } from './components/games/math/math-board/math-board.component';
import { MathSettingsComponent } from './components/games/math/math-settings/math-settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'user/edit', component: UserEditComponent },
      { path: 'daily-task', component: DailyTaskComponent },
      { path: 'practice', component: PracticeComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'ranking-list', component: RankingListComponent },

      { path: 'memory-card-settings', component: MemoryCardSettingsComponent },
      { path: 'memory-card', component: MemoryCardBoardComponent },
      { path: 'memory-sound-settings', component: MemorySoundSettingsComponent },
      { path: 'memory-sound', component: MemorySoundBoardComponent },
      { path: 'what-day-is-it-settings', component: WhatDayIsItSettingsComponent },
      { path: 'what-day-is-it', component: WhatDayIsItBoardComponent },
      { path: 'memory-number-settings', component: MemoryNumberSettingsComponent },
      { path: 'memory-number', component: MemoryNumberBoardComponent },
      { path: 'math-settings', component: MathSettingsComponent },
      { path: 'math', component: MathBoardComponent },
      { path: 'memory-matrix-settings', component: MemoryMatrixSettingsComponent },
      { path: 'memory-matrix', component: MemoryMatrixBoardComponent },


    ]
  },
   { path: '**', component: HomeComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
