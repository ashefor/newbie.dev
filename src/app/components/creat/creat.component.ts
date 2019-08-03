import { HomeService } from './../../services/home.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-creat',
  templateUrl: './creat.component.html',
  styleUrls: ['./creat.component.css']
})
export class CreatComponent implements OnInit {

  constructor(private fb: FormBuilder, private hs: HomeService) { }

  ngOnInit() {

  }
  // newPost = this.fb.group({
  //   title: ['', Validators.compose([Validators.required])],
  //   body: ['', Validators.compose([Validators.required])],
  //   author: ['', Validators.compose([Validators.required])],
  // })

  newPost =  new FormGroup({
    title: new FormControl(null, [
      Validators.required,
    ]),
    body: new FormControl(null, [
      Validators.required,
    ]),
    author: new FormControl(null, [
      Validators.required,
    ]),
  })

  get body(){
    return this.newPost.get('body')
  }
  get title(){
    return this.newPost.get('title')
  }
  get author(){
    return this.newPost.get('author')
  }

  onSubmit(){
    if(this.newPost.invalid){
      return
    }
    const body = this.newPost.value.body;
    const author = this.newPost.value.author;
    const title = this.newPost.value.title
    const date = new Date()
    this.hs.createPost(title, author, body, date).subscribe((data: any)=>{
      console.log(data)
    })
  }
  submission(){
    console.log('created')
  }
}
