import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('menu') menuBtn: ElementRef<HTMLElement>
  @ViewChild('navbarMenu') navMenu: ElementRef<HTMLElement>

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

 toggleMenu(event: Event){
    this.menuBtn.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active')
 }
}
