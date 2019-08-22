import { Injectable } from '@angular/core';
import { IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: IUser;

  constructor() { }

  loginUser(username: string, password: string){
    this.currentUser = {
      id: 1,
      userName: 'shredder',
      firstName: 'Michael',
      lastName: 'Ashefor'
    }
  }

  updateUser(firstName: string, lastName: string){
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }

  isAuthenticated(){
    return !!this.currentUser
  }
}
