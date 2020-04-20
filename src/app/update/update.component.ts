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
    status: 'pending'
  }
  private id: string;

  constructor(private blogPostService: BlogPostService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getId();
    this.getBlogPost();
  }

  getBlogPost(): void{
    this.blogPostService.getBlogPostById(this.id).subscribe(
      res => {
        this.model = res;
      },
      error => {
        alert("Failed to find blog post");
      }
    );
  }

  getId(){
    this.activatedRoute.params.subscribe(
      res => {
        this.id = res['id'];
      }
    );
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
