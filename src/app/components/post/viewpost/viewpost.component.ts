import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { PostService } from '../../../services/home.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { posts } from 'src/app/model/post.model';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { Location } from '@angular/common';





@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {
  post = {}
  poste: posts[]
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
  postId;
  commentId;
  newCommentId;
  replyId;
  donots;
  commentForm: FormGroup;


  constructor(private route: ActivatedRoute, 
    private hs: PostService, 
    private router: Router, 
    private fb: FormBuilder, 
    private location: Location) { }
  
  ngOnInit() {
    this.commentForm = this.fb.group({
      body: ['']
    })

    this.postId = this.route.snapshot.params['id'];
    // this.route.params.subscribe((params: Params) => {
    //   console.log(params)
    //   this.postId = params.id;
     
    // })
    this.hs.viewOnePost(this.route.snapshot.params['id']).subscribe((res: any) => {
      if (res) {
        console.log(res)
        this.showpost = true;
        this.post = res;
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

  showTags(tags) {
    if (tags.length > 0) {
      this.showalltags = true;
    }
    else {
      this.showalltags = false
    }
  }
  showMenu() {
    document.getElementById('burger').classList.toggle("is-active")
    document.getElementById('navbarBasicExample').classList.toggle('is-active')
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

  deleteThisPost(poste: posts) {
    if (confirm(`Really delete ${poste.title}?`)) {
      this.hs.deletePost(poste._id).subscribe((data: any) => {
        if (data) {
          this.router.navigate(['/home'])
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

  addThisComment(id) {
    const body = this.commentForm.value.body
    this.hs.createComment(id, body).subscribe((data: any) => {
      if (data) {
        this.commentForm.reset()
        location.reload()
        this.addComment = false;
      }
    })
  }

  editComment(comment_id){
    // this.newCommentId = null;
    if(!comment_id){
      console.log('nothing')
    }
    console.log(comment_id)
    this.hs.getSingleCommentForUpdate(this.postId, comment_id).subscribe((data: any) => {
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
    this.hs.updateThisComment(this.postId, comment_id, comment).subscribe((data: any)=>{
      console.log(data)
      if(data){
        // this.router.navigate([`/${this.postId}`])
        this.commentId = null;
        this.cancelComment(this.commentId)
        location.reload()
      }
    })
  }

  showReplyComment(comment_id){
    this.donots =! this.donots
    this.hs.getSingleCommentForUpdate(this.postId, comment_id).subscribe((dataa: any) => {
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
    this.hs.postReply(this.postId, comment_id, text).subscribe((res: any)=>{
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
    this.hs.getReplyForUpdate(this.postId, comment_id, reply_id).subscribe((data: any)=>{
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
    this.hs.editReply(this.postId, comment_id, reply_id, text).subscribe((data: any)=>{
      if(data){
        console.log(data)
        window.location.reload()
      }
    })
  }

}
