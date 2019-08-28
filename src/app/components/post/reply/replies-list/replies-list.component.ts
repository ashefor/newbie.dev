import { Component, OnInit, Input } from '@angular/core';
import { IReplies } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/home.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-replies-list',
  templateUrl: './replies-list.component.html',
  styleUrls: ['./replies-list.component.css']
})
export class RepliesListComponent implements OnInit {
  @Input() replies: IReplies[];
  @Input() commentId;
  @Input() postId;
  replyToEditId;

  constructor(private ps: PostService, private ds: DataService) { }

  ngOnInit() {
  }
  showEditThisReply(reply_id){
    this.ps.getReplyForUpdate(this.postId, this.commentId, reply_id).subscribe((data: any)=>{
      this.replyToEditId = data.reply._id;
      this.ds.sendCommentReplyData(data.reply.text)
    })
  }
  cancelEditThisReply(){
    this.replyToEditId = null;
  }

  editThisReply(reply: IReplies){
    this.ps.editReply(this.postId, this.commentId, this.replyToEditId, reply.text).subscribe((data: any)=>{
      if(data){
        this.ds.sendNewPost(data)
      }
    })
  }

  deleteThisReply(reply_id){
    if(confirm('really delete this reply?')){
      this.ps.deleteReply(this.postId, this.commentId, reply_id).subscribe((resp: any)=>{
        console.log(resp)
        this.ds.sendNewPost(resp)
      })
    }
  }
}