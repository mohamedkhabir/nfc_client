import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PublicService {


  constructor(private http: HttpClient) {}
  contactUS(data:any) {
    let res =  this.http.post<any>(environment.server+ `/api/v1/public/contact_us`, data)
    return lastValueFrom(res)
  }
}
