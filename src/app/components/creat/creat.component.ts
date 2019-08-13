import { HomeService } from './../../services/home.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
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
  loading;
  alltags = ['general', 'frontend', 'backend', 'javascript', 'framework', 'typescript', 'design', 'vue', 'react', 'angular'];
  selectedtags = []
  constructor(private fb: FormBuilder, private hs: HomeService, private router: Router) { }
  // config: any = {
  //   toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
  // }
  public config: any = {
    placeholder: 'Description'
  }
  ngOnInit() {
    this.newPost = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      meta: this.fb.group({
        // tags: this.fb.array([this.selectedtags])
        tags: [this.selectedtags]
      })
    })
  }

  showMenu() {
    document.getElementById('burger').classList.toggle("is-active")
    document.getElementById('navbarBasicExample').classList.toggle('is-active')
  }
  // autogrow(event) {
  //   event.target.style.height = "auto";
  //   if (event.target.scrollHeight <= 300) {
  //     event.target.style.height = "300px"
  //   } else {
  //     event.target.style.height = event.target.scrollHeight + "px"
  //   }
  // }
  // growAuthTitle(event) {
  //   event.target.style.height = "auto";
  //   if (event.target.scrollHeight <= 68) {
  //     event.target.style.height = "60px"
  //   } else {
  //     event.target.style.height = event.target.scrollHeight + "px"
  //   }
  // }

  addtag(event){
    const { target } = event;
    const id: any = (target as HTMLInputElement).getAttribute('data-value');
    if((target as HTMLInputElement).checked){
      // this.tags.push()
      this.selectedtags.push(id)
      this.newPost.patchValue(this.selectedtags.values)
      // console.log(this.selectedtags)
    }else {
      const index = this.selectedtags.indexOf(id);
      if (index > -1) {
        this.selectedtags.splice(index, 1);
      }
      // console.log(this.selectedtags)
    }
  }
  get body() {
    return this.newPost.get('body')
  }
  get title() {
    return this.newPost.get('title')
  }

  onSubmit() {
    this.loading = true;
    if (this.newPost.invalid) {
      this.loading = false;
      return
    }
    const body = this.newPost.value.body;
    const author = this.newPost.value.author;
    const title = this.newPost.value.title
    const date = new Date()
    // console.log(this.newPost.value)
    this.hs.createPost(this.newPost.value).subscribe((data: any) => {
      console.log(data)
      if(data){
        this.router.navigate(['/home'])
        this.loading = false
      }
    })
  }
  submission() {
    console.log('created')
  }
}
