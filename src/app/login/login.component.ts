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
  }
}

export interface Login {
  username: string;
  password: string;
}
