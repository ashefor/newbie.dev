import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IComments, posts } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/home.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  @Input() comments:IComments[];
  post: posts;
  index;
  constructor(private ps: PostService) { }

  ngOnInit() {
    console.log(this.comments)
  }

  showReplyComment(comment_id){
    console.log(comment_id)
    this.index = this.comments.find(x => x.id = comment_id).id
    console.log(this.index)
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
}
