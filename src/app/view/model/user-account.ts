import {BlogComment} from "./blog-comment";
import {BlogPost} from "./blog-post";

export interface UserAccount {
  userId: number
  dateCreated: string
  username: string
  password: string
  email: string
  blogPostList: BlogPost[]
  commentList: BlogComment[]
}
