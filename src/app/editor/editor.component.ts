import { Component, OnInit } from '@angular/core';
import {BlogPost} from "../view/model/blog-post";
import {formatDate} from "@angular/common";
import {BlogPostService} from "../shared/blog-post.service";
import {UserAccount} from "../view/model/user-account";
import {UserAccountService} from "../shared/user-account.service";
import {UploadFileComponent} from "../upload-file/upload-file.component";
import {UploadFileService} from "../shared/upload-file.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
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

  constructor(private blogPostService: BlogPostService,
              private userAccountService: UserAccountService,
              private uploadFileService: UploadFileService,
              private uploadFileComponent: UploadFileComponent) { }

  ngOnInit(): void {
  }

  public createBlogPost(): void{
    this.userAccountService.getUserAccount(localStorage.getItem("currId")).subscribe(
      userAcc => {
        this.model.userAccount = userAcc
        this.model.username = userAcc.username
        this.blogPostService.postBlogPost(this.model).subscribe(
          blogPost => {
            this.model.blogId = blogPost.blogId;
            location.assign("http://localhost:4200/view")
          },
          error => {
            alert("An error occurred while saving blog post")
          }
        )
      }
    )
  }

  public uploadFile(): void{
    this.uploadFileComponent.upload();
  }

  public selectFile(event): void{
    this.uploadFileComponent.selectedFile();
  }



}
