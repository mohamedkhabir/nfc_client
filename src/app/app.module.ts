import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessfulComponent } from './successful/successful.component';
import { HomeComponent } from './home/home.component';
import {MatangModule} from "../assets/Matang.module";
import {FlexLayoutDirective} from "./directives/flex/flex-layout.directive";
import {NgxSpinnerModule} from "ngx-spinner";
import {FlexLayoutModule} from "@angular/flex-layout";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptorService} from "./services/interceptor.service";
import {CookieService} from "ngx-cookie-service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ContactUsComponent,
    SignUpComponent,
    PaymentComponent,
    SuccessfulComponent,
    HomeComponent,
    FlexLayoutDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
      HttpClientModule,
      MatangModule,
      FlexLayoutModule,
    NgxSpinnerModule.forRoot({type: 'ball-spin'}),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
