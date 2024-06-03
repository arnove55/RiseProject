import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7019/api/User/";
  private userPayLoad: any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayLoad = this.decodedToken();
  }

  signup(SignupObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, SignupObj);
  }

  signout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  login(LoginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, LoginObj)
     
    
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    return token ? jwtHelper.decodeToken(token) : null;
  }

  getFullNameFromToken() {
    return this.userPayLoad ? this.userPayLoad.name : null;
  }
}
