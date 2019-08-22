import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
      username: [],
      password: []
    })
  }

  onSubmit(formValue){
    this.auth.loginUser(formValue.username, formValue.password);
    this.router.navigate(['/posts'])
  }

  cancel(){
    this.router.navigate(['/posts'])
  }

}
