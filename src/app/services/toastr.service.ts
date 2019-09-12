import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ToasterNotificationService {

    constructor(public toastr: ToastrService) { }

    successToastr(message: string, title?: string){
        this.toastr.success(message, title)
    }
    warningToastr(message: string, title?: string){
        this.toastr.warning(message, title)
    }
    errorToastr(mesg: string, title?: string){
        this.toastr.error(mesg, title)
    }
}