import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  token: string = '';

  constructor(private authService: AuthService, private router: Router,private snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.authService.getToken();
    let url = req.url
    let ispublic = url.includes(environment.server+'/api/v1/public/')
    let other = !url.includes(environment.server)
    if (!ispublic && !other) {
      if(this.token && this.token.length>0){
        const tokenizedReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + this.token)});
        return next.handle(tokenizedReq).pipe(
          tap({
            error: (err) => {
              if (err instanceof HttpErrorResponse) {
                this.snackBar.open(err.message, 'close', {duration: 3000, panelClass: ['snack']})
              }
            }
          }));}
      else{
        let isauth = url.includes(environment.server+'/api/v1/auth/current_user')
        if(!isauth){
          next.handle(req).pipe(
            tap({
                error: (err) => {
                  if (err instanceof HttpErrorResponse) {
                    this.snackBar.open(err.message, 'close', {duration: 3000, panelClass: ['snack']})
                  }
                }
              }
            ))
        }

      }
    }
    return next.handle(req).pipe(
      tap({
          error: (err) => {
            if (err instanceof HttpErrorResponse) {
              this.snackBar.open(err.message, 'close', {duration: 3000, panelClass: ['snack']})

            }
          }
        }
      ))
  }

  handleHttpError(error: HttpErrorResponse) {
    switch (error.status) {
      case 200:console.log('Successfully') ; break;
      case 201:console.log('Successfully') ; break;
      case 401:this.showMsg('Unauthorized , You Have to reconnect'); break;
      case 403:this.showMsg('Access Denied , You Have to reconnect'); break;
      case 404:this.showMsg('Not found'); break;
      case 409:this.showMsg('this account already exists'); break;
      case 500:this.showMsg(`Internal Server Error: ${error.message}`); break;
      case 502:this.showMsg('bad gateway , please try later !'); break;
      default: this.showMsg('An error has occured , please retry !'); break;
    }
  }
  showMsg(message: string) {
    this.snackBar.open(message, 'close', {duration: 3000, panelClass: ['snack']})
  }
}
