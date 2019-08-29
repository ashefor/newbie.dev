import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ToasterNotificationService {

    constructor(private toastr: ToastrService) { }

    successToastr(message: string, title?: string){
        this.toastr.success(message, title)
    }
}