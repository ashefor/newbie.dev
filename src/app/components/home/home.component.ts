import { HomeService } from './../../services/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private hs: HomeService) { }

  ngOnInit() {
    this.hs.getAllPosts().subscribe((data:any) =>{
      console.log(data)
    })
  }

}
