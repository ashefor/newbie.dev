import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(formValue){
    this.auth.loginUser(formValue.username, formValue.password);
    this.router.navigate(['/posts'])
  }

  cancel(){
    this.router.navigate(['/posts'])
  }

  validateUserName(){
    return this.loginForm.get('username').valid || this.loginForm.get('username').untouched
  }

  validatePassword(){
    return this.loginForm.get('password').valid || this.loginForm.get('password').untouched
  }

}
