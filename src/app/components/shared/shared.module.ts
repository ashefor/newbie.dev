import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
// import { DropDownDirective } from './dropdown.directive';
import { DropDownDirective } from './drop-down.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    DropDownDirective,
    // DropDownDirective
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
