import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserAccount} from "../view/model/user-account";
import {formatDate} from "@angular/common";
import {UserAccountService} from "../shared/user-account.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  model: UserAccount = {
    userId: null,
    dateCreated: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    username: '',
    password: '',
    email: ''
  }

  constructor(private userAccountService: UserAccountService) {
  }

  ngOnInit(): void {
  }

  signUp(): void {
    this.userAccountService.postUserAccount(this.model).subscribe(
      res => {
        this.model.userId = res.userId;
        location.reload();
      },
      error => {
        alert("Username/Email already exists. Please choose a different Username/Password")
      }
    )
  }
}
