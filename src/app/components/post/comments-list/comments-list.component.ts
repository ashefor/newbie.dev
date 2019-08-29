import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ViewChildren, QueryList, Renderer } from '@angular/core';
import { IComments, posts, IReplies } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/home.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToasterNotificationService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  @Input() comments: IComments[];
  @Input() postId;
  // @ViewChild('dropdown') dropDown: ElementRef
  @ViewChildren('dropdown') dropDown: QueryList<any>
  post: posts;
  newCommentId;
  editCommentId;
  commentId;
  commentbody;
  hasLikedThis;
  hasLikedThis2;
  commentDropDownId;
  testId;
  dropDownIds = [];
  open;
  showDrop = false;
  constructor(private ps: PostService,
    private ds: DataService,
    private route: ActivatedRoute,
    private toastr: ToasterNotificationService,
    private render: Renderer) { }

  ngOnInit() {
    this.ds.currentMessage.subscribe(res => this.commentbody = res)
    this.newCommentId = null;
    this.comments;
    this.open = false;
  }

  ngAfterViewInit() {
    this.dropDown.forEach(value => {
      const id = value.nativeElement.attributes['id']
      // console.log((value.nativeElement.attributes.id.nodeValue))
      this.dropDownIds.push(value.nativeElement.attributes.id.nodeValue)
      // console.log(this.dropDownIds)
    })
    // console.log(this.dropDown.toArray())

 }
  toggleDropdown(comment_id){
    
    this.testId = this.comments.find(val => val.id = comment_id).id
    this.showDrop = !this.showDrop
    // this.commentDropDownId = this.dropDown.find(ele =>
    //  ele.nativeElement.attributes.id.nodeValue == comment_id)
    //  console.log(this.commentDropDownId)
    //  this.commentDropDownId.nativeElement.classList.toggle('is-active')
    // let part = this.commentDropDownId.nativeElement;
    // // this.render.cl
    // if(comment_id == this.testId){
    //   this.render.setElementClass(part, 'is-active', true)
    // }
    // this.dropDown.forEach(value => {
    //   console.log((value.nativeElement.attributes.id.nodeValue))
    // })
    // this.dropDown.forEach(value => {
    //   // value.nativeElement.classList.toggle('is-active')
    //   if(this.commentDropDownId){
    //     console.log(value.nativeElement)
    //   }
    // })
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
      this.hasLikedThis = `rgba(33,150,243,.4)`;
      this.hasLikedThis2 = `rgba(33,150,243,.1)`;
        this.ds.sendNewPost(data)
      }
    })
  }

  deleteThisComment(comment_id){
    if(confirm('really delete this comment?')){
      this.ps.deleteComment(this.postId, comment_id).subscribe((resp: any)=>{
        this.ds.sendNewPost(resp)
        this.toastr.successToastr('Comment deleted successfully')

      })
    }
  }
}
