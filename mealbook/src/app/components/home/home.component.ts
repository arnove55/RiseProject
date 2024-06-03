import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/Booking.Services'; 
import { DomSanitizer, SafeValue } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { CouponService } from 'src/app/services/coupon.service';
import { NgToastService } from 'ng-angular-popup';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
//import *  as menuData from '../../../assets/json/menuData.json'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation:ViewEncapsulation.None

})
export class HomeComponent implements OnInit{
  public users: any = [];
  coupons: any=[];
  //public fullname: string = "";
  selected!: Date | null;
  startDate = new Date(1990, 0, 1);
  public selectedStartDate!: Date | null;
  public selectedEndDate!: Date | null;
  bookingId=''
  qrData: string=''; 
  selectedYear!: number;
  selectedMonth!: string;
  selectedMeal!: string;
  totalBookings: number = 0;
  years: number[] = [];
  months: string[] = [];
  meals: string[] = ['Lunch', 'Dinner'];
  highlightedDates: Date[] = [
    new Date(2024, 5, 15),
    new Date(2024, 5, 20),
    new Date(2024, 5, 25)
  ];
 
  bookings:any[]=[]
  today!: string;
  //  menu!: { lunch: string[], dinner: string[] };

menu:any
  //test
  booking: any = {};
  public fullname: string = "";
  


  dateClassV2() {
    return (date: Date): MatCalendarCellCssClasses => {
      const day = date.getDay();
      const isSaturday = day === 6;
      const isSunday = day === 0;
  
      if (isSaturday || isSunday) {
        return 'weekend-date';
      }
  
      const dateString = date.toISOString().split('T')[0];
      const isBooked = this.bookings.some(booking => {
        const startDate = new Date(booking.start_Date).toISOString().split('T')[0];
        const endDate = new Date(booking.end_Date).toISOString().split('T')[0];
        return dateString >= startDate && dateString <= endDate;
      });
  
      return isBooked ? 'booked-date' : '';
    };
  }



