import { posts } from './../../model/post.model';
import { HomeService } from './../../services/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allposts = [];
  posts: posts[];
  nodata;
  // wordsPerMinute =  200;
  result = []
  constructor(private hs: HomeService) { }

  ngOnInit() {
    this.hs.getAllPosts().subscribe((data:any) =>{
     if(data){
      console.log(data)
      this.posts = data;
      for(let y of data){
        this.readingTime(y.body)
      }
     }
    })
  }
  showMenu() {
    document.getElementById('burger').classList.toggle("is-active")
    document.getElementById('navbarBasicExample').classList.toggle('is-active')
  }

  readingTime(body) {
    const wordsPerMinute = 200;
    const noOfWords = body.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    this.result.push(Math.ceil(minutes));
  }

  showid(id){
    // console.log(id)
  }
}
