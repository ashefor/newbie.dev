import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HomeService } from './../../services/home.service';
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
  editedcomemnt;
  public Editor = BalloonEditor;
  public onChange({ editor }: ChangeEvent) {
    // const data = editor.getData();
    this.editedcomemnt = editor.getData()
  }
  public editorData;
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
  loadid;
  commentForm: FormGroup;


  constructor(private route: ActivatedRoute, 
    private hs: HomeService, 
    private router: Router, 
    private fb: FormBuilder, 
    private location: Location) { }
  
  ngOnInit() {
    this.commentForm = this.fb.group({
      body: ['']
    })

    this.route.params.subscribe((params: Params) => {
      console.log(params)
      this.postId = params.id;
      this.hs.viewOnePost(params.id).subscribe((res: any) => {
        if (res) {
          this.showpost = true;
          this.post = res;
          this.periods = res.body
          this.allcomments = res.comments
          // console.log(this.allcomments)
          this.nooflikes = res.meta.likes;
          // console.log(this.nooflikes)
          // console.log(res.meta.tags)
          this.alltags = res.meta.tags
          this.readingTime(res.body)
          this.showTags(res.meta.tags)
        }
      })
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
    this.hs.getSingleCommentForUpdate(this.postId, comment_id).subscribe((data: any) => {
      if (data) {
        this.loadid = data.comment._id;
        this.editorData = data.comment.body;
      }
    })
  }
  cancelComment(arg){
    this.loadid = arg
    console.log(this.editedcomemnt)
  }
  updateComment(comment_id){
    this.hs.updateThisComment(this.postId, comment_id, this.editedcomemnt).subscribe((data: any)=>{
      console.log(data)
      if(data){
        this.router.navigate([`/${this.postId}`])
        this.loadid = null;
        this.cancelComment(this.loadid)
        location.reload()
      }
    })
  }
}
