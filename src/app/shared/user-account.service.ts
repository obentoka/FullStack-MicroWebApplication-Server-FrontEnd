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
  private GET_USER_ACCOUNT_BYID_URL = `${this.BASE_URL}/`;
  private POST_USER_ACCOUNT_URL = `${this.BASE_URL}/save`;

  constructor(private http: HttpClient) { }

  getUserAccount(id: string): Observable<UserAccount>{
    this.newUrl = this.GET_USER_ACCOUNT_BYID_URL + id;
    return this.http.get<UserAccount>(this.newUrl);
  }

  postUserAccount(userAccount: UserAccount): Observable<UserAccount>{
    return this.http.post<UserAccount>(this.POST_USER_ACCOUNT_URL, userAccount);
  }
}
