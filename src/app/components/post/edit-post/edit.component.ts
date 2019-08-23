import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PostService } from '../../../services/home.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public Editor = ClassicEditor;

  editpost = {}
  constructor(private route: ActivatedRoute, private hs: PostService, private fb: FormBuilder, private router: Router) { }
  id;
  updateform: FormGroup;
  ngOnInit() {
    this.updateform = this.fb.group({
      _id: [],
      title: [''],
      body: [''],
    })
    this.route.params.subscribe((params: Params)=>{
      console.log(params)
      this.id=params.id
      this.hs.editPost(params.id).subscribe((data: any)=>{
        console.log(data)
        this.editpost = data
        // console.log(data.body)
        this.updateform.patchValue(data)
      })
    })
    
  }
  

  updateFrm(){
   const body = this.updateform.value.body;
    const author = this.updateform.value.author;
    const title = this.updateform.value.title
    const update = new Date()
   this.hs.updatePost(this.updateform.value).subscribe((data:any)=>{
    //  console.log(data)
    if(data){
      this.router.navigate([`/posts/${this.id}`])
    }
   })
  }

}
