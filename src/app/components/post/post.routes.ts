import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatComponent } from './create-post/creat.component';
import { ViewpostComponent } from './viewpost/viewpost.component';
import { EditComponent } from './edit-post/edit.component';
import { SampleComponent } from './sample/sample.component';

export const postRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'create', component: CreatComponent},
    {path: ':id', component: ViewpostComponent},
    {path: ':id/edit', component: EditComponent},
    {path: 'sample', component: SampleComponent}
]