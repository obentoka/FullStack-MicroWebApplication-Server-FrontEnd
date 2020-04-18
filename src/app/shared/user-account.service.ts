import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserAccount} from "../view/model/user-account";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  private newUrl: string;
  private BASE_URL = "http://localhost:8080/zcwApp/userAccount";
  private POST_USER_ACCOUNT_URL = `${this.BASE_URL}/save`
  private POST_HAS_USERNAME_URL = `${this.BASE_URL}/hasUsername/`
  private POST_HAS_EMAIL_URL = `${this.BASE_URL}/hasEmail/`

  constructor(private http: HttpClient) { }

  getHasUsername(username: String): Observable<Boolean>{
    this.newUrl = `${this.POST_HAS_USERNAME_URL}?username=${username}`;
    return this.http.get<Boolean>(this.newUrl);
  }

  getHasEmail(email: String): Observable<Boolean>{
    this.newUrl = `${this.POST_HAS_EMAIL_URL}?email=${email}`;
    return this.http.get<Boolean>(this.newUrl);
  }

  postUserAccount(userAccount: UserAccount): Observable<UserAccount>{
    return this.http.post<UserAccount>(this.POST_USER_ACCOUNT_URL, userAccount);
  }
}
