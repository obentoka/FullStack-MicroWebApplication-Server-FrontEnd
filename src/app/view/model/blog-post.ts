import {UserAccount} from "./user-account";
import {BlogComment} from "./blog-comment";

export interface BlogPost {
  blogId: number
  dateCreated: string
  username: string
  title: string
  body: string
  tag: string
  status: string
  commentList: BlogComment[]
  userAccount: UserAccount
}
