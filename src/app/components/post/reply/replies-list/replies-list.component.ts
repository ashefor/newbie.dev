import { Component, OnInit, Input } from '@angular/core';
import { IReplies } from 'src/app/model/post.model';

@Component({
  selector: 'app-replies-list',
  templateUrl: './replies-list.component.html',
  styleUrls: ['./replies-list.component.css']
})
export class RepliesListComponent implements OnInit {
  @Input() replies: IReplies[]

  constructor() { }

  ngOnInit() {
  }

}
