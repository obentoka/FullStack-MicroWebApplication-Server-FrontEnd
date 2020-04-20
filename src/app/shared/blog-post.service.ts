import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { BlogPost } from "../view/model/blog-post";
import {BlogComment} from "../view/model/blog-comment";

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  private BASE_URL = "http://localhost:8080/zcwApp/blogPost";
  private ALL_BLOGPOSTS_URL = `${this.BASE_URL}/all`;
  private POST_BLOGPOST_URL = `${this.BASE_URL}/save`;
  private DELETE_BLOGPOST_URL = `${this.BASE_URL}/delete/`;

  constructor(private http: HttpClient) { }

  getAllBlogPosts(): Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(this.ALL_BLOGPOSTS_URL);
  }

  postBlogPost(blogPost: BlogPost): Observable<BlogPost>{
    return this.http.post<BlogPost>(this.POST_BLOGPOST_URL, blogPost);
  }

  deleteBlogPost(id: string): Observable<any>{
    return this.http.delete(this.DELETE_BLOGPOST_URL + id);
  }
}
