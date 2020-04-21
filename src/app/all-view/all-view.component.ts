import {Component, OnInit} from '@angular/core';
import {BlogPost} from "../view/model/blog-post";
import {BlogComment} from "../view/model/blog-comment";
import {BlogPostService} from "../shared/blog-post.service";
import {CommentService} from "../shared/comment.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-all-view',
  templateUrl: './all-view.component.html',
  styleUrls: ['./all-view.component.css']
})
export class AllViewComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  selectedBlogPost: BlogPost;
  comments: BlogComment[] = [];
  isComment: boolean = false;
  commentText: string = '';
  blogComment: BlogComment = {
    commentId: null,
    dateCreated: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    username: '',
    text: '',
    likes: 0,
    blogId: null
  }

  constructor(private blogPostService: BlogPostService,
              private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.getAllBlogPosts();
  }

  public getAllBlogPosts() {
    this.blogPostService.getAllBlogPosts().subscribe(
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

  public toggleCommentBar() {
    this.isComment = !this.isComment;
  }

  public createComment(comment: string) {
    if (comment.length != 0) {
      this.blogComment.blogId = this.selectedBlogPost.blogId
      this.blogComment.text = comment
      this.commentService.postComment(this.blogComment).subscribe(
        res => {
        },
        error => {
          alert("An error occurred while saving comment")
        }
      )
    }
    this.commentText = '';
    this.isComment = false;
  }
}
