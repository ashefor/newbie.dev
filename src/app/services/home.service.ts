import { posts } from './../model/post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsURL = 'http://localhost:5000/api/posts'
  constructor(private http: HttpClient) { }

  getAllPosts(){
    return this.http.get<posts[]>(this.postsURL)
  }

  createPost(post: posts){
    return this.http.post(this.postsURL, post)
  }

  viewOnePost(id: number){
    return this.http.get<posts>(`${this.postsURL}/${id}`)
  }
  editPost(id: number){
    return this.http.get<posts>(`${this.postsURL}/${id}`)
  }
  updatePost(post: posts){
    return this.http.put(`${this.postsURL}/${post._id}`, post)
  }
  deletePost(id: number){
    return this.http.delete(`${this.postsURL}/${id}`)
  }
  likeThisPost(id: number){
    return this.http.put(`${this.postsURL}/${id}/likes`,{})
  }
  likeThisComment(post_id:number, comment_id: number){
    return this.http.put(`${this.postsURL}/${post_id}/comments/${comment_id}/likes`,{})
  }
  createComment(id: number, content: string){
    return this.http.post(`${this.postsURL}/${id}/comments`, {content})
  }
  getSingleCommentForUpdate(post_id: number, comment_id: number){
    return this.http.get(`${this.postsURL}/${post_id}/comments/${comment_id}`)
  }
  updateThisComment(post_id: number, comment_id: number, content: string){
    return this.http.put(`${this.postsURL}/${post_id}/comments/${comment_id}`, {content})
  }
  postReply(post_id: number, comment_id: number, content: string){
    return this.http.post(`${this.postsURL}/${post_id}/comments/${comment_id}/replies`, {content})
  }
  deleteComment(post_id: number, comment_id: number){
    return this.http.delete(`${this.postsURL}/${post_id}/comments/${comment_id}`)
  }
  editReply(post_id: number, comment_id: number, reply_id: number, content: string){
    return this.http.put(`${this.postsURL}/${post_id}/comments/${comment_id}/replies/${reply_id}`, {content})
  }
  deleteReply(post_id: number, comment_id: number, reply_id: number){
    return this.http.delete(`${this.postsURL}/${post_id}/comments/${comment_id}/replies/${reply_id}`)
  }
  getReplyForUpdate(post_id: number, comment_id: number, reply_id: number){
    return this.http.get(`${this.postsURL}/${post_id}/comments/${comment_id}/replies/${reply_id}`)
  }
}
