import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { CreatComponent } from './components/creat/creat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewpostComponent } from './components/viewpost/viewpost.component';
import { EditComponent } from './components/edit/edit.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {NgPipesModule} from 'ngx-pipes';
import { DateAgoPipe } from './pipes/date-ago.pipe';
// import { MyUploadAdapter } from './imgUploader';

// import { MyUploadAdapter } from

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreatComponent,
    ViewpostComponent,
    EditComponent,
    DateAgoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgPipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
