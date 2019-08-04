import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private postsURL = 'http://localhost:5000/api/posts'
  constructor(private http: HttpClient) { }

  getAllPosts(){
    return this.http.get(this.postsURL)
  }

  createPost(title: string, author: string, body: string, date: Date){
    return this.http.post(this.postsURL, {title, author, body, date})
  }

  viewOnePost(id){
    return this.http.get(`${this.postsURL}/${id}`)
  }
}
