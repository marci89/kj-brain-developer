import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CheckboxModule } from 'primeng/checkbox';

import {NgcCookieConsentModule} from 'ngx-cookieconsent';
import { cookieConfig } from '../app.config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxSpinnerModule.forRoot({
      type: 'line-scale-party'
      }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    DropdownModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    DynamicDialogModule,
    ToastModule,
    ConfirmDialogModule,
    PasswordModule,
    InputTextModule,
    ToggleButtonModule,
    CheckboxModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
  ],
  exports: [
    BsDropdownModule,
    HttpClientModule,
    ToastrModule,
    NgxSpinnerModule,
    TranslateModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    DynamicDialogModule,
    ToastModule,
    ConfirmDialogModule,
    PasswordModule,
    InputTextModule,
    ToggleButtonModule,
    CheckboxModule,
    NgcCookieConsentModule
  ]
})

export class SharedModule { }

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
