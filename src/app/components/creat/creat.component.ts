import { HomeService } from './../../services/home.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creat',
  templateUrl: './creat.component.html',
  styleUrls: ['./creat.component.css']
})


export class CreatComponent implements OnInit {
  public Editor = ClassicEditor;
  editable: ElementRef;
  newPost: FormGroup
  
  constructor(private fb: FormBuilder, private hs: HomeService, private router: Router) { }
  // config: any = {
  //   toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
  // }

  ngOnInit() {
    this.newPost = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    })
  }

  showMenu() {
    document.getElementById('burger').classList.toggle("is-active")
    document.getElementById('navbarBasicExample').classList.toggle('is-active')
  }
  autogrow(event) {
    event.target.style.height = "auto";
    if (event.target.scrollHeight <= 300) {
      event.target.style.height = "300px"
    } else {
      event.target.style.height = event.target.scrollHeight + "px"
    }
  }
  growAuthTitle(event) {
    event.target.style.height = "auto";
    if (event.target.scrollHeight <= 68) {
      event.target.style.height = "60px"
    } else {
      event.target.style.height = event.target.scrollHeight + "px"
    }
  }
  get body() {
    return this.newPost.get('body')
  }
  get title() {
    return this.newPost.get('title')
  }
  get author() {
    return this.newPost.get('author')
  }

  onSubmit() {
    if (this.newPost.invalid) {
      return
    }
    const body = this.newPost.value.body;
    const author = this.newPost.value.author;
    const title = this.newPost.value.title
    const date = new Date()
    this.hs.createPost(this.newPost.value).subscribe((data: any) => {
      console.log(data)
      if(data){
        this.router.navigate(['/home'])
      }
    })
  }
  submission() {
    console.log('created')
  }
}
