import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { ProfileComponent } from './profile/profile.component';

export const userRoutes: Routes = [
    // {path: '', children: [
    //     {path: '', redirectTo: 'login', pathMatch: 'full'},
    //     {path: 'login', component: LoginComponent}
    // ]},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent}
    
]