import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  model:SignUp = {
    username:'',
    password:'',
    email:''
  }

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  signUp(): void{
    let url = "http://localhost:8080/zcw/user"
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

export interface SignUp {
  username:string;
  password:string;
  email:string;
}
