import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
// import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IReplies } from 'src/app/model/post.model';



@Component({
  selector: 'app-edit-reply',
  templateUrl: './edit-reply.component.html',
  styleUrls: ['./edit-reply.component.css']
})
export class EditReplyComponent implements OnInit {
  public Editor = ClassicEditor;
  public config = {
    removePlugins: ['Heading'],
    toolbar: ['bold', 'italic', 'link', 'imageUpload', "imageStyle:full", "imageStyle:side", 'bulletedList', 'numberedList', 'blockQuote']
  }
  editReplyForm: FormGroup;
  replyCommentBody;
  @Output() cancelEditThisReply = new EventEmitter();
  @Output() editThisReply =  new EventEmitter()
  constructor(private fb: FormBuilder, private ds: DataService) { }

  ngOnInit() {
    this.ds.newCommentReplyData.subscribe(res => this.replyCommentBody= res)
    this.editReplyForm = this.fb.group({
      text: [this.replyCommentBody]
    })
  }

  cancel(){
    this.cancelEditThisReply.emit()
  }
  submitEditedReply(formvalue){
    let reply: IReplies = {
      content: formvalue.text
    }
    this.editThisReply.emit(reply)
  }
}
