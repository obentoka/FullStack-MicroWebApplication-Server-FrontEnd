import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserAccount} from "../view/model/user-account";
import {formatDate} from "@angular/common";
import {UserAccountService} from "../shared/user-account.service";
import {BlogPost} from "../view/model/blog-post";
import {BlogComment} from "../view/model/blog-comment";

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
    email: '',
    blogPostList: null,
    commentList: null
  }

  constructor(private userAccountService: UserAccountService) {
  }

  ngOnInit(): void {
  }

  signUp(): void {
    this.model.dateCreated = formatDate(new Date(), 'yyyy-MM-dd', 'en')
    this.userAccountService.postUserAccount(this.model).subscribe(
      res => {
        this.model.userId = res.userId
        localStorage.setItem("loggedIn", "true")
        localStorage.setItem("currUsername", res.username)
        localStorage.setItem("currId", res.userId.toString())
        location.assign("https://zcwapp.herokuapp.com/view")
      },
      error => {
        alert("Username/Email already exists. Please choose a different Username/Password")
      }
    )

  }
}
