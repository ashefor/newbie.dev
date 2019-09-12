import { posts } from '../../../model/post.model';
import { PostService } from '../../../services/home.service';
import { Component, OnInit, ViewChildren, ElementRef, QueryList, ViewChild, AfterViewInit } from '@angular/core';
// import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  // public Editor = BalloonEditor
  allposts = [];
  posts: posts[]
  nodata;
  result = [];
  showTags = false;
  alltags = [];
  @ViewChildren('postBody') postBodyy: QueryList<any>
  newpostbod = []
  constructor(private hs: PostService) { }

  ngOnInit() {
    this.hs.getAllPosts().subscribe((data: any) => {
      if (data) {
        console.log(data)
        this.posts = data;
        for (let obj of data) {
          this.readingTime(obj.content)
          this.alltags.push(obj.meta.tags);
        }
      }
    })
  }
  ngAfterViewInit() {
    setTimeout(()=>{
      this.viewBody('...')
    }, 1000)
  }
  viewBody(after) {
    this.postBodyy.forEach(body => {
      const limit = 50;
      let content = body.nativeElement.innerHTML.trim()
      content = content.split(' ')
      if (content.length <= limit) {
        this.newpostbod.push(body.nativeElement.innerHTML)
        return content
      } else {
        content = content.slice(0, limit);
        content = content.join(' ') + (after ? after : '');
      }
      body.nativeElement.innerHTML = content;
      this.newpostbod.push(body.nativeElement.innerHTML)
    })
  }
  readingTime(body) {
    const wordsPerMinute = 200;
    const noOfWords = body.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    this.result.push(Math.ceil(minutes));
  }
  truncateText(body, after) {
    const limit = 10;
    let content = body.trim()
    content = content.split(' ').slice(0, limit);

    content = content.join(' ') + (after ? after : '');

    body.textContent = content
  }
}
