import { Component, OnInit, Input } from '@angular/core';
import { IReplies } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/home.service';
import { DataService } from 'src/app/services/data.service';
import { ToasterNotificationService } from 'src/app/services/toastr.service';

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

  constructor(private ps: PostService, 
    private ds: DataService,
    private toastr: ToasterNotificationService) { }

  ngOnInit() {
  }


  showEditThisReply(reply_id){
    this.ps.getReplyForUpdate(this.postId, this.commentId, reply_id).subscribe((data: any)=>{
      console.log(data)
      this.replyToEditId = data.reply._id;
      this.ds.sendCommentReplyData(data.reply.content)
    })
  }
  cancelEditThisReply(){
    this.replyToEditId = null;
  }

  editThisReply(reply: IReplies){
    this.ps.editReply(this.postId, this.commentId, this.replyToEditId, reply.content).subscribe((data: any)=>{
      if(data){
        this.ds.sendNewPost(data)
      }
    })
  }

  deleteThisReply(reply_id){
    if(confirm('really delete this reply?')){
      this.ps.deleteReply(this.postId, this.commentId, reply_id).subscribe((resp: any)=>{
        console.log(resp)
        this.toastr.successToastr('Reply deleted successfully')
        this.ds.sendNewPost(resp)
      })
    }
  }
}
