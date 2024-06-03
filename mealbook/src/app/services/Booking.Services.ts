import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../model/Booking.Model';

interface Bookings{
  username:string
  meal:string
  mealType:string
  couponCode:string
}

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private apiUrl = 'https://localhost:7019/api/Booking'; 

  constructor(private http: HttpClient) { }

  addBooking(booking: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(booking)
    return this.http.post<any>(`${this.apiUrl}`, booking, { headers });
  }
 
  cancelBooking(date: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${date}`, { headers });
  }
  getUserBooking(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/user-booking`, { headers });
  }

  getUserBookingtest(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bookings`); 
  }

  
}

