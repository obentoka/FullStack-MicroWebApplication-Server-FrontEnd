import { Component, OnInit } from '@angular/core';
import {BlogPost} from "./model/blog-post";
import {ZcwAppService} from "../shared/zcw-app.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogPosts: BlogPost[] = [];

  constructor(private apiService: ZcwAppService) { }

  ngOnInit(): void {
    this.getAllBlogPosts();
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
