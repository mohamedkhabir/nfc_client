import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PublicService} from "../services/public.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  form = new FormGroup<any>({
    content: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    phonenumber : new FormControl('',Validators.required),
    reason : new FormControl('',Validators.required),
  })
  constructor(private publicService : PublicService,private snackBar: MatSnackBar) { }
  loading = false
  contactUs() {
    console.log(this.form.value)
    if(this.form.valid){
      this.loading = true
      let form = this.form.value
      let data = new FormData()
      data.append('content',form.content)
      data.append('name',form.name)
      data.append('email',form.email)
      data.append('phonenumber',form.phonenumber)
      data.append('reason',form.reason)
      console.log(form)
      this.publicService.contactUS(data).then((res)=>{
        this.form.reset()
        this.openSnackBar('Your message has been send successfully')
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        this.loading=false
      })
    }else{
      this.openSnackBar("All fields are required")
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message,'', { duration: 2000, panelClass: ['snack'] });
  }

}
