import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { TermsconditionComponent } from './components/termscondition/termscondition.component';
import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { authgaurdGuard } from './gaurds/authgaurd.guard';
import { ForgotComponent } from './modules/forgot/forgot.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'policies',component:PoliciesComponent},
  {path:'termscondition',component:TermsconditionComponent},
  {path:'forgot',component:ForgotComponent},
  {path:'home',component:HomeComponent,canActivate:[authgaurdGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
