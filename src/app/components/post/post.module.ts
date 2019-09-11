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
import { SharedModule } from '../shared/shared.module';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { RepliesListComponent } from './reply/replies-list/replies-list.component';
import { ReplyCommentComponent } from './reply/reply-comment/reply-comment.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { TimeAgoPipe } from 'src/app/pipes/timeago.pipe';
import { EditReplyComponent } from './reply/edit-reply/edit-reply.component';
import { SampleComponent } from './sample/sample.component';

@NgModule({
  declarations: [
    EditComponent,
    CreatComponent,
    HomeComponent,
    ViewpostComponent,
    TimeAgoPipe,
    CommentsListComponent,
    CreateCommentComponent,
    RepliesListComponent,
    ReplyCommentComponent,
    EditCommentComponent,
    EditReplyComponent,
    SampleComponent,
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
