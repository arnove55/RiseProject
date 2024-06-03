import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  type:string="password"
  isText:boolean=false
  eyeIcon:string="fa-eye-slash"
  signupForm!:FormGroup

  constructor(private fb:FormBuilder,  private spinner: NgxSpinnerService,private auth:AuthService,private router:Router,private toast:NgToastService){ }
  ngOnInit(): void {
    this.signupForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
      cpassword:['',Validators.required]
    })
  }
  hidepsw(){
    this.isText=!this.isText
    this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash"
    this.isText?this.type="text":this.type="password"
  }
 
  OnSignUp(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value)
    this.auth.signup(this.signupForm.value)
    .subscribe({
      next:(res)=>{
        this.spinner.hide();
        this.toast.success({detail:"Success",summary:res.message,duration:5000})
        this.signupForm.reset()
        this.router.navigate(['login'])
      },
      error:(err)=>{
        this.toast.error({detail:"Error",summary:err?.error.message,duration:5000})
        
      }
    })
    }
  }
    private validatefields(formGroup:FormGroup) {
      Object.keys(formGroup.controls).forEach(field=>{
        const control=formGroup.get(field)
        if(control instanceof FormControl){
          control.markAsDirty({onlySelf:true})
        }else if(control instanceof FormGroup){
          this.validatefields(control)
  
        }
      })
  }
}
