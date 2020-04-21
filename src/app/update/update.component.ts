import { Component, OnInit } from '@angular/core';
import {BlogPost} from "../view/model/blog-post";
import {formatDate} from "@angular/common";
import {BlogPostService} from "../shared/blog-post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  model: BlogPost = {
    blogId: null,
    dateCreated: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    username: '',
    title: '',
    body: '',
    tag: '',
    status: 'pending',
    commentList: null,
    userAccount: null
  }
  private blogId: string

  constructor(private blogPostService: BlogPostService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBlogId()
    this.getBlogPost()
  }

  getBlogPost(): void{
    this.blogPostService.getBlogPostByBlogId(this.blogId).subscribe(
      res => {
        this.model = res
      },
      error => {
        alert("Failed to find blog post")
      }
    );
  }

  getBlogId(){
    this.activatedRoute.params.subscribe(
      res => {
        this.blogId = res['id']
      }
    )
  }

  updateBlogPost() {
    this.blogPostService.updateBlogPost(this.model.blogId.toString(), this.model)
      .subscribe(
        res => {
          location.assign("http://localhost:4200/view")
        },
        error => {
          alert("An error occurred while updating blog post")
        }
      )
  }
}
