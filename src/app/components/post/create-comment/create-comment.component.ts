import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostService } from 'src/app/services/home.service';
import { IComments } from 'src/app/model/post.model';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  public Editor = ClassicEditor;
  public config = {
    removePlugins: ['Heading'],
    toolbar: ['bold', 'italic', 'link', 'imageUpload', "imageStyle:full", "imageStyle:side", 'bulletedList', 'numberedList', 'blockQuote']
  }
  commentForm: FormGroup;
  @Output() saveNewComment = new EventEmitter()
  @Input() reset;

  constructor(private fb: FormBuilder, private ps: PostService) { }

  ngOnInit() {
    this.commentForm = this.fb.group({
      body: [this.reset, Validators.required]
    })
  }


  addThisComment(formValue) {
    let comment: IComments = {
      content: formValue.body,
      likes: 0,
      date: new Date,
    }
    this.saveNewComment.emit(comment)
    this.commentForm.reset()
  }
}
