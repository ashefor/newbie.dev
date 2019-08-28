import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IComments, posts, IReplies } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/home.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  @Input() comments: IComments[];
  @Input() postId;
  post: posts;
  newCommentId;
  editCommentId;
  commentId;
  commentbody;
  constructor(private ps: PostService,
    private ds: DataService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.ds.currentMessage.subscribe(res => this.commentbody = res)
    this.newCommentId = null;
  }

  showReplyComment(comment_id) {
    this.newCommentId = this.comments.find(x => x.id = comment_id).id
  }

  showEditComment(comment_id) {
    this.ps.getSingleCommentForUpdate(this.postId, comment_id).subscribe((data: any) => {
      if (data) {
        this.editCommentId = comment_id;
        this.ds.sendMessage(data.body)
      }
    })
  }

  editComment(editedcomment: IComments) {
    this.ps.updateThisComment(this.postId, this.editCommentId, editedcomment.body).subscribe((data: any) => {
      if (data) {
        this.ds.sendNewPost(data)
        this.cancelEditComment()
      }
    })
  }
  cancelAddReply() {
    this.newCommentId = null;
  }
  cancelEditComment() {
    this.editCommentId = null;
  }

  replyComment(reply: IReplies) {
    this.ps.postReply(this.postId, this.newCommentId, reply.text).subscribe((data: any) => {
      if (data) {
        console.log(data)
        this.ds.sendNewPost(data)
        this.cancelAddReply()
      }
    })
  }

  likeComment(comment_id){
    console.log(this.postId, comment_id)
    this.ps.likeThisComment(this.postId, comment_id).subscribe((data:any)=>{
      if(data){
        console.log(data)
        this.ds.sendNewPost(data)
      }
    })
  }

  deleteThisComment(comment_id){
    if(confirm('really delete this comment?')){
      this.ps.deleteComment(this.postId, comment_id).subscribe((resp: any)=>{
        console.log(resp)
        this.ds.sendNewPost(resp)
      })
    }
  }
}
