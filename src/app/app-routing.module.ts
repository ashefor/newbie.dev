import { CreatComponent } from './components/creat/creat.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ViewpostComponent } from './components/viewpost/viewpost.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'create', component: CreatComponent},
  {path: ':id', component: ViewpostComponent},
  {path: ':id/edit', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
