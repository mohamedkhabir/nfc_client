import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PaymentComponent} from "../payment/payment.component";
import {MatDialog} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";
import {DeviceDetectorService} from "ngx-device-detector";
import {DeviceUUID} from 'device-uuid';
import {NgxSpinnerService} from "ngx-spinner";
import {CardT} from "../models/user";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {
  deviceInfo: any;
  ipAddress: any;
  totalprice= 0;
  cards : CardT[]=[]
  card1 =  {amount: 199, color: "Black", stripeid: "", style: "CARD01", walletpaiementstate: "UNPAID"}
  card2 =  {amount: 199, color: "White", stripeid: "", style: "CARD02", walletpaiementstate: "UNPAID"}
  formUser = new FormGroup<any>({
    firstname : new FormControl('',Validators.required),
    lastname : new FormControl('',Validators.required),
    email : new FormControl('', {validators : [Validators.required,Validators.email]}),
    password : new FormControl('',Validators.required),
    address : new FormControl('',Validators.required),
    city : new FormControl('',Validators.required),
    phonenumber : new FormControl('',Validators.required),
    promocode : new FormControl(''),
    unitnumberaddress : new FormControl('',Validators.required),
    building : new FormControl('',Validators.required),
  })
  formCompany = new FormGroup<any>({
    firstname : new FormControl('',Validators.required),
    lastname : new FormControl('',Validators.required),
    message : new FormControl('',Validators.required),
    phonenumber : new FormControl('',Validators.required),
  })
  step = 1
  action =0
  checkboxForm: FormGroup;

  constructor(
    private spinner: NgxSpinnerService,
    private cookieService: CookieService,
    private deviceService: DeviceDetectorService,private formBuilder: FormBuilder,private matDialog : MatDialog,private authService : AuthService , private router : Router,private snackBar: MatSnackBar) {
    this.checkboxForm = this.formBuilder.group({
      card1: [false], // Default value of the checkbox
      card2: [false], // Default value of the checkbox
    });
  }
  pay() {
    if(this.checkboxForm==null)
      return

    const dataToPost = {
      amount: this.totalprice,
      currency: 'QAR',
      order_id: Math.random(),
      success_url: `https://scano-online.com/successful`,
      failure_url: 'https://scano-online.com/faild',
      client: {
        name: this.formUser.value.firstname+' '+this.formUser.value.lastname,
        phone: this.formUser.value.phonenumber,
        email: this.formUser.value.email
      },
      language: 'en',
      save_token: true,
      note: 'payment'
    };

    this.authService.processpayment(dataToPost).then((res)=>{
      this.openPaymentBrowserWithURL(res.result);

      this.snackBar.open("Load Payment", 'close', {duration: 3000, panelClass: ['snack']})

    }).catch((err : HttpErrorResponse)=>{
      console.log('error',err)
    }).finally(()=>{

    })

  }

selectcards(){
  const isChecked01 = this.checkboxForm.get('card1')?.value;
  const isChecked02 = this.checkboxForm.get('card2')?.value;
  if(isChecked01){
    this.totalprice+=this.card1.amount
    this.cards.push(this.card1)
  }

  if(isChecked02){
    this.totalprice+=this.card2.amount
    this.cards.push(this.card2)
  }

  const dataToPost = {
    cardRequests : this.cards
  };
  this.spinner.show()
  this.authService.requestcard(dataToPost).then((res)=>{
    this.snackBar.open("Card Added successfully", 'close', {duration: 3000, panelClass: ['snack']})
    this.step=4
  }).catch((err : HttpErrorResponse)=>{
    console.log('error',err)
  }).finally(()=>{
    this.spinner.hide()

  })


}
  openPaymentBrowserWithURL(URL: any) {
    const paymentWindow = window.open(encodeURI(URL.checkout_url), '_blank');

    if (paymentWindow === null)
      return;

    paymentWindow.addEventListener('load', () => {
      paymentWindow.focus();
    });

    paymentWindow.addEventListener('message', (event) => {
      const URLString = event.data.url;

      if (URLString.includes('Pay/Success')) {
        console.log('Payment successful.');
        paymentWindow.close();
      } else if (URLString.includes('Pay/CancelCreditCard')) {
        console.log('Payment cancelled.');
        paymentWindow.close();
      }
    });

    paymentWindow.addEventListener('error', () => {
      console.log('Payment error.');
      paymentWindow.close();
    });
  }
  signUpUser(){
    let form = this.formUser.value
    let data = new FormData()
    data.append('firstname',form.firstname)
    data.append('lastname',form.lastname)
    data.append('email',form.email)
    data.append('password',form.password)
    data.append('address',form.address)
    data.append('city',form.city)
    data.append('phonenumber',form.phonenumber)
    data.append('building',form.building)
    data.append('unitnumberaddress',form.unitnumberaddress)
    form.promocode!=''?data.append('promocode',form.promocode):''

    this.loading = true
    this.authService.signUpUser(data).then((res)=>{

      this.openSnackBar('Welcome , Your account has been created successfully !')
      setTimeout(() => {
        this.signin()
      }, 100);

     // this.payment(res);
    }).catch((err : HttpErrorResponse)=>{
      console.log('error',err)
      if(err.error.includes('Wrong promocode')){
        this.openSnackBar('Wrong promo code , please check it !')
      }
      else{
        this.openSnackBar(err.error)
      }
    }).finally(()=>{this.loading = false})
  }

  loading = false
  requestCompany(){
    let form = this.formCompany.value
    let data = new FormData()
    data.append('firstname',form.firstname)
    data.append('lastname',form.lastname)
    data.append('phonenumber',form.phonenumber)
    data.append('message',form.message)
     this.loading = true
    this.authService.requestCompany(data).then((res)=>{
      this.openSnackBar('Your request has been sent successfully')

    }).catch((err : HttpErrorResponse)=>{
        this.openSnackBar(err.error)

    }).finally(()=>{this.loading = false})
  }
  openSnackBar(message: string) {
    this.snackBar.open(message,'', { duration: 2000, panelClass: ['snack'] });
  }
  get isValidUserForm(){
    return this.formUser.valid
  }
  get isValidCompanyForm(){
    return this.formCompany.valid
  }
  signin() {

    let login = {
      deviceId: new DeviceUUID().get(),
      deviceType:
        this.deviceService.browser +
        ' ' +
        this.deviceService.browser_version +
        '/' +
        this.deviceService.deviceType,
      ip: this.ipAddress,
      tokendevice: null,
      password: this.formUser.value.password,
      username: this.formUser.value.email,
    };
    this.spinner.show();
    this.authService
      .signIn(login).then((res) => {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      this.cookieService.set('TOKEN_WEB', res.token!, tomorrow, '/');
      this.cookieService.set('STATE_WEB', 'true', tomorrow, '/');
      this.cookieService.set('ROLE_WEB', res.roles!, tomorrow, '/');
      this.step=3
    }).catch((error) => {
    }).finally(() => {
      this.spinner.hide();
    })
  }
}
