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
// import * as Base64UploadAdapter from '@ckeditor/ckeditor5-upload'


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
  // editable: ElementRef;
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
  // config: any = {
  //   toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
  // }
  public config: any = {
    placeholder: 'Description',
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
  showResponse(id){
    console.log(event)
  }

  // ngAfterViewInit(): void {
  //   this.editor = new MediumEditor(this.editable.nativeElement)

  //   $('.editable').mediumInsert({
  //     editor: null, // (MediumEditor) Instance of MediumEditor
  //     enabled: true, // (boolean) If the plugin is enabled
  //     addons: { // (object) Addons configuration
  //         images: { // (object) Image addon configuration
  //             label: '<span class="fa fa-camera"></span>', // (string) A label for an image addon
  //             uploadScript: null, // DEPRECATED: Use fileUploadOptions instead
  //             deleteScript: 'delete.php', // (string) A relative path to a delete script
  //             deleteMethod: 'POST',
  //             fileDeleteOptions: {}, // (object) extra parameters send on the delete ajax request, see http://api.jquery.com/jquery.ajax/
  //             preview: true, // (boolean) Show an image before it is uploaded (only in browsers that support this feature)
  //             captions: true, // (boolean) Enable captions
  //             captionPlaceholder: 'Type caption for image (optional)', // (string) Caption placeholder
  //             autoGrid: 3, // (integer) Min number of images that automatically form a grid
  //             formData: {}, // DEPRECATED: Use fileUploadOptions instead
  //             fileUploadOptions: { // (object) File upload configuration. See https://github.com/blueimp/jQuery-File-Upload/wiki/Options
  //               paramName: 'image',
  //               type: 'POST',
  //           //     send: function (e, data) {
  //           //       console.log(data)
  //           //       if (data.files.length > 10) {
  //           //           return false;
  //           //       }
  //           //   },
  //           //   done: function (e, data) {
  //           //     // data.result
  //           //     console.log(data)
  //           //     // data.textStatus;
  //           //     // data.jqXHR;
  //           // },
  //               // send: function(e, data) {
  //               //   // logic before sending to server 
  //               //   // console.log(data) 
  //               //   // console.log(data.files[0])
  //               //   console.log(data) 
  //               //   let file = data.files[0]
  //               //   // data.formData = {'image': file}
                  
  //               // },
  //               // done: function(e, data){
  //               //   console.log(data.result)
  //               // },
  //                 url: 'http://localhost:5000/api/media', // (string) A relative path to an upload script
  //                 acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i // (regexp) Regexp of accepted file types
  //             },
  //             styles: { // (object) Available image styles configuration
  //                 wide: { // (object) Image style configuration. Key is used as a class name added to an image, when the style is selected (.medium-insert-images-wide)
  //                     label: '<span class="fa fa-align-justify"></span>', // (string) A label for a style
  //                     added: function ($el) {}, // (function) Callback function called after the style was selected. A parameter $el is a current active paragraph (.medium-insert-active)
  //                     removed: function ($el) {} // (function) Callback function called after a different style was selected and this one was removed. A parameter $el is a current active paragraph (.medium-insert-active)
  //                 },
  //                 left: {
  //                     label: '<span class="fa fa-align-left"></span>'
  //                 },
  //                 right: {
  //                     label: '<span class="fa fa-align-right"></span>'
  //                 },
  //                 grid: {
  //                     label: '<span class="fa fa-th"></span>'
  //                 }
  //             },
  //             actions: { // (object) Actions for an optional second toolbar
  //                 remove: { // (object) Remove action configuration
  //                     label: '<span class="fa fa-times"></span>', // (string) Label for an action
  //                     clicked: function ($el) { // (function) Callback function called when an action is selected
  //                         var $event = $.Event('keydown');
                          
  //                         $event.which = 8;
  //                         $(document).trigger($event);   
  //                     }
  //                 }
  //             },
  //             messages: {
  //                 acceptFileTypesError: 'This file is not in a supported format: ',
  //                 maxFileSizeError: 'This file is too big: '
  //             },
  //             uploadCompleted: function ($el, data) {}, // (function) Callback function called when upload is completed
  //             uploadFailed: function (uploadErrors, data) {} // (function) Callback function called when upload failed
  //         },
  //         embeds: { // (object) Embeds addon configuration
  //             label: '<span class="fa fa-youtube-square"></span>', // (string) A label for an embeds addon
  //             placeholder: 'Paste a YouTube, Vimeo, Facebook, Twitter or Instagram link and press Enter', // (string) Placeholder displayed when entering URL to embed
  //             captions: true, // (boolean) Enable captions
  //             captionPlaceholder: 'Type caption (optional)', // (string) Caption placeholder
  //             oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1', // (string/null) URL to oEmbed proxy endpoint, such as Iframely, Embedly or your own. You are welcome to use "http://medium.iframe.ly/api/oembed?iframe=1" for your dev and testing needs, courtesy of Iframely. *Null* will make the plugin use pre-defined set of embed rules without making server calls.
  //             styles: { // (object) Available embeds styles configuration
  //                 wide: { // (object) Embed style configuration. Key is used as a class name added to an embed, when the style is selected (.medium-insert-embeds-wide)
  //                     label: '<span class="fa fa-align-justify"></span>', // (string) A label for a style
  //                     added: function ($el) {}, // (function) Callback function called after the style was selected. A parameter $el is a current active paragraph (.medium-insert-active)
  //                     removed: function ($el) {} // (function) Callback function called after a different style was selected and this one was removed. A parameter $el is a current active paragraph (.medium-insert-active)
  //                 },
  //                 left: {
  //                     label: '<span class="fa fa-align-left"></span>'
  //                 },
  //                 right: {
  //                     label: '<span class="fa fa-align-right"></span>'
  //                 }
  //             },
  //             actions: { // (object) Actions for an optional second toolbar
  //                 remove: { // (object) Remove action configuration
  //                     label: '<span class="fa fa-times"></span>', // (string) Label for an action
  //                     clicked: function ($el) { // (function) Callback function called when an action is selected
  //                         var $event = $.Event('keydown');
                          
  //                         $event.which = 8;
  //                         $(document).trigger($event);   
  //                     }
  //                 }
  //             }
  //         }
  //     }
  // });

  // }
  submit(event){
    console.log(event.target.files[0])
    this.selectedFilr = event.target.files[0]
    const newupload = new FormData()
    newupload.append('image', this.selectedFilr, this.selectedFilr.name)
    this.http.post('http://localhost:5000/api/media', newupload).subscribe(data=>{
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
  showBody() {
    const content: posts = {
      title: 'A test title',
      content: this.editable.nativeElement.innerHTML,
      meta: {
        tags: this.selectedtags,
        mediaIds: ''
      }
    }
    console.log(content)
    // this.hs.createPost(content).subscribe((data: any) => {
    //   console.log(data)
    //   if (data) {
    //     this.router.navigate(['/posts'])
    //     // this.loading = false
    //   }
    // })
    // console.log(this.editable.nativeElement.innerHTML)
    // console.log(this.selectedtags)
  }
  onSubmit() {
    // this.loading = true;
    if (this.newPost.invalid) {
      this.loading = false;
      return
    }
    const body = this.newPost.value.content;
    const author = this.newPost.value.author;
    const title = this.newPost.value.title
    const date = new Date()
    console.log(this.newPost.value)
    this.hs.createPost(this.newPost.value).subscribe((data: any) => {
      console.log(data)
      if (data) {
        this.router.navigate(['/posts'])
        this.loading = false
      }
    })
  }
  submission() {
    console.log('created')
  }
}


// const BUTTONS = [
//   'bold'
//   ,'italic'
//   ,'underline'
//   ,'subscript'
//   ,'superscript'
//   ,'anchor'
//   ,'quote'
//   ,'pre'
//   ,'orderedlist'
//   ,'unorderedlist'
//   ,'indent' 
//   ,'justifyLeft'
//   ,'justifyCenter'
//   ,'justifyRight'
//   ,'justifyFull'
//   ,'h1'
//   ,'h2'
//   ,'h3'
//   ,'h4'
//   ,'h5'
//   ,'h6'
//   ]

const BUTTONS = [
  'bold',
  'italic',
  {
    name: 'h1',
    action: 'append-h2',
    aria: 'header type 1',
    tagNames: ['h2'],
    contentDefault: '<b>H1</b>',
    classList: ['custom-class-h1'],
    attrs: {
      'data-custom-attr': 'attr-value-h1'
    }
  },
  {
    name: 'h2',
    action: 'append-h3',
    aria: 'header type 2',
    tagNames: ['h3'],
    contentDefault: '<b>H2</b>',
    classList: ['custom-class-h2'],
    attrs: {
      'data-custom-attr': 'attr-value-h2'
    }
  },
  'justifyCenter',
  'quote',
  'anchor'
]