import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../model/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private baseUrl:string="https://localhost:7019/api/User"

  constructor(private http:HttpClient) { }

  sendResetPasswordLink(email:string){
    console.log("email",email)
    return this.http.post<any>(`${this.baseUrl}/send-reset-email/${email}`,{})

  }
  resetPassword(resetPasswordObj:ResetPassword){
    return this.http.post<any>(`${this.baseUrl}/forgot`,resetPasswordObj)

  }
}
