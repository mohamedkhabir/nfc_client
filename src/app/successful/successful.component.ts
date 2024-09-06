import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.scss']
})
export class SuccessfulComponent  {
  description =''
  loading :boolean=false;
  token =''
  transaction_id =''
   constructor(private router: ActivatedRoute, private service: AuthService,private snackBar: MatSnackBar) {
     this.router.queryParams.subscribe(params => {
       if(params['description'])
       this.description = params['description'];


       if(params['token'])
       this.token = params['token'];

       if(params['transaction_id'])
       this.transaction_id = params['transaction_id'];

       this.checkpayment()

     });
  }

  checkpayment(){

    if(this.description=='Successfull' && this.token!='' && this.transaction_id!=''){

      this.loading = true
      this.service.verifypayment().then((res)=>{
        this.snackBar.open("Your card is under process", 'close', {duration: 3000, panelClass: ['snack']})

      }).catch((err : HttpErrorResponse)=>{
        console.log('error',err)
        this.snackBar.open("Error please contact us for more information", 'close', {duration: 3000, panelClass: ['snack']})

      }).finally(()=>{this.loading = false})
    }

  }
}
