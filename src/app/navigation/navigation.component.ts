import { Component, OnInit } from '@angular/core';
import {UserAccount} from "../view/model/user-account";
import {UserAccountService} from "../shared/user-account.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isUserLoggedIn: boolean
  username: string

  constructor(private userAccountService: UserAccountService) {
    this.userAccountService.getUserAccount(localStorage.getItem("currId")).subscribe(
      res => {this.username = res.username})
    this.isUserLoggedIn = JSON.parse(localStorage.getItem("loggedIn"))
    console.log("local variable =" + this.isUserLoggedIn)
  }

  ngOnInit(): void {
  }

  loggOut(): void{
    localStorage.setItem("loggedIn", "false")
    this.isUserLoggedIn = JSON.parse(localStorage.getItem("loggedIn"))
    location.assign("https://zcwapp.herokuapp.com/allview")
  }
}
