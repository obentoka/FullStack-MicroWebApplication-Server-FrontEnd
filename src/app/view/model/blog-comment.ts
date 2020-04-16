export interface BlogComment {
  commentId: number;
  dateCreated: string;
  user: string;
  userEmail: string;
  text: string;
  likes: number;
  blogId: number;
}
