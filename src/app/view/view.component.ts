import { Component, OnInit } from '@angular/core';
import {BlogPost} from "./model/blog-post";
import {ZcwAppService} from "../shared/zcw-app.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-blogs',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  selectedBlogPost: BlogPost;

  constructor(private apiService: ZcwAppService) { }

  ngOnInit(): void {
    this.getAllBlogPosts();
  }

  selectBlogPost(blogPost: BlogPost) {
    this.selectedBlogPost = blogPost;
    console.log(this.selectedBlogPost.id);
  }

  public getAllBlogPosts(){
    this.apiService.getAllBlogPosts().subscribe(
      res => {
        this.blogPosts = res;
      },
      error => {
        alert("An error has occurred while fetching all blog posts")
      }
    )
  }
}
