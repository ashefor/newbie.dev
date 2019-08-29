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
  @ViewChild('dropdown') dropDowns: CommentsListComponent
  @ViewChildren('dropdown') dropDown: QueryList<any>;
  @ViewChildren('LikedComment') likedComment: QueryList<any>
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
  dropdown;
  likedId;
  hasLiked;
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


  toggleDropdown(comment_id) {
    this.dropDown.forEach(dropdown => {
      if (dropdown.nativeElement.attributes.id.nodeValue == comment_id) {
        dropdown.nativeElement.classList.toggle('is-active');
      } else {
        dropdown.nativeElement.classList.remove('is-active')
      }
    });
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

  likeComment(comment_id) {
    this.likedComment.forEach(commentLiked =>{
      if(commentLiked.nativeElement.attributes.id.nodeValue == comment_id){
        commentLiked.nativeElement.classList.add('hasLiked')
        this.ps.likeThisComment(this.postId, comment_id).subscribe((data: any) => {
          if (data) {
            this.ds.sendNewPost(data)
          }
        })
      }
    })
  }

  deleteThisComment(comment_id) {
    if (confirm('really delete this comment?')) {
      this.ps.deleteComment(this.postId, comment_id).subscribe((resp: any) => {
        this.ds.sendNewPost(resp)
        this.toastr.successToastr('Comment deleted successfully')

      })
    }
  }
}
