import {Component, OnInit} from '@angular/core';
import {BlogPost} from "./model/blog-post";
import {BlogComment} from "./model/blog-comment";
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
  comments: BlogComment[] = [];

  constructor(private apiService: ZcwAppService) {
  }

  ngOnInit(): void {
    this.getAllBlogPosts();
  }

  public selectBlogPost(blogPost: BlogPost) {
    this.selectedBlogPost = blogPost;
  }

  public getAllBlogPosts() {
    this.apiService.getAllBlogPosts().subscribe(
      res => {
        this.blogPosts = res;
      },
      error => {
        alert("An error has occurred while fetching all blog posts")
      }
    )
  }

  public getAllCommentsBySelectedBlog(blogPost: BlogPost) {
    this.selectedBlogPost = blogPost;
    if (this.blogPosts.length != 0) {
      this.apiService.getAllCommentByBlogId(this.selectedBlogPost.blogId).subscribe(
        res => {
          this.comments = res;
        },
        error => {
          alert("An error occurred while fetching comments relating to blog id" + this.selectedBlogPost.blogId)
        }
      )
    }
  }
}
