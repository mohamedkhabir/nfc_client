import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {environment} from "../../environments/environment.prod";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  ROOT = environment.server
  onlinepaiment :any
  addpaiment  = new FormGroup<any> (
    {
      amount : new FormControl(null,Validators.required),
      currencyCode : new FormControl("QAR",Validators.required),
      customerEmail : new FormControl(null,Validators.required),
      customerName : new FormControl(null,Validators.required),
      customerPhone : new FormControl(null,Validators.required),
      customerCountry : new FormControl(null,Validators.required),
      lang : new FormControl("en",Validators.required),
      note : new FormControl("signup Payment",Validators.required),
    },
  )
  //
  constructor(@Inject(MAT_DIALOG_DATA) public data : any, private dialogRef : MatDialogRef<PaymentComponent>,private http: HttpClient,private router : Router,private route : ActivatedRoute,
              private service : AuthService,
              private spinner : NgxSpinnerService,
  ){

  }
  pay() {
    const dataToPost = {
      token: 'bb49c24e-8d33-4cb4-a8d1-e9c0ca6a3687',
      currencyCode:'QAR',
      orderId: Math.random(),
      amount : 12,
      customerEmail:this.data.email,
      customerName:this.data.username,
      customerPhone:this.data.phonenumber,
      customerCountry:this.data.address,
      lang:'en',
      note:'payment'
    };
    this.service.processpayment(dataToPost).then((res)=>{
      this.openPaymentBrowserWithURL(res.result);

      /* const response = this.checkResponseStatus(res.result);
       if (response === 'success') {
         this.router.navigate(['/successful'])

       } else {
         this.router.navigate(['/errorpayment']);
       }*/
    }).catch((err : HttpErrorResponse)=>{
      console.log('error',err)
    }).finally(()=>{

    })

  }

  openPaymentBrowserWithURL(URL:any) {
    const paymentWindow = window.open(encodeURI(URL.checkout_url), '_blank');
    if(paymentWindow==null)
      return
    paymentWindow.addEventListener('load', () => {
      paymentWindow.focus();
    });

    paymentWindow.addEventListener('error', () => {
      paymentWindow.close();
    });

    paymentWindow.addEventListener('message', (event) => {
      const URLString = event.data.url;

      if (URLString.includes('Pay/SuccessPay')) {
        paymentWindow.close();
      } else if (URLString.includes('Pay/CancelCreditCard')) {
        paymentWindow.close();
      }
    });
  }
  checkResponseStatus(result: any): string {
    let msg = '';
    switch (result) {
      case -1:
        msg = 'Unauthorized -- API key is invalid (not a valid GUID), or no merchant for this token';
        break;
      case -2:
        msg = 'Not Found -- The specified orderId could not be found.';
        break;
      case -3:
        msg = 'Not Support -- merchant application doesn\'t support the sent currency code.';
        break;
      case -7:
        msg = 'Not Found -- there isn\'t any recurring or autosave payment in Fatora gateway for this merchant with the request parameter.';
        break;
      case -8:
        msg = 'Invalid -- Token is not a valid GUID.';
        break;
      case -10:
        msg = 'Bad Request -- required parameters requested aren\'t sent in the request.';
        break;
      case -20:
        msg = 'Not Found -- There isn\'t application data for the merchant for the sent currency in the payment gateway.';
        break;
      case -21:
        msg = 'Not Support -- payment gateway doesn\'t support void payment';
        break;
      default:
        msg = 'success';
        break;
    }
    return msg;
  }
}
