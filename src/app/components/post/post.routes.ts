import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatComponent } from './creat/creat.component';
import { ViewpostComponent } from './viewpost/viewpost.component';
import { EditComponent } from './edit/edit.component';

export const postRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'create', component: CreatComponent},
    {path: ':id', component: ViewpostComponent},
    {path: ':id/edit', component: EditComponent},
]