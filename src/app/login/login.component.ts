import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

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
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  login(): void{
    let url = "http://localhost:8080/zcwApp/user"
    this.http.post(url, this.model).subscribe(
      res => {
        location.reload();
      },
      error => {
        alert("An error has occurred while logging in")
      }
    )
  }
}

export interface Login {
  username: string;
  password: string;
}
