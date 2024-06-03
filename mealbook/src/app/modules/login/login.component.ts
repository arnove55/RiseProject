import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgToastService } from 'ng-angular-popup';
import { ResetPassword } from 'src/app/model/reset-password.model';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  loginForm!:FormGroup;
  public resetPasswordEmail! :string
  public isvalidEmail!: boolean

  constructor(private fb:FormBuilder,private auth:AuthService, private router:Router,
    private spinner: NgxSpinnerService,
    private toast:NgToastService,
    private resetService:ResetPasswordService
  ){}

  ngOnInit(): void {
      this.loginForm=this.fb.group({
        username:['',Validators.required],
        password:['',Validators.required]
      })
  }
  hidepsw(){
    this.isText=!this.isText
    this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash"
    this.isText?this.type="text":this.type="password"
  }
  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      //send the obj to database
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          this.spinner.hide();
          this.loginForm.reset()
          this.auth.storeToken(res.token)
          
          this.toast.success({detail:"Success",summary:res.message,duration:5000})
          this.router.navigate(['home'])
          
      },
        error:(err)=>{
          //alert(err?.error.message)
          this.toast.error({detail:"Error",summary:err?.error.message,duration:5000})
        }
      })

    }else{
      //console.log("invalid")
      //throw error using toster and required field
      this.validatefields(this.loginForm)
      alert("invalid")
    }
  }
  private validatefields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control=formGroup.get(field)
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }else if(control instanceof FormGroup){
        this.validatefields(control)

      }
    })

  }
  checkValidEmail(event:string){
    const value=event
    const pattern = /^[\w.-]+@([\w-]+\.)+[\w-]{2,3}$/;
    //console.log(event)

    this.isvalidEmail=pattern.test(value)
    return this.isvalidEmail
  }
  send(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail)
      
      this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
      .subscribe({
        next:(res)=>{
          this.toast.success({
            detail:'Success',
            summary:'Reset successfull',
            duration:3000
          })
          this.resetPasswordEmail=""
          const buttonRef=document.getElementById("closebtn")
          buttonRef?.click()
        },
        error:(err)=>{
          this.toast.error({
            detail:'Error',
            summary:'Something went wrong',
            duration:3000
          })
        }
      })
    }
  }

}
