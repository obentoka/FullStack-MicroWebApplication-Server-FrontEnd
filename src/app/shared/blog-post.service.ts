import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { BlogPost } from "../view/model/blog-post";

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  private newUrl: string;
  private BASE_URL = "http://localhost:8080/zcwApp/blogPost";
  private ALL_BLOGPOSTS_URL = `${this.BASE_URL}/all`;
  private GET_BLOGPOST_BYBLOGID_URL = `${this.BASE_URL}/`;
  private GET_BLOGPOST_BYUSERID_URL = `${this.BASE_URL}/allByUser/`;
  private POST_BLOGPOST_URL = `${this.BASE_URL}/save`;
  private DELETE_BLOGPOST_URL = `${this.BASE_URL}/delete/`;
  private UPDATE_BLOGPOST_BYID_URL = `${this.BASE_URL}/update/`;

  constructor(private http: HttpClient) { }

  getAllBlogPosts(): Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(this.ALL_BLOGPOSTS_URL);
  }

  getAllBlogPostsByUser(username: string): Observable<BlogPost[]>{
    this.newUrl = this.GET_BLOGPOST_BYUSERID_URL + username;
    return this.http.get<BlogPost[]>(this.newUrl);
  }

  getBlogPostByBlogId(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(this.GET_BLOGPOST_BYBLOGID_URL + id);
  }

  postBlogPost(blogPost: BlogPost): Observable<BlogPost>{
    return this.http.post<BlogPost>(this.POST_BLOGPOST_URL, blogPost);
  }

  deleteBlogPost(id: string): Observable<any>{
    return this.http.delete(this.DELETE_BLOGPOST_URL + id);
  }

  updateBlogPost(id: string, blogPost: BlogPost): Observable<BlogPost>{
    this.newUrl = this.UPDATE_BLOGPOST_BYID_URL + id;
    return this.http.put<BlogPost>(this.newUrl, blogPost);
  }
}
