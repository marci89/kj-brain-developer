import { Component, OnInit } from '@angular/core';
import { AccountService } from './common/services/account.service';
import { LanguageService } from './common/services/language.service';
import { LoginUser } from './common/interfaces/account.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
  private accountService: AccountService,
  private languageService: LanguageService,
  private router: Router,
  )
  {}

  ngOnInit(): void {
    this.setCurrentUser();
    this.languageService.initialize();
  }

  //Setting the user from a cookie if the user have already logged in before
  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) {
      return;
    } else {
      this.router.navigate(['daily-task']);
    }
    const user: LoginUser = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
