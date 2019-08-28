import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { PostService } from 'src/app/services/home.service';
import { IComments } from 'src/app/model/post.model';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  public Editor = BalloonEditor;
  commentForm: FormGroup;
  @Output() saveNewComment = new EventEmitter() 
  @Input() postId;

  constructor(private fb: FormBuilder, private ps: PostService) { }

  ngOnInit() {
    this.commentForm = this.fb.group({
      body: ['', Validators.required]
    })
  }


  addThisComment(formValue) {
    let comment: IComments = {
      body: formValue.body,
      likes: 0,
      date: new Date,
    }
    this.saveNewComment.emit(comment)
  }
}
