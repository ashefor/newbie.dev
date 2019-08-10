import { HomeService } from './../../services/home.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { posts } from 'src/app/model/post.model';



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
  public Editor = BalloonEditor;
  config: any = {
    placeholder: 'Your placeholder'
  }
  nooflikes;
  hasLiked;
  alltags;
  showalltags:boolean
  
  constructor(private route: ActivatedRoute, private hs: HomeService, private router: Router) { }
  result;
  periods;
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params)
      this.hs.viewOnePost(params.id).subscribe((res: any) => {
        if (res) {
          this.showpost = true;
          this.post = res;
          // console.log(this.post)
          this.periods = res.body
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
 

  showTags(tags){
    if(tags.length > 0){
      this.showalltags = true;
    }
    else{
      this.showalltags = false
    }
  }
  showMenu() {
    document.getElementById('burger').classList.toggle("is-active")
    document.getElementById('navbarBasicExample').classList.toggle('is-active')
  }

  toggleComment(){
    this.addComment =! this.addComment
  }

  readingTime(body) {
    const wordsPerMinute = 200;
    const noOfWords = body.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    this.result = Math.ceil(minutes)
  }

  likePost(id){
    if(!this.hasLiked){
      this.hasLiked = true;
      this.nooflikes +=1
      this.hs.likeThisPost(id).subscribe((data:any)=>{
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

  deleteThisPost(poste: posts){
   if(confirm(`Really delete ${poste.title}?`)){
    this.hs.deletePost(poste._id).subscribe((data: any)=>{
      if(data){
        this.router.navigate(['/home'])
      }
      (error: any) => {
        console.log(error)
      }
    })
   }
  }

}
