import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotComponent } from './forgot.component';





@NgModule({
  declarations: [
    ForgotComponent
  ],
  imports: [

    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    

  ],
 
})
export class ForgotModule { }