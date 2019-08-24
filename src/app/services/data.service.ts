import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { posts } from '../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  post: posts;
  private msgFromServer = new BehaviorSubject('');
  private postBody = new BehaviorSubject(this.post)

  currentMessage = this.msgFromServer.asObservable()
  newPostBody = this.postBody.asObservable()
  constructor() { }

  sendMessage(data: any){
    this.msgFromServer.next(data)
  }

  sendNewPost(poste: posts){
    this.postBody.next(poste)
  }
}
