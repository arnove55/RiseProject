import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { TermsconditionComponent } from './components/termscondition/termscondition.component';

import { SignupModule } from './modules/signup/signup.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NgToastModule } from 'ng-angular-popup';
import { ForgotModule } from './modules/forgot/forgot.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, NativeDateAdapter, NativeDateModule } from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {QRCodeModule} from 'angularx-qrcode'
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list'
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginModule } from './modules/login/login.module';
import { NgxSpinnerModule } from "ngx-spinner";



//import { QRCodeErrorCorrectionLevel } from "qrcode";



@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    PoliciesComponent,
    TermsconditionComponent,
    HomeComponent,
  

    

   
  ],
  imports: [
   
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SignupModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    ForgotModule,
    BrowserAnimationsModule,
    MatCardModule, 
    MatDatepickerModule,
    MatFormFieldModule, 
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    NativeDateModule,
    MatButtonModule,
   FormsModule,
   QRCodeModule,MatInputModule,
   MatButtonModule,
   MatListModule,
   NgxSpinnerModule.forRoot({type:'ball-scale-multiple'})
   
  
   
   
    
  
  
    
  


  
 
  ],
  providers: [
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
