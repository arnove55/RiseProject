import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class authgaurdGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router,private toast:NgToastService){

  }
  canActivate():boolean {
   if(this.auth.isLoggedIn()){
    return true
   }else{
    this.toast.error({detail:"Error",summary:"Please login first!"})
    this.router.navigate(['login'])
    return false
   }
  }
}

 
