import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { PostService } from '../../../services/home.service';
import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { posts, IComments } from 'src/app/model/post.model';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { Location } from '@angular/common';





@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {
  post: posts;
  showpost;
  addComment;
  previewedcomment;
  allcomments = [];
  allreplies = [];
  editedcomemnt;
  replyToComment: string;
  editReply: string
  public Editor = BalloonEditor;
  public onChange({ editor }: ChangeEvent) {
    // const data = editor.getData();
    this.editedcomemnt = editor.getData()
  }
  public replyData({ editor }: ChangeEvent) {
    this.replyToComment = editor.getData();
  }
  public editedReply({ editor }: ChangeEvent) {
    this.editReply = editor.getData();
  }
  public editorData;
  public replyBody;
  public config: any = {
    placeholder: 'Add a comment'
  }
  nooflikes;
  hasLiked;
  alltags;
  showalltags: boolean;
  showcomment = false;
  result;
  periods;
  commentId;
  newCommentId;
  replyId;
  donots;
  commentForm: FormGroup;
  move = true;
  elementPosition: any;
  newposition: any;
  @ViewChild('leftSide') leftMenu: ElementRef<HTMLElement>;
  @ViewChild('postBody') postDetails: ElementRef<HTMLElement>;

  constructor(private route: ActivatedRoute, 
    private hs: PostService, 
    private router: Router, 
    private fb: FormBuilder, 
    private location: Location,
    public el: ElementRef<HTMLElement>) { }
    public innerWidth: any;
  
  ngOnInit() {
    this.commentForm = this.fb.group({
      body: ['']
    })
    this.hs.viewOnePost(this.route.snapshot.params['id']).subscribe((res: any) => {
      if (res) {
        this.showpost = true;
        this.post = res;
        console.log(this.post)
        this.periods = res.body
        this.allcomments = res.comments
        this.allreplies = res.comments.replies
        // console.log(this.allcomments)
        this.nooflikes = res.meta.likes;
        this.alltags = res.meta.tags
        this.readingTime(res.body)
        this.showTags(res.meta.tags)
      }
    })
  }

  @HostListener('window:scroll', ['$event'])
    handleScroll(){
      // const newpos = this.el.nativeElement.scrollTop
      // const h = this.postDetails.nativeElement.offsetTop
      // const t = this.postDetails.nativeElement.clientHeight
      const th = this.postDetails.nativeElement.scrollHeight
      // console.log(h,t,th)
      const scrollpos = window.pageYOffset;
      // console.log(scrollpos)
      // }
      if(scrollpos >= th){
          this.move = false
      }
      else{
        this.move = true;
      }
    }


  showTags(tags) {
    if (tags.length > 0) {
      this.showalltags = true;
    }
    else {
      this.showalltags = false
    }
  }

  toggleComment() {
    this.addComment = !this.addComment
  }

  readingTime(body) {
    const wordsPerMinute = 200;
    const noOfWords = body.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    this.result = Math.ceil(minutes)
  }

  likePost(id) {
    if (!this.hasLiked) {
      this.hasLiked = true;
      this.nooflikes += 1
      this.hs.likeThisPost(id).subscribe((data: any) => {
        alert('liked successfully')
      })
    }
    // else{
    //   this.hasLiked = false;
    //   this.nooflikes -=1
    //   console.log(this.nooflikes);
    //   this.hs.likeThisPost(id).subscribe((data:any)=>{
    //     console.log(data)
    //   })
    // }
  }
  likeComment(post_id, comment_id){
    console.log(post_id, comment_id)
    this.hs.likeThisComment(post_id, comment_id).subscribe((data:any)=>{
      if(data){
        console.log(data)
      }
    })
  }

  deleteThisPost(post: posts) {
    if (confirm(`Really delete ${post.title}?`)) {
      this.hs.deletePost(post._id).subscribe((data: any) => {
        if (data) {
          this.router.navigate(['/posts'])
        }
        (error: any) => {
          console.log(error)
        }
      })
    }
  }

  deleteThisComment(post: posts, comment){
    console.log(post._id, comment._id)
    if(confirm('really delete this comment?')){
      this.hs.deleteComment(post._id, comment._id).subscribe((resp: any)=>{
        console.log(resp)
      })
    }
  }

  saveNewComment(comment: IComments){
    this.hs.createComment(this.post._id, comment.body).subscribe((data: any)=>{
      if(data){
        let lastObject: IComments = data.comments.pop()
        this.post.comments.push(lastObject)
        this.addComment = false;
      }
    })
  }

  editComment(comment_id){
    if(!comment_id){
      console.log('nothing')
    }
    console.log(comment_id)
    this.hs.getSingleCommentForUpdate(this.post._id, comment_id).subscribe((data: any) => {
      if (data) {
        console.log(data)
        this.commentId = data._id;
        this.editorData = data.body;
        this.newCommentId = null;
      }
    })
  }
  cancelComment(arg){
    this.commentId = arg
  }
  cancelReply(arg){
    this.newCommentId = arg
  }
  cancelEditReply(){
    this.replyId = null;
  }
  updateComment(comment_id){
    let comment;
    if(this.editedcomemnt){
      comment = this.editedcomemnt
    }else{
      comment = this.editorData
    }
    this.hs.updateThisComment(this.post._id, comment_id, comment).subscribe((data: any)=>{
      console.log(data)
      if(data){
        // this.router.navigate([`/${this.post._id}`])
        this.commentId = null;
        this.cancelComment(this.commentId)
        location.reload()
      }
    })
  }

  showReplyComment(comment_id){
    this.donots =! this.donots
    this.hs.getSingleCommentForUpdate(this.post._id, comment_id).subscribe((dataa: any) => {
      if (dataa) {
        console.log(dataa)
        this.newCommentId = dataa._id;
        this.editorData = dataa.body;
        this.commentId = null;
      }
    })
  }
  sendReply(comment_id){
    const text = this.replyToComment
    this.hs.postReply(this.post._id, comment_id, text).subscribe((res: any)=>{
      console.log(res)
      window.location.reload();
    })
  }
 
  deleteThisReply(post: posts, comment, reply){
    console.log(post._id, comment._id, reply._id)
   if(confirm('really delete this reply?')){
    this.hs.deleteReply(post._id, comment._id, reply._id).subscribe((data:any)=>{
      if(data){
        console.log(data)
        window.location.reload()
      }
    })
   }
  }
  editThisReply(comment_id, reply_id){
    console.log(reply_id)
    this.hs.getReplyForUpdate(this.post._id, comment_id, reply_id).subscribe((data: any)=>{
      console.log(data)
      this.replyId = data.reply._id
      this.replyBody = data.reply.text
      console.log(data.reply)
    })
  }
  submitEditedReply(comment_id, reply_id){
    let text;
    // const text = this.editReply;
    // console.log(text)
    if(this.editReply){
      text = this.editReply
    }else{
      text = this.replyBody
    }
    console.log(text)
    this.hs.editReply(this.post._id, comment_id, reply_id, text).subscribe((data: any)=>{
      if(data){
        console.log(data)
        window.location.reload()
      }
    })
  }

}
