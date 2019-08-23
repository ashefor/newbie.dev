import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.css']
})
export class ReplyCommentComponent implements OnInit {
  public Editor = BalloonEditor;
  @Output() addNewReply = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

}
