import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BlogComment} from "../view/model/blog-comment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private newUrl: string;
  private BASE_URL = "http://localhost:8080/zcwApp/comment";
  private ALL_COMMENTS_BY_POST_URL = `${this.BASE_URL}/allByBlogId/`;
  private POST_COMMENT_URL = `${this.BASE_URL}/save`;

  constructor(private http: HttpClient) { }

  getAllCommentByBlogId(id: number): Observable<BlogComment[]>{
    this.newUrl = `${this.ALL_COMMENTS_BY_POST_URL}${id}`;
    return this.http.get<BlogComment[]>(this.newUrl);
  }

  postComment(comment: BlogComment): Observable<BlogComment>{
    return this.http.post<BlogComment>(this.POST_COMMENT_URL, comment);
  }
}
