import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserStoreService } from './services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'mealbook';
  isLoginPage = false;
  isSignup = false;
  isforgot = false;
  public fullname: string = "";

  constructor(private router: Router, private auth: AuthService, private userStore: UserStoreService) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/login';
        this.isSignup = this.router.url === '/signup';
        this.isforgot = this.router.url === '/forgot';
      }
    });
  }

  ngOnInit(): void {
    this.userStore.getFullNameFromStore().subscribe(val => {
      let fullnamefromtoken = this.auth.getFullNameFromToken();
      this.fullname = val || fullnamefromtoken;
    });
  }

  logout() {
    this.auth.signout();
    this.userStore.setFullNameFromStore("");
  }
}
