import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IReplies } from 'src/app/model/post.model';

@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.css']
})
export class ReplyCommentComponent implements OnInit {
  public Editor = ClassicEditor;
  public config = {
    removePlugins: ['Heading'],
    toolbar: ['bold', 'italic', 'link', 'imageUpload', "imageStyle:full", "imageStyle:side", 'bulletedList', 'numberedList', 'blockQuote']
  }
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
    this.replyComment.emit(reply)
  }
}
