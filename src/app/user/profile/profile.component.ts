import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup
  // private firstName: FormControl;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    // this.firstName = new FormControl(this.auth.currentUser? this.auth.currentUser.firstName : '', Validators.required),
    this.profileForm = this.fb.group({
      firstName: [this.auth.currentUser? this.auth.currentUser.firstName : '', Validators.required],
      lastName: [this.auth.currentUser? this.auth.currentUser.lastName : '', Validators.required]
    })
  }

  saveProfile(formvalue){
    if(this.profileForm.valid){
      this.auth.updateUser(formvalue.firstName, formvalue.lastName);
    this.router.navigate(['/posts'])
    }
  }
  
  cancel(){
    this.router.navigate(['/posts'])
  }

  validateFirstName(){
    return this.profileForm.get('firstName').valid || this.profileForm.get('firstName').untouched
  }

  validateLastName(){
    return this.profileForm.get('lastName').valid || this.profileForm.get('lastName').untouched
  }
}
