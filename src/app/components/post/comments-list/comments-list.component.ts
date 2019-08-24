import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IComments, posts, IReplies } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  @Input() comments:IComments[];
  index;
  postId;
  commentId;
  constructor(private ps: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.comments);
    this.index = null;
    this.postId = this.route.snapshot.params['id']
    console.log(this.postId)
  }

  showReplyComment(comment_id){
    this.commentId = comment_id
    this.index = this.comments.find(x => x.id = comment_id).id
    // this.donots =! this.donots
    // this.ps.getSingleCommentForUpdate(this.post._id, comment_id).subscribe((dataa: any) => {
    //   if (dataa) {
    //     console.log(dataa)
    //     this.newCommentId = dataa._id;
    //     this.editorData = dataa.body;
    //     this.commentId = null;
    //   }
    // })
  }

  editComment(comment_id){

  }
  cancelAddReply(){
    this.index = null;
  }

  replyComment(reply: IReplies){
    console.log(this.comments)
    let replys = this.comments.find(x => x.body).replies
    // replys.push(reply)
    this.ps.postReply(this.postId, this.commentId,reply.text).subscribe((data: any)=>{
      if(data){
        console.log(data);
        replys.push(reply);
        // this.index = null;
        this.cancelAddReply()
      }
    })
  }

  // sendReply(comment_id){
  //   const text = this.replyToComment
  //   this.hs.postReply(this.post._id, comment_id, text).subscribe((res: any)=>{
  //     console.log(res)
  //     window.location.reload();
  //   })
  // }
}
