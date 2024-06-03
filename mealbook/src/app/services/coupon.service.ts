import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../model/Booking.Model';
import { Observable } from 'rxjs';
import { AddBookingDto } from '../model/AddBookingDto.Model';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private baseurl='https://localhost:7019/api/Coupon'

  constructor(private http:HttpClient) { }
  // generateCoupon(date:string):Observable<any>{
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   console.log(headers)
  //   //return this.http.post<any>(`${this.baseurl}/${date}`,{headers})
  //   return this.http.post<any>(`${this.baseurl}/${date}`, null, { headers });

  //   // return this.http.post<any>(this.baseurl,date,{headers})
  // }
  generateCoupon(date: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseurl}/${date}`, null, { headers });
  }
}
