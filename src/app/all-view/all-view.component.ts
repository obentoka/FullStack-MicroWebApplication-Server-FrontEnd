import {Component, OnInit} from '@angular/core';
import {BlogPost} from "../view/model/blog-post";
import {BlogComment} from "../view/model/blog-comment";
import {BlogPostService} from "../shared/blog-post.service";
import {CommentService} from "../shared/comment.service";
import {formatDate} from "@angular/common";
import {UserAccountService} from "../shared/user-account.service";
import {UploadFileService} from "../shared/upload-file.service";

@Component({
  selector: 'app-all-view',
  templateUrl: './all-view.component.html',
  styleUrls: ['./all-view.component.css']
})
export class AllViewComponent implements OnInit {
  blogPosts: BlogPost[] = []
  selectedBlogPost: BlogPost
  comments: BlogComment[] = []
  isComment: boolean = false
  commentText: string = ''
  blogComment: BlogComment = {
    commentId: 0,
    dateCreated: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    username: '',
    text: '',
    likes: 0,
    blogId: null,
    userId: null
  }
  isUserLoggedIn: boolean

  constructor(private blogPostService: BlogPostService,
              private commentService: CommentService,
              private userAccountService: UserAccountService) {
    this.isUserLoggedIn = JSON.parse(localStorage.getItem("loggedIn"))
  }

  ngOnInit(): void {
    this.getAllBlogPosts()
  }

  public getAllBlogPosts() {
    this.blogPostService.getAllBlogPosts().subscribe(
      res => {
        this.blogPosts = res
      },
      error => {
        alert("An error has occurred while fetching all blog posts")
      }
    )
  }

  public getAllCommentsBySelectedBlog(blogPost: BlogPost) {
    this.selectedBlogPost = blogPost
    if (this.blogPosts.length != 0) {
      this.commentService.getAllCommentByBlogId(this.selectedBlogPost.blogId).subscribe(
        res => {
          this.comments = res
        },
        error => {
          alert("An error occurred while fetching comments relating to blog id" + this.selectedBlogPost.blogId)
        }
      )
    }
  }

  public toggleCommentBar(event: any) {
    event.preventDefault()
    this.isComment = !this.isComment
  }

  public createComment(comment: string, event: any) {
    event.preventDefault()
    this.blogComment.text = comment
    this.blogComment.blogId = this.selectedBlogPost.blogId
    if(JSON.parse(localStorage.getItem("loggedIn"))){
      this.userAccountService.getUserAccount(localStorage.getItem("currId")).subscribe(
        res => {
          this.blogComment.username = res.username
          this.blogComment.userId = res.userId
          this.comments.push(this.blogComment)
          this.commentService.postComment(this.blogComment).subscribe(
            res => {},
            error => {
              alert("An error occurred while saving comment")
            }
          )
        }
      )
    }
    else{
      this.blogComment.username = "anonymous"
      this.comments.push(this.blogComment)
      this.commentService.postComment(this.blogComment).subscribe(
        res => {},
        error => {
          alert("An error occurred while saving comment")
        }
      )
    }
    this.commentText = ''
    this.isComment = false
  }

  public increaseLike(comment: BlogComment){
    comment.likes += 1
    this.commentService.getCommentIncrementLikes(comment.commentId).subscribe()
  }
}
