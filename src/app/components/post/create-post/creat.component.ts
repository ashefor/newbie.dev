import { PostService } from '../../../services/home.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';
import { CloudinaryImageUploadAdapter } from 'ckeditor-cloudinary-uploader-adapter';
import { MyUploadAdapter } from 'src/app/imgUploader';
import { Formatter } from 'src/app/text-formatter';
import { posts } from 'src/app/model/post.model';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';


declare var MediumEditor: any;
declare var $: any;

@Component({
  selector: 'app-creat',
  templateUrl: './creat.component.html',
  styleUrls: ['./creat.component.css']
})


export class CreatComponent implements OnInit {

  @ViewChild('sample') sample: ElementRef<HTMLElement>;
  public editor: any;
  @ViewChild('editable') editable: ElementRef<HTMLInputElement>
  public Editor = ClassicEditor;
  selectedFilr;
  newPost: FormGroup
  form: FormGroup
  loading;
  public _metaid: any[] = []
  alltags = ['general', 'frontend', 'backend', 'javascript', 'framework', 'typescript', 'design', 'vue', 'react', 'angular'];
  selectedtags = []
  constructor(private fb: FormBuilder,
    private hs: PostService,
    private router: Router,
    public _formatter: Formatter,
    private http: HttpClient) { }
  public config: any = {
    placeholder: 'Description',
    toolbar: ['heading', 'bold', 'italic', 'link', 'imageUpload', 'bulletedList', 'numberedList', 'blockQuote', 'mediaEmbed'],
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h3', title: 'Heading1' },
        { model: 'heading2', view: 'h4', title: 'Heading2' }
      ]
    },
    extraPlugins: [this.MyCustomUploadAdapterPlugin],
  }
  ngOnInit() {
    this.form = this.fb.group({
      in: ['']
    })
    this.newPost = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      meta: this.fb.group({
        // tags: this.fb.array([this.selectedtags])
        tags: [this.selectedtags],
        mediaIds: [this._metaid]
      })
    })
  }
  showResponse(id) {
    console.log(event)
  }

  submit(event) {
    console.log(event.target.files[0])
    this.selectedFilr = event.target.files[0]
    const newupload = new FormData()
    newupload.append('image', this.selectedFilr, this.selectedFilr.name)
    this.http.post('http://localhost:5000/api/media', newupload).subscribe(data => {
      console.log(data)
    })
  }

  // imagePluginFactory(editor) {
  //   editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
  //     return new CloudinaryImageUploadAdapter( loader, 'devnewbie', 'gji29xaj', 
  //     [ 160, 500, 1000, 1052 ]);
  //   };
  // }

  MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }

  addtag(event) {
    const { target } = event;
    const id: any = (target as HTMLInputElement).getAttribute('data-value');
    if ((target as HTMLInputElement).checked) {
      // this.tags.push()
      this.selectedtags.push(id)
      this.newPost.patchValue(this.selectedtags.values)
      // console.log(this.selectedtags)
    } else {
      const index = this.selectedtags.indexOf(id);
      if (index > -1) {
        this.selectedtags.splice(index, 1);
      }
      // console.log(this.selectedtags)
    }
  }
  get body() {
    return this.newPost.get('content')
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
    this.hs.createPost(this.newPost.value).subscribe((data: any) => {
      console.log(data)
      if (data) {
        this.router.navigate(['/posts'])
        this.loading = false
      }
    })
  }
}