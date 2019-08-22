import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [LoginComponent, ErrorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ]
})
export class UserModule { }