  dateClassPredicate = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6 ? 'disabled-date' : '';
  };

  dateClass(date: Date): string[] {
    let cssClasses: string[] = [];

    if (this.highlightedDates && this.highlightedDates.some(d => d.getTime() === date.getTime())) {
      cssClasses.push('highlighted-date');
    }

    if (date.getDay() === 0 || date.getDay() === 6) {
      cssClasses.push('weekend');
    }
    
    console.log(cssClasses);

    return cssClasses;
  }
 

  onChange(url: SafeValue) {
    
  }
  constructor(private auth: AuthService, private bookingService: BookingService,
    private http: HttpClient,
    private couponService:CouponService,
    private Sanitizer:DomSanitizer,
    private toast:NgToastService
  ) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    this.selectedYear = currentYear;
    this.selectedMonth = currentMonth;
    this.selectedMeal = 'Lunch';

    for (let i = 2000; i <= 2024; i++) {
      this.years.push(i);
    }

    this.months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

  }
  disablePastDatesFilter = (d: Date): boolean => {
    const today = new Date();
    return d && (d.getDay() !== 0 && d.getDay() !== 6);
  }

  ngOnInit(): void {
    this.getQrData(this.coupons)
    this.getUserBooking();
    this.updateMenu(new Date())
  }
  onDateSelected(date: Date | null): void {
    
    this.selected = date || new Date();
    this.updateMenu(this.selected)
  
  }
  updateMenu(date:Date){
    const dayIndex = date.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectedDay = days[dayIndex];
    const menuData = {
      "Monday": {
        "lunch": ["Dal", "Bhakri", "Kadhi", "Bhat (Rice)", "Dhokla", "Salad"],
        "dinner": ["Undhiyu", "Puri", "Shrikhand", "Papad"]
      },
      "Tuesday": {
        "lunch": ["Thepla", "Batata Nu Shaak", "Methi Thepla", "Kachumber", "Buttermilk"],
        "dinner": ["Sev Tameta", "Bajra Rotla", "Gulab Jamun", "Chaas"]
      },
      "Wednesday": {
        "lunch": ["Khichdi", "Kadhi", "Farsan (Khandvi)", "Salad"],
        "dinner": ["Gujarati Dal", "Bhindi Masala", "Roti", "Basundi"]
      },
      "Thursday": {
        "lunch": ["Handvo", "Green Chutney", "Cucumber Salad"],
        "dinner": ["Paneer Tikka Masala", "Jeera Rice", "Roti", "Chaas"]
      },
      "Friday": {
        "lunch": ["Patra", "Kadhi", "Rice", "Salad"],
        "dinner": ["Ringan no Olo (Baingan Bharta)", "Bajra Rotla", "Jalebi", "Buttermilk"]
      }
    };
    // Update the menu based on the selected day
    this.menu = (menuData as any)[selectedDay];
    console.log(this.menu)
  }

  onSubmit() {
    if (!this.booking.booking_Type) {
      alert('Booking Type is required.');
      
      return;
    }
    if (!this.booking.start_Date) {
      alert('Start Date is required.');
      return;
    }
    if (!this.booking.end_Date) {
      alert('End Date is required.');
      return;
    }
    if (new Date(this.booking.start_Date) > new Date(this.booking.end_Date)) {
      alert('End Date cannot be before Start Date.');
      return;
    }

    this.bookingService.addBooking(this.booking).subscribe(
      response => {
        // alert('Booking added successfully');
        this.toast.success({detail:'Success',summary:response.message,duration:5000})
        console.log('Booking added successfully:', response);
        this.getUserBooking();
      },
      err => {
        // alert(`Booking Not Added`);
        this.toast.error({detail:"Error",summary:err?.error.message,duration:5000})
        console.error('Error adding booking:', err);
      }
    );
  }


  
  
  cancalBooking(){
    if(this.selected){
      const date=this.formatDate(this.selected)
      this.bookingService.cancelBooking(date).subscribe(
        res=>{
          console.log('Booking cancelled',res)
          this.toast.success({detail:"Success",summary:res.message,duration:5000})
          this.refreshCalendar()
        
        },err=>{
          console.log('Error cancelling booking',err)
          this.toast.error({detail:"Error",summary:err?.error.message,duration:5000})
        }
      )
    }else{
      console.log('No date selected')
    }
  }
  refreshCalendar() {
    this.selectedStartDate = new Date(this.selectedStartDate!.getTime());
  }


  getUserBooking() {
    this.bookingService.getUserBooking().subscribe(
      response => {
      
        this.bookings = response.bookings;
        this.totalBookings = response.totalBookings;
        this.refreshCalendar();
        console.log('Fetched bookings:', this.bookings);
        
      },
      error => {
        console.error('Error fetching user booking:', error);
        this.totalBookings = 0;
      }
    );
  }
  
 
  calculateTotalBookings(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  }


  formatDate(Date: Date): string {
    const year = Date.getFullYear();
    const month = (Date.getMonth() + 1).toString().padStart(2, '0');
    const day = Date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  formatstartDate(selectedStartDate: Date): string {
    const year = selectedStartDate.getFullYear();
    const month = (selectedStartDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedStartDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  generateAndFetchCoupons(): void {
    if (!this.selectedStartDate) {
      console.error('Start date not selected');
      return;
    }
  
    if(this.selectedStartDate){
      const selecteddate=this.formatstartDate(this.selectedStartDate)
      this.couponService.generateCoupon(selecteddate)
      
      .subscribe(res=>{
        this.coupons = res;
        if (this.coupons && this.coupons.length > 0) {
          const couponCode = this.coupons[0].couponCode;
          this.qrData = this.getQrData(couponCode);
          console.log(this.qrData)
        } else {
          console.error('No coupons returned from the server');
        }
      },
      err=>{
        console.error('Error generating coupon',err)
      }
    )
   
    }

    
  }

  getQrData(couponCode: string): string {
    return JSON.stringify({ couponCode });
  }
 

}


