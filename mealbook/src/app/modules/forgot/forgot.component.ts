import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { confirmpasswordvalidator } from 'src/app/helpers/ConfirmPassword.validator';
import { ResetPassword } from 'src/app/model/reset-password.model';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit{

  resetPasswordForm!:FormGroup
  emailToReset!:string
  EmailToken!:string
  ConfirmPassword!:string
  resetPasswordObj=new ResetPassword()
  constructor(private fb:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private resetService:ResetPasswordService, 
    private toast:NgToastService,
    private router:Router
  ){}
  ngOnInit(): void {
   this.resetPasswordForm=this.fb.group({
    password:[null,Validators.required],
    ConfirmPassword:[null,Validators.required]
   },{
    validator:confirmpasswordvalidator("password","ConfirmPassword")
   })
   this.activatedRoute.queryParams.subscribe(val=>{
    this.emailToReset=val['email']
    let uriToken=(val['code'])
    this.EmailToken=uriToken.replace(/ /g,'+')
   console.log(uriToken)
    console.log(this.EmailToken)
    console.log(this.emailToReset)
   })
  }
  reset(){
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj.Email=this.emailToReset
      this.resetPasswordObj.NewPassword=this.resetPasswordForm.value.password
      this.resetPasswordObj.ConfirmPassword=this.resetPasswordForm.value.ConfirmPassword
      this.resetPasswordObj.EmailToken=this.EmailToken

      this.resetService.resetPassword(this.resetPasswordObj)
      .subscribe({
        next:(res)=>{
          this.toast.success({
            detail:'Success',
            summary:"Password Reset Successfull",
            duration:3000
          })
          this.router.navigate(['/login'])
        },
        error:(err)=>{
          this.toast.error({
            detail:'Error',
            summary:"Something went wrong",
            duration:3000
          })
        }

      })

    }else{
      
    }
  }

}
