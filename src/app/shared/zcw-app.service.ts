import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BlogPost} from "../view/model/blog-post";

@Injectable({
  providedIn: 'root'
})
export class ZcwAppService {
  private BASE_URL = "http://localhost:8080/zcwApp";
  private ALL_BLOGPOSTS_URL = `${this.BASE_URL}/blogPost/all`;
  private POST_BLOGPOST_URL = `${this.BASE_URL}/blogPost/save`;

  constructor(private http: HttpClient) { }

  getAllBlogPosts(): Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(this.ALL_BLOGPOSTS_URL);
  }

  postBlogPost(blogPost: BlogPost): Observable<BlogPost>{
    return this.http.post<BlogPost>(this.POST_BLOGPOST_URL, blogPost);
  }
}
