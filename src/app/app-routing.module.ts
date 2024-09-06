import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {PaymentComponent} from "./payment/payment.component";
import {SuccessfulComponent} from "./successful/successful.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'contact-us', component:ContactUsComponent},
  {path:'sign-up', component:SignUpComponent},
  {path:'successful', component:SuccessfulComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
