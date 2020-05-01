import { Component, OnInit } from '@angular/core';
import {BlogPost} from "../view/model/blog-post";
import {formatDate} from "@angular/common";
import {BlogPostService} from "../shared/blog-post.service";
import {UserAccount} from "../view/model/user-account";
import {UserAccountService} from "../shared/user-account.service";
import {UploadFileService} from "../shared/upload-file.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  model: BlogPost = {
    blogId: 0,
    dateCreated: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    username: '',
    title: '',
    body: '',
    tag: '',
    status: 'pending',
    commentList: null,
    userAccount: null
  }
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  file:string;


  constructor(private blogPostService: BlogPostService,
              private userAccountService: UserAccountService,
              private uploadFileService: UploadFileService,
              private https:HttpClient) { }

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
            // this.upload()
            location.assign("http://localhost:4200/view")
          },
          error => {
            alert("An error occurred while saving blog post")
          }
        )
      },
      error => {
        alert("An error occurred while retrieving user")
      }
    )
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadFileService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      this.selectedFiles = undefined;
    });
  }

  validateSize() {
    if (this.selectedFiles.item(0).size / 1024 / 1024 > 1) {
      alert("File must be smaller than 1MB");
      this.selectedFiles = undefined;
    }
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
