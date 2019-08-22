import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';
import { ErrorComponent } from './error/error.component';
import { SharedModule } from '../components/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    LoginComponent, 
    ErrorComponent, ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes)
  ]
})
export class UserModule { }
