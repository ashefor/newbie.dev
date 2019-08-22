import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { postRoutes } from './post.routes';
import { EditComponent } from './edit/edit.component';
import { ViewpostComponent } from './viewpost/viewpost.component';
import { HomeComponent } from './home/home.component';
import { CreatComponent } from './creat/creat.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DateAgoPipe } from 'src/app/pipes/date-ago.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EditComponent,
    CreatComponent,
    HomeComponent,
    ViewpostComponent,
    DateAgoPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CKEditorModule,
    ReactiveFormsModule,
    RouterModule.forChild(postRoutes)
  ]
})
export class PostModule { }
