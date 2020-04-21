import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {UserAccountService} from "../shared/user-account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: Login = {
    username: '',
    password: ''
  }
  constructor(private userAccountService: UserAccountService) { }

  ngOnInit(): void {
  }

  login(username: string, password: string): void{
      this.userAccountService.getUserAccountLogin(username, password).subscribe(
        res => {
          localStorage.setItem("loggedIn", "true")
          localStorage.setItem("currUsername", res.username)
          localStorage.setItem("currId", res.userId.toString())
          location.assign("http://localhost:4200/view")
        }
      )
  }
}

export interface Login {
  username: string
  password: string
}
