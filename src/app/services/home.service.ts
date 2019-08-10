import { posts } from './../model/post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
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
    return this.http.patch(`${this.postsURL}/${id}/likes`, {})
  }
}
