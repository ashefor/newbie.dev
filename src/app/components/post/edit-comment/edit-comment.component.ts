import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { IComments } from 'src/app/model/post.model';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  public Editor = BalloonEditor;
  editCommentForm: FormGroup;
  commentBody;
  postId;
  @Output() cancelEditComment = new EventEmitter()
  @Output() editComment = new EventEmitter()

  constructor(private fb: FormBuilder, private ds: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.ds.currentMessage.subscribe(res => this.commentBody = res);
    this.postId = this.route.snapshot.params['id']
    this.editCommentForm = this.fb.group({
      text: [this.commentBody]
    })
  }

  cancelComment(){
    this.cancelEditComment.emit()
  }

  updateComment(formValue){
    let comment: IComments = {
      body: formValue.text
    }
    this.editComment.emit(comment)
  }
}