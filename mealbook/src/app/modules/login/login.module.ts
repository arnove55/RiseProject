import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";





@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,

    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSpinnerModule.forRoot({type:'ball-scale-multiple'})    

  ],
 
})
export class LoginModule { }
