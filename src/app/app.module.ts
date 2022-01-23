import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFireStorageModule } from "@angular/fire/storage";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_components/header/header.component';
import { AlertComponent } from './_components/alert/alert.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ShareModule } from './_components/share.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    ShareModule,
    NgxPermissionsModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true
    }),
    NgxSpinnerModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
