import {Component, OnInit} from '@angular/core';
import {BlogPost} from "./model/blog-post";
import {BlogComment} from "./model/blog-comment";
import {BlogPostService} from "../shared/blog-post.service";
import {CommentService} from "../shared/comment.service";
import {ActivatedRoute} from "@angular/router";
import {UserAccountService} from "../shared/user-account.service";
import {UserAccount} from "./model/user-account";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  selectedBlogPost: BlogPost;
  comments: BlogComment[] = [];
  userAccount: UserAccount;

  constructor(private blogPostService: BlogPostService,
              private commentService: CommentService,
              private userAccountService: UserAccountService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getUser()
  }

  public getUser(){
    let userId = '';
    this.activatedRoute.params.subscribe(
      res => {
        userId = res['id']
      }
    );
    this.userAccountService.getUserAccount(userId).subscribe(
      res => {
        this.userAccount = res
        console.log(res)
        this.getAllBlogPostByUser()
      }
    );
  }

  public getAllBlogPostByUser() {
    this.blogPostService.getAllBlogPostsByUser(this.userAccount.username).subscribe(
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
      this.commentService.getAllCommentByBlogId(this.selectedBlogPost.blogId).subscribe(
        res => {
          this.comments = res;
        },
        error => {
          alert("An error occurred while fetching comments relating to blog id" + this.selectedBlogPost.blogId)
        }
      )
    }
  }

  public deleteBlogPost(blogPost: BlogPost) {
    if(confirm("Are you sure you want to delete this blog post?")){
      this.blogPostService.deleteBlogPost(blogPost.blogId.toString()).subscribe(
        res => {
          let blogPostIndex = this.blogPosts.indexOf(blogPost);
          this.blogPosts.splice(blogPostIndex, 1);
        },
        error => {
          alert("Couldn't delete blog post")
        }
      );
    }
  }
}
