import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IReplies } from 'src/app/model/post.model';

@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.css']
})
export class ReplyCommentComponent implements OnInit {
  public Editor = BalloonEditor;
  @Output() replyComment = new EventEmitter()
  @Output() cancelAddReply = new EventEmitter()
  replyCommentForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.replyCommentForm = this.fb.group({
      text: ['', Validators.required]
    })
  }
  cancelReply() {
    this.cancelAddReply.emit()
  }
  sendReply(formValue) {
    let reply: IReplies = {
      content: formValue.text,
      date: new Date,
    }
    // console.log(formValue)
    this.replyComment.emit(reply)
  }
}
