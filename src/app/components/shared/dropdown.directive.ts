import { Directive, HostBinding, ElementRef, Renderer, HostListener } from '@angular/core';

@Directive({ selector: '[appDropdown]' })
export class DropDownDirective {
    @HostBinding('class.is-active')  isOpen = false
    constructor(private el: ElementRef, private renderer: Renderer) { }

    @HostListener('click') toggleOpen(){
        let part = this.el.nativeElement.querySelector('.dropdown')
        this.renderer.setElementClass(part, 'is-active', this.isOpen= !this.isOpen)
        // this.isOpen =! this.isOpen
        alert('something')
      }
}