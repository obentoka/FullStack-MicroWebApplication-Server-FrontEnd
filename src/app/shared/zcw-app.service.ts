import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { BlogPost } from "../view/model/blog-post";
import {BlogComment} from "../view/model/blog-comment";

@Injectable({
  providedIn: 'root'
})
export class ZcwAppService {
  private BASE_URL = "http://localhost:8080/zcwApp";
  private ALL_BLOGPOSTS_URL = `${this.BASE_URL}/blogPost/all`;
  private POST_BLOGPOST_URL = `${this.BASE_URL}/blogPost/save`;

  private ALL_COMMENTS_BY_POST_URL = `${this.BASE_URL}/comment/allByBlogId/`;
  private newUrl: string;

  constructor(private http: HttpClient) { }

  getAllBlogPosts(): Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(this.ALL_BLOGPOSTS_URL);
  }

  postBlogPost(blogPost: BlogPost): Observable<BlogPost>{
    return this.http.post<BlogPost>(this.POST_BLOGPOST_URL, blogPost);
  }

  getAllCommentByBlogId(id: number): Observable<BlogComment[]>{
    this.newUrl = this.ALL_COMMENTS_BY_POST_URL + id.toString();
    return this.http.get<BlogComment[]>(this.newUrl);
  }
}
