import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSpinnerModule.forRoot({type:'ball-scale-multiple'})    
  ],
  exports: [
    SignupComponent // Export LoginComponent if it's used outside this module
  ]
})
export class SignupModule { }
