import { HomeService } from './../../services/home.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {
  post = {}
  constructor(private route: ActivatedRoute, private hs: HomeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
        console.log(params)
        this.hs.viewOnePost(params.id).subscribe((res:any)=>{
          // console.log(res)
          this.post = res;
          console.log(this.post)
        })
    })
  }
 
}
