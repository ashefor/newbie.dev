import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { postRoutes } from './post.routes';
import { EditComponent } from './edit-post/edit.component';
import { ViewpostComponent } from './viewpost/viewpost.component';
import { HomeComponent } from './home/home.component';
import { CreatComponent } from './create-post/creat.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DateAgoPipe } from 'src/app/pipes/date-ago.pipe';
import { SharedModule } from '../shared/shared.module';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { RepliesListComponent } from './reply/replies-list/replies-list.component';
import { ReplyCommentComponent } from './reply/reply-comment/reply-comment.component';

@NgModule({
  declarations: [
    EditComponent,
    CreatComponent,
    HomeComponent,
    ViewpostComponent,
    DateAgoPipe,
    CommentsListComponent,
    CreateCommentComponent,
    RepliesListComponent,
    ReplyCommentComponent,
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
