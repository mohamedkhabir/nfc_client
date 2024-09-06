import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {lastValueFrom} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {SigninResponse} from "../models/signin-response";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token?: string | null;
  constructor(private http: HttpClient,private cookieService: CookieService,) {}
  getToken() {
    this.token = this.cookieService.get('TOKEN_WEB');
    return this.token;
  }

  signUpUser(data:any) {
    let res =  this.http.post<any>(environment.server+ `/api/v1/auth/signup_user_web`, data)
    return lastValueFrom(res)
  }
  requestcard(data:any) {
    let res =  this.http.post<any>(environment.server+ `/api/v1/request_card`, data)
    return lastValueFrom(res)
  }
 verifypayment() {
    let res =  this.http.post<any>(environment.server+ `/api/v1/pay_card`,{})
    return lastValueFrom(res)
  }

  processpayment(data:any) {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      api_key: 'bb49c24e-8d33-4cb4-a8d1-e9c0ca6a3687'
    };

    const headers = new HttpHeaders(headersConfig);
    let res =  this.http.post<any>(`https://api.fatora.io/v1/payments/checkout`, data, { headers })

    return lastValueFrom(res)
  }
  requestCompany(data:any) {
    let res =  this.http.post<any>(environment.server+ `/api/v1/auth/company_request`, data)
    return lastValueFrom(res)
  }
  signIn(user: any) {
    return lastValueFrom(this.http.post<SigninResponse>(environment.server + '/api/v1/auth/signin', user))
  }
}
